import eventOperateStore from "../EventOperateStore";
import designerStore from "../../store/DesignerStore";
import {MovableItemType} from "../movable/types";
import {SaveType} from "../../DesignerType";
import {cloneDeep, throttle} from "lodash";
import {historyOperator} from "../undo-redo/HistoryOperator";
import historyRecordOperateProxy from "../undo-redo/HistoryRecordOperateProxy";
import undoRedoMap from "../undo-redo/core";
import runtimeConfigStore from "../../store/RuntimeConfigStore";
import headerStore from "../../header/HeaderStore";
import layerListStore from "../../float-configs/layer-list/LayerListStore";
import footerStore from "../../footer/FooterStore";
import DateUtil from "../../../utils/DateUtil";
import bpStore from "../../../blueprint/store/BPStore";
import {reRenderLine} from "../../../blueprint/drag/BPMovable";
import bpLeftStore from "../../../blueprint/left/BPLeftStore";
import DesignerLoaderFactory from "../../loader/DesignerLoaderFactory";
import {OperateResult} from "../../../framework/operate/AbstractOperator";
import {message} from "antd";
import LayerUtil from "../../float-configs/layer-list/util/LayerUtil";

export const selectAll = () => {
    const {layoutConfigs} = designerStore;
    const {setTargetIds, calculateGroupCoordinate} = eventOperateStore;
    const selected = Object.values(layoutConfigs).map((item: MovableItemType) => {
        if (!item.lock && !item.hide)
            return item.id;
    });
    setTargetIds(selected as string[]);

    if (selected.length > 0)
        calculateGroupCoordinate(selected.map((id: string | undefined) => document.getElementById(id!))?.filter((item: HTMLElement | null) => !!item));
}

/**
 * 普通复制，只复制非分组图层
 */
