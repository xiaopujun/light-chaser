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

export const selectAll = () => {
    let comps = document.getElementsByClassName('lc-comp-item');
    let compArr: any[] = [];
    //权限时排除已锁定和隐藏的组件
    comps && Array.from(comps).forEach((comp: any) => {
        const {lock, hide} = comp.dataset;
        if (lock !== 'true' && hide !== 'true') {
            compArr.push(comp);
        }
    });
    const {setTargets, calculateGroupCoordinate} = eventOperateStore;
    setTargets(compArr);

    //计算组件多选时的左上角坐标
    if (compArr.length > 1)
        calculateGroupCoordinate(compArr);
}

export const doCopy = () => {
    const {targetIds, setTargets} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {copyItem} = designerStore;
    let newIds = copyItem(targetIds);
    let targets: any = [];
    //延迟10毫秒，等待dom元素渲染完毕后再获取。
    setTimeout(() => {
        for (const newId of newIds) {
            targets.push(document.getElementById(newId));
        }
        targets.filter((item: any) => item !== null);
        setTargets(targets);
    }, 10);
}

export const doLock = () => {
    const {targetIds, setTargets} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layoutConfigs} = designerStore;
    let toBeUpdate = [];
    for (const targetId of targetIds) {
        let item = layoutConfigs[targetId];
        toBeUpdate.push({...item, lock: true})
    }
    historyRecordOperateProxy.doLockUpd(toBeUpdate);
    //操作完毕之后，清空已被选择的元素。
    setTargets([]);
}

export const doUnLock = () => {
    const {setTargets, targets} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {updateLayout, layoutConfigs} = designerStore;
    let toUpdate: MovableItemType[] = [];
    (targets as HTMLElement[]).filter(target => {
        //过滤出被锁定的组件
        return target.dataset.lock === 'true';
    }).forEach((target) => {
        let item = layoutConfigs[target.id];
        toUpdate.push({...item, lock: false})
    })
    updateLayout(toUpdate)
    historyRecordOperateProxy.doLockUpd(toUpdate);
    setTargets([]);
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
        console.log('preDelNodeIds', preDelNodeIds);
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
            //设置蓝图数据 todo 这里的数据采集方式应该要采用以各种更合理的方式处理
            const {bpAPMap, bpLines, bpAPLineMap, getAllNodeConfig, bpNodeLayoutMap} = bpStore;
            proData.bpAPMap = bpAPMap;
            proData.bpLines = bpLines;
            proData.bpAPLineMap = bpAPLineMap;
            proData.bpNodeConfigMap = getAllNodeConfig();
            proData.bpNodeLayoutMap = bpNodeLayoutMap;
            DesignerLoaderFactory.getLoader().abstractOperatorMap[saveType].saveProject(cloneDeep(proData));
        } else if (saveType === SaveType.SERVER) {
            alert("server save");
        }
    });
}, 5000);

export const doHide = () => {
    const {targetIds, setTargets} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layoutConfigs} = designerStore;
    let toBeUpdate: MovableItemType[] = [];
    targetIds.forEach((id: string) => {
        let item = layoutConfigs[id];
        toBeUpdate.push({...item, hide: true});
    });
    historyRecordOperateProxy.doHideUpd(toBeUpdate);
    setTargets([]);
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
    let record = historyOperator.backoff();
    if (!record) return;
    const {type} = record!;
    undoRedoMap.get(type)?.undo(record!);
}

/**
 * 重做
 */
export const redo = () => {
    let record = historyOperator.forward();
    if (!record) return;
    const {type} = record!;
    undoRedoMap.get(type)?.redo(record!);
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