export const doCopy = () => {
    let {targetIds, setTargetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;

    const {copyItem} = designerStore;
    let newIds = copyItem(targetIds);
    //延迟10毫秒，等待dom元素渲染完毕后再获取。
    setTimeout(() => setTargetIds(newIds), 10);
}

export const doLock = () => {
    const {targetIds, setTargetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layoutConfigs} = designerStore;
    let toBeUpdate = [];
    for (const targetId of targetIds) {
        let item = layoutConfigs[targetId];
        toBeUpdate.push({...item, lock: true})
    }
    historyRecordOperateProxy.doLockUpd(toBeUpdate);
    //操作完毕之后，清空已被选择的元素。
    setTargetIds([]);
}

export const doUnLock = () => {
    const {setTargetIds, targetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layoutConfigs} = designerStore;
    let toUpdate: MovableItemType[] = [];
    targetIds.filter(id => {
        //过滤出被锁定的组件
        return layoutConfigs[id].lock;
    }).forEach((id) => {
        toUpdate.push({id, lock: false})
    })
    historyRecordOperateProxy.doLockUpd(toUpdate);
    setTargetIds([]);
}

export const toTop = () => {
    let {maxLevel, setMaxLevel, targetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layoutConfigs} = designerStore;
    let toBeUpdate: MovableItemType[] = [];
    targetIds.forEach((id: string) => {
        let item = layoutConfigs[id];
        toBeUpdate.push({...item, order: ++maxLevel});
    });
    setMaxLevel(maxLevel)
    historyRecordOperateProxy.doOrderUpd(toBeUpdate);
}

export const toBottom = () => {
    let {minLevel, setMinLevel, targetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layoutConfigs} = designerStore;
    let toBeUpdate: MovableItemType[] = [];
    targetIds.forEach((id: string) => {
        let item = layoutConfigs[id];
        toBeUpdate.push({...item, order: --minLevel});
    });
    setMinLevel(minLevel)
    historyRecordOperateProxy.doOrderUpd(toBeUpdate);
}

export const doDelete = () => {
    //todo 考虑这段逻辑是否可以独立？
    //如果蓝图中使用了当前要被删除的组件，则需要先删除蓝图中的组件和连线，且蓝图中的删除操作目前无法回退
    const {targetIds} = eventOperateStore;
    if (targetIds && targetIds.length > 0) {
        const {delNode, bpNodeLayoutMap} = bpStore;
        const preDelNodeIds: string[] = [];
        targetIds.forEach((id: string) => {
            if (bpNodeLayoutMap[id])
                preDelNodeIds.push(id);
        });
        if (preDelNodeIds.length > 0)
            delNode(preDelNodeIds);
    }

    //删除设计器中的组件，并记录到历史操作
    historyRecordOperateProxy.doDelete();
}

//保存函数节流5s, 5s内不可重复保存
export const doSave = throttle(() => {
    return new Promise(() => {
        let {projectConfig: {saveType}} = designerStore;
        if (saveType === SaveType.LOCAL) {
            const {projectConfig: {saveType = SaveType.LOCAL}, updateProjectConfig} = designerStore;
            updateProjectConfig({updateTime: DateUtil.format(new Date())})
            const proData = designerStore.getData();
            //设置蓝图数据
            const {bpAPMap, bpLines, bpAPLineMap, getAllNodeConfig, bpNodeLayoutMap} = bpStore;
            proData.bpAPMap = bpAPMap;
            proData.bpLines = bpLines;
            proData.bpAPLineMap = bpAPLineMap;
            proData.bpNodeConfigMap = getAllNodeConfig();
            proData.bpNodeLayoutMap = bpNodeLayoutMap;
            DesignerLoaderFactory.getLoader().abstractOperatorMap[saveType].saveProject(cloneDeep(proData)).then((res: OperateResult) => {
                const {status, msg} = res;
                if (status)
                    message.success(msg);
                else
                    message.error(msg);
            });
        } else if (saveType === SaveType.SERVER) {
            alert("server save");
        }
    });
}, 5000);

export const doHide = () => {
    const {targetIds, setTargetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layoutConfigs} = designerStore;
    let toBeUpdate: MovableItemType[] = [];
    targetIds.forEach((id: string) => {
        let item = layoutConfigs[id];
        toBeUpdate.push({...item, hide: true});
    });
    historyRecordOperateProxy.doHideUpd(toBeUpdate);
    setTargetIds([]);
}

/**
 * 图层编组,
 * 编组时候，如果都是普通组件图层，则直接编组
 * 如果包含了已经分组的图层，则将将已经编组的这个组作为基本图层和其他图层进行编组，
 * 比如有A,B,C三个普通图层，则编组的时候可直接生成编组G
 * 如果A,B已经编组为G1，此时再选中A,C或B,C，或者A,B,C，则编组的时候，G1作为基本图层，和C进行编组，生成G2
 */
export const doGrouping = () => {
    historyRecordOperateProxy.doGrouping();
}

export const doUnGrouping = () => {
    historyRecordOperateProxy.doUnGrouping();
}

/*************************快捷键控制移动组件的位置*************************/

export const doMoveUp = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {dragStep = 1}} = designerStore;
    if (targets.length === 1) {
        let id = targets[0].id;
        let yPos = layoutConfigs[id].position![1] - dragStep;
        movableRef?.current?.request("draggable", {y: yPos}, true);
    } else {
        const yPos = groupCoordinate?.minY! - dragStep;
        movableRef?.current?.request("draggable", {y: yPos}, true);
    }
}

export const doMoveDown = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {dragStep = 1}} = designerStore;
    if (targets.length === 1) {
        let id = targets[0].id;
        let yPos = layoutConfigs[id].position![1] + dragStep;
        movableRef?.current?.request("draggable", {y: yPos}, true);
    } else {
        const yPos = groupCoordinate?.minY! + dragStep;
        movableRef?.current?.request("draggable", {y: yPos}, true);
    }
}

export const doMoveLeft = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {dragStep = 1}} = designerStore;
    if (targets.length === 1) {
        let id = targets[0].id;
        let xPos = layoutConfigs[id].position![0];
        movableRef?.current?.request("draggable", {x: xPos - dragStep}, true);
    } else {
        const xPos = groupCoordinate?.minX! - dragStep;
        movableRef?.current?.request("draggable", {x: xPos}, true);
    }
}

export const doMoveRight = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {dragStep = 1}} = designerStore;
    if (targets.length === 1) {
        let id = targets[0].id;
        let xPos = layoutConfigs[id].position![0];
        movableRef?.current?.request("draggable", {x: xPos + dragStep}, true);
    } else {
        const xPos = groupCoordinate?.minX! + dragStep;
        movableRef?.current?.request("draggable", {x: xPos}, true);
    }
}

/*************************快捷键控制缩放组件尺寸*************************/

/**
 * 以底部为基准向上扩大
 */
export const doBaseBottomEnlargeUp = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    let height;
    if (targets.length === 1) {
        let id = targets[0].id;
        height = layoutConfigs[id].height! + resizeStep;
    } else {
        height = groupCoordinate.groupHeight! + resizeStep;
    }
    movableRef?.current?.request("resizable", {offsetHeight: height, direction: [1, -1]}, true);
}

/**
 * 以顶部为基准向下扩大
 */
export const doBaseUpEnlargeDown = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    let height;
    if (targets.length === 1) {
        let id = targets[0].id;
        height = layoutConfigs[id].height! + resizeStep;
    } else {
        height = groupCoordinate.groupHeight! + resizeStep;
    }
    movableRef?.current?.request("resizable", {offsetHeight: height, direction: [1, 1]}, true);
}

/**
 * 以右边为基准向左扩大
 */
export const doBaseRightEnlargeLeft = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    let width;
    if (targets.length === 1) {
        let id = targets[0].id;
        width = layoutConfigs[id].width! + resizeStep;
    } else {
        width = groupCoordinate.groupWidth! + resizeStep;
    }
    movableRef?.current?.request("resizable", {offsetWidth: width, direction: [-1, 1]}, true);
}

/**
 * 以左边为基准向右扩大
 */
export const doBaseLeftEnlargeRight = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    let width;
    if (targets.length === 1) {
        let id = targets[0].id;
        width = layoutConfigs[id].width! + resizeStep;
    } else {
        width = groupCoordinate.groupWidth! + resizeStep;
    }
    movableRef?.current?.request("resizable", {offsetWidth: width, direction: [1, 1]}, true);
}


/**
 * 以底部为基准向上缩小
 */
export const doBaseBottomDecreaseUp = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    let height;
    if (targets.length === 1) {
        height = layoutConfigs[targets[0].id].height! - resizeStep;
    } else {
        height = groupCoordinate.groupHeight! - resizeStep;
    }
    movableRef?.current?.request("resizable", {offsetHeight: height, direction: [1, -1]}, true);
}

/**
 * 以顶部为基准向下缩小
 */
export const doBaseUpDecreaseDown = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    let height;
    if (targets.length === 1) {
        let id = targets[0].id;
        height = layoutConfigs[id].height! - resizeStep;
    } else {
        height = groupCoordinate.groupHeight! - resizeStep;
    }
    movableRef?.current?.request("resizable", {offsetHeight: height, direction: [1, 1]}, true);
}

/**
 * 以右边为基准向左缩小
 */
export const doBaseRightDecreaseLeft = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    let width;
    if (targets.length === 1) {
        let id = targets[0].id;
        width = layoutConfigs[id].width! - resizeStep;
    } else {
        width = groupCoordinate.groupWidth! - resizeStep;
    }
    movableRef?.current?.request("resizable", {offsetWidth: width, direction: [-1, 1]}, true);
}

/**
 * 以左边为基准向右缩小
 */
export const doBaseLeftDecreaseRight = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    let width;
    if (targets.length === 1) {
        let id = targets[0].id;
        width = layoutConfigs[id].width! - resizeStep;
    } else {
        width = groupCoordinate.groupWidth! - resizeStep;
    }
    movableRef?.current?.request("resizable", {offsetWidth: width, direction: [1, 1]}, true);
}


/**
 * 撤销
 */
export const undo = () => {
    let history = historyOperator.backoff();
    if (!history) return;
    const {actions} = history!;
    actions.forEach(action => {
        const {type} = action!;
        undoRedoMap.get(type)?.undo(action!);
    })
}

/**
 * 重做
 */
export const redo = () => {
    let history = historyOperator.forward();
    if (!history) return;
    const {actions} = history!;
    actions.forEach(action => {
        const {type} = action!;
        undoRedoMap.get(type)?.redo(action!);
    });
}


/*************************运行时配置快捷键*************************/

/**
 * 切换辅助线展示
 */
export const toggleSecondaryBorder = () => {
    const {auxiliaryBorder, setAuxiliaryBorder} = runtimeConfigStore;
    const newValue = !auxiliaryBorder;
    if (newValue) {
        //展示辅助线
        const compContainers = document.getElementsByClassName('lc-comp-item')
        compContainers && Array.from(compContainers).forEach((compContainer: any) => {
            compContainer.style.border = '1px solid #65eafc';
        });
    } else {
        //隐藏辅助线
        const compContainers = document.getElementsByClassName('lc-comp-item')
        compContainers && Array.from(compContainers).forEach((compContainer: any) => {
            compContainer.style.border = 'none';
        });
    }
    setAuxiliaryBorder(!auxiliaryBorder);
}

/**
 * 切换项目设置弹框
 */
export const toggleProjectConfig = () => {
    const {projectVisible, setProjectVisible} = headerStore;
    console.log(projectVisible)
    setProjectVisible(!projectVisible);
}

/**
 * 切换画布设置弹框
 */
export const toggleCanvasConfig = () => {
    const {canvasVisible, setCanvasVisible} = headerStore;
    setCanvasVisible(!canvasVisible);
}

/**
 * 切换全局主题设置弹框
 */
export const toggleGlobalThemeConfig = () => {
    const {themeVisible, setThemeVisible} = headerStore;
    setThemeVisible(!themeVisible);
}

/**
 * 切换快捷键说明弹框
 */
export const toggleHotKeyDes = () => {
    const {hotKeyVisible, setHotKeyVisible} = footerStore;
    setHotKeyVisible(!hotKeyVisible)
}

/**
 * 切换组件库弹框
 */
export const toggleLayer = () => {
    const {setVisible, visible} = layerListStore;
    setVisible && setVisible(!visible);
}

/*************************蓝图快捷键实现*************************/

/**
 * 删除蓝图中选中的节点
 */
export const delBPNode = () => {
    const {bluePrintVisible} = headerStore;
    if (!bluePrintVisible) return;
    const {selectedNodes, delNode} = bpStore;
    if (selectedNodes.length === 0) return;
    const selectedNodeIds = selectedNodes.map(node => node.id.split(':')[1]!);
    delNode(selectedNodeIds);
    //如果删除的是图层节点，则恢复左侧图层节点的可拖拽性
    const {setUsedLayerNodes, usedLayerNodes} = bpLeftStore;
    selectedNodeIds.forEach(nodeId => {
        if (nodeId in usedLayerNodes)
            setUsedLayerNodes(nodeId, false);
    })
    reRenderLine();
}

/**
 * 删除蓝图中选中的连线
 */
export const delBPLine = () => {
    const {bluePrintVisible} = headerStore;
    if (!bluePrintVisible) return;
    const {selectedLines, delLine} = bpStore;
    if (selectedLines.length === 0) return;
    const selectedLineIds = selectedLines.map(line => line.id!);
    delLine(selectedLineIds);
    reRenderLine();
}