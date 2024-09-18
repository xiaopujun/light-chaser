import eventOperateStore from "../EventOperateStore";
import {DesignerMode, ILayerItem, IProjectInfo, SaveType} from "../../DesignerType";
import {throttle} from "lodash";
import {historyOperator} from "../undo-redo/HistoryOperator";
import historyRecordOperateProxy from "../undo-redo/HistoryRecordOperateProxy";
import undoRedoMap from "../undo-redo/core";
import runtimeConfigStore from "../../store/RuntimeStore.ts";
import footerStore from "../../footer/FooterStore";
import {reRenderAllLine} from "../../blueprint/drag/BPMovable.tsx";
import bpLeftStore from "../../../designer/blueprint/left/BPLeftStore";
import operatorMap from "../../../framework/operate";
import URLUtil from "../../../utils/URLUtil";
import LayerUtil from "../../left/layer-list/util/LayerUtil.ts";
import bluePrintHdStore from "../../header/items/blue-print/BluePrintHdStore.ts";
import projectHdStore from "../../header/items/project/ProjectManager.ts";
import FileUtil from "../../../utils/FileUtil.ts";
import layerListStore from "../../left/layer-list/LayerListStore.ts";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import layerManager from "../../manager/LayerManager.ts";
import themeHdStore from "../../header/items/theme/ThemeManager.ts";
import bluePrintManager from "../../blueprint/manager/BluePrintManager.ts";
import canvasManager from "../../header/items/canvas/CanvasManager.ts";
import designerManager from "../../manager/DesignerManager.ts";

export const selectAll = () => {
    const {layerConfigs} = layerManager;
    const {setTargetIds, calculateGroupCoordinate} = eventOperateStore;
    const selected = [];
    for (const id in layerConfigs) {
        const item = layerConfigs[id];
        if (!item.lock && !item.hide)
            selected.push(id);
    }

    if (selected.length > 0) {
        setTargetIds(selected as string[]);
        calculateGroupCoordinate(selected.map((id: string | undefined) => document.getElementById(id!))?.filter((item: HTMLElement | null) => !!item) as HTMLElement[]);
    }
}

/**
 * 普通复制，只复制非分组图层
 */
export const doCopy = () => {
    const {targetIds, setTargetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;

    const newIds = historyRecordOperateProxy.doCopy(targetIds);
    //延迟10毫秒，等待dom元素渲染完毕后再获取。
    const tempTimer = setTimeout(() => {
        setTargetIds(newIds);
        clearTimeout(tempTimer);
    }, 10);
}

export const doLock = () => {
    const {targetIds, setTargetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layerConfigs} = layerManager;
    const toBeUpdate = [];
    for (const targetId of targetIds) {
        const item = layerConfigs[targetId];
        toBeUpdate.push({...item, lock: true})
    }
    historyRecordOperateProxy.doLockUpd(toBeUpdate);
    //操作完毕之后，清空已被选择的元素。
    setTargetIds([]);
}

export const doUnLock = () => {
    const {setTargetIds, targetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layerConfigs} = layerManager;
    const toUpdate: ILayerItem[] = [];
    targetIds.filter(id => {
        //过滤出被锁定的组件
        return layerConfigs[id].lock;
    }).forEach((id) => {
        toUpdate.push({id, lock: false})
    })
    historyRecordOperateProxy.doLockUpd(toUpdate);
    setTargetIds([]);
}

export const layerToTop = () => {
    historyRecordOperateProxy.doLayerToTop();
}

export const layerToBottom = () => {
    historyRecordOperateProxy.doLayerToBottom();
}

export const layerMoveUp = () => {
    historyRecordOperateProxy.doLayerMoveUp();
}

export const layerMoveDown = () => {
    historyRecordOperateProxy.doLayerMoveDown();
}

export const doDelete = () => {
    //如果蓝图中使用了当前要被删除的组件，则需要先删除蓝图中的组件和连线，且蓝图中的删除操作目前无法回退
    const {targetIds} = eventOperateStore;
    if (targetIds && targetIds.length > 0) {
        const {delNode, bpNodeLayoutMap} = bluePrintManager;
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
        const {saveType, id} = URLUtil.parseUrlParams();
        const proData = designerManager.getData();

        //转换为最终保存的数据格式
        const projectInfo: IProjectInfo = {
            id,
            dataJson: JSON.stringify(proData),
        }
        operatorMap[saveType as SaveType].updateProject(projectInfo);
    });
}, 5000);

export const doHide = () => {
    const {targetIds, setTargetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {layerConfigs} = layerManager;
    const toBeUpdate: ILayerItem[] = [];
    targetIds.forEach((id: string) => {
        const item = layerConfigs[id];
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
    //如果蓝图中使用了分组图层节点，则需要先删除蓝图中的组件和连线，且蓝图中的删除操作目前无法回退
    let {targetIds} = eventOperateStore;
    const targetIdSet = new Set<string>();
    LayerUtil.findTopGroupLayer(targetIds, false).forEach((id: string) => targetIdSet.add(id));
    targetIds = Array.from(targetIdSet);
    if (targetIds && targetIds.length > 0) {
        const {delNode, bpNodeLayoutMap} = bluePrintManager;
        const preDelNodeIds: string[] = [];
        targetIds.forEach((id: string) => {
            if (bpNodeLayoutMap[id])
                preDelNodeIds.push(id);
        });
        if (preDelNodeIds.length > 0)
            delNode(preDelNodeIds);
    }
    historyRecordOperateProxy.doUnGrouping();
}


export const removeFromGroup = () => {
    historyRecordOperateProxy.doRemoveFromGroup();
}

/*************************快捷键控制移动组件的位置*************************/

export const doMoveUp = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {dragStep = 1}} = canvasManager;
    let yPos;
    if (targets.length === 1) {
        const id = targets[0].id;
        yPos = (layerConfigs[id].y || 0) - dragStep;
    } else {
        yPos = (groupCoordinate?.minY || 0) - dragStep;
    }
    movableRef?.request("draggable", {y: yPos}, true);
}

export const doMoveDown = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {dragStep = 1}} = canvasManager;
    if (targets.length === 1) {
        const id = targets[0].id;
        const yPos = layerConfigs[id].y! + dragStep;
        movableRef?.request("draggable", {y: yPos}, true);
    } else {
        const yPos = groupCoordinate?.minY! + dragStep;
        movableRef?.request("draggable", {y: yPos}, true);
    }
}

export const doMoveLeft = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {dragStep = 1}} = canvasManager;
    if (targets.length === 1) {
        const id = targets[0].id;
        const xPos = layerConfigs[id].x!;
        movableRef?.request("draggable", {x: xPos - dragStep}, true);
    } else {
        const xPos = groupCoordinate?.minX! - dragStep;
        movableRef?.request("draggable", {x: xPos}, true);
    }
}

export const doMoveRight = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {dragStep = 1}} = canvasManager;
    if (targets.length === 1) {
        const id = targets[0].id;
        const xPos = layerConfigs[id].x!;
        movableRef?.request("draggable", {x: xPos + dragStep}, true);
    } else {
        const xPos = groupCoordinate?.minX! + dragStep;
        movableRef?.request("draggable", {x: xPos}, true);
    }
}

/*************************快捷键控制缩放组件尺寸*************************/

/**
 * 以底部为基准向上扩大
 */
export const doBaseBottomEnlargeUp = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {resizeStep = 1}} = canvasManager;
    let height;
    if (targets.length === 1) {
        const id = targets[0].id;
        height = layerConfigs[id].height! + resizeStep;
    } else {
        height = groupCoordinate.groupHeight! + resizeStep;
    }
    movableRef?.request("resizable", {offsetHeight: height, direction: [1, -1]}, true);
}

/**
 * 以顶部为基准向下扩大
 */
export const doBaseUpEnlargeDown = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {resizeStep = 1}} = canvasManager;
    let height;
    if (targets.length === 1) {
        const id = targets[0].id;
        height = layerConfigs[id].height! + resizeStep;
    } else {
        height = groupCoordinate.groupHeight! + resizeStep;
    }
    movableRef?.request("resizable", {offsetHeight: height, direction: [1, 1]}, true);
}

/**
 * 以右边为基准向左扩大
 */
export const doBaseRightEnlargeLeft = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {resizeStep = 1}} = canvasManager;
    let width;
    if (targets.length === 1) {
        const id = targets[0].id;
        width = layerConfigs[id].width! + resizeStep;
    } else {
        width = groupCoordinate.groupWidth! + resizeStep;
    }
    movableRef?.request("resizable", {offsetWidth: width, direction: [-1, 1]}, true);
}

/**
 * 以左边为基准向右扩大
 */
export const doBaseLeftEnlargeRight = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {resizeStep = 1}} = canvasManager;
    let width;
    if (targets.length === 1) {
        const id = targets[0].id;
        width = layerConfigs[id].width! + resizeStep;
    } else {
        width = groupCoordinate.groupWidth! + resizeStep;
    }
    movableRef?.request("resizable", {offsetWidth: width, direction: [1, 1]}, true);
}


/**
 * 以底部为基准向上缩小
 */
export const doBaseBottomDecreaseUp = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {resizeStep = 1}} = canvasManager;
    let height;
    if (targets.length === 1) {
        height = layerConfigs[targets[0].id].height! - resizeStep;
    } else {
        height = groupCoordinate.groupHeight! - resizeStep;
    }
    movableRef?.request("resizable", {offsetHeight: height, direction: [1, -1]}, true);
}

/**
 * 以顶部为基准向下缩小
 */
export const doBaseUpDecreaseDown = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {resizeStep = 1}} = canvasManager;
    let height;
    if (targets.length === 1) {
        const id = targets[0].id;
        height = layerConfigs[id].height! - resizeStep;
    } else {
        height = groupCoordinate.groupHeight! - resizeStep;
    }
    movableRef?.request("resizable", {offsetHeight: height, direction: [1, 1]}, true);
}

/**
 * 以右边为基准向左缩小
 */
export const doBaseRightDecreaseLeft = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {resizeStep = 1}} = canvasManager;
    let width;
    if (targets.length === 1) {
        const id = targets[0].id;
        width = layerConfigs[id].width! - resizeStep;
    } else {
        width = groupCoordinate.groupWidth! - resizeStep;
    }
    movableRef?.request("resizable", {offsetWidth: width, direction: [-1, 1]}, true);
}

/**
 * 以左边为基准向右缩小
 */
export const doBaseLeftDecreaseRight = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    if (!targets || targets.length === 0) return;
    const {layerConfigs} = layerManager;
    const {canvasConfig: {resizeStep = 1}} = canvasManager;
    let width;
    if (targets.length === 1) {
        const id = targets[0].id;
        width = layerConfigs[id].width! - resizeStep;
    } else {
        width = groupCoordinate.groupWidth! - resizeStep;
    }
    movableRef?.request("resizable", {offsetWidth: width, direction: [1, 1]}, true);
}


/**
 * 撤销
 */
export const undo = () => {
    const history = historyOperator.backoff();
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
    const history = historyOperator.forward();
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
        compContainers && Array.from(compContainers).forEach((compContainer: Element) => {
            (compContainer as HTMLElement).style.border = '1px solid #65eafc';
        });
    } else {
        //隐藏辅助线
        const compContainers = document.getElementsByClassName('lc-comp-item')
        compContainers && Array.from(compContainers).forEach((compContainer: Element) => {
            (compContainer as HTMLElement).style.border = 'none';
        });
    }
    setAuxiliaryBorder(!auxiliaryBorder);
}

/**
 * 切换项目设置弹框
 */
export const toggleProjectConfig = () => {
    const {projectVisible, setProjectVisible} = projectHdStore;
    setProjectVisible(!projectVisible);
}

/**
 * 切换画布设置弹框
 */
export const toggleCanvasConfig = () => {
    const {canvasVisible, setCanvasVisible} = canvasManager;
    setCanvasVisible(!canvasVisible);
}

/**
 * 切换全局主题设置弹框
 */
export const toggleGlobalThemeConfig = () => {
    const {themeVisible, setThemeVisible} = themeHdStore;
    setThemeVisible(!themeVisible);
}

/**
 * 切换快捷键说明弹框
 */
export const toggleHotKeyDes = () => {
    const {hotKeyVisible, setHotKeyVisible} = footerStore;
    setHotKeyVisible(!hotKeyVisible)
}

export const exportProject = () => {
    globalMessage.messageApi?.open({
        type: 'loading',
        content: '正在导出项目数据...'
    })
    const timeout = setTimeout(() => {
        const projectData = designerManager.getData();
        const elemConfigs = projectData.layerManager?.elemConfigs;
        const promises: Promise<void>[] = [];
        if (elemConfigs) {
            Object.keys(elemConfigs).forEach((key) => {
                const item = elemConfigs[key];
                if (item.base.type === 'BaseImage' && (item.style.localUrl as string)?.startsWith('blob')) {
                    // 将 blob 数据转换为 base64，并将异步操作添加到 promises 数组中
                    promises.push(
                        FileUtil.blobToBase64(item.style.localUrl as string).then((res: string | boolean) => {
                            if (res)
                                item.style.localUrl = res;
                            else {
                                console.error(`${item.base.id + "_" + item.base.name} 图片blob转换失败, ${item.style.localUrl}`);
                            }
                        })
                    );
                }
            });
        }
        // 等待所有异步操作完成
        Promise.all(promises).then(() => {
            // 在所有异步操作完成后，将项目数据转换为 JSON 字符串并导出
            const exportData = {flag: 'pyz_tt', version: 'v1.1.0', data: projectData};
            const projectDataJson = JSON.stringify(exportData);
            const blob = new Blob([projectDataJson], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a')
            a.href = url;
            a.download = `project-${new Date().getTime()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            globalMessage.messageApi?.destroy();
            globalMessage.messageApi?.success('项目数据导出成功');
        });
        clearTimeout(timeout);
    }, 1000);
}

export const importProject = () => {
    //打开文件选择框
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
        globalMessage.messageApi?.open({
            type: 'loading',
            content: '正在导入项目数据...'
        })
        const file = e.target.files[0] as File;
        if (!file)
            return;
        const promises: Promise<void>[] = [];
        file.text().then((fileData: string) => {
            const timeout = setTimeout(() => {
                const importData = JSON.parse(fileData);
                if (!('flag' in importData) || importData.flag !== 'pyz_tt') {
                    globalMessage.messageApi?.destroy();
                    globalMessage.messageApi?.info('数据格式错误，请检查导入文件内容。')
                    return;
                }
                const projectData = importData.data;
                const elemConfigs = projectData.layerManager?.elemConfigs;
                if (elemConfigs) {
                    Object.keys(elemConfigs).forEach((key) => {
                        const item = elemConfigs[key];
                        if (item.base.type === 'BaseImage' && (item.style.localUrl as string)?.startsWith('blob')) {
                            // 将 blob 数据转换为 base64，并将异步操作添加到 promises 数组中
                            promises.push(
                                FileUtil.base64ToBlob(item.style.localUrl as string).then((res: string | boolean) => {
                                    if (res)
                                        item.style.localUrl = res;
                                    else {
                                        console.error(`${item.base.id + "_" + item.base.name} 图片blob转换失败, ${item.style.localUrl}`);
                                    }
                                })
                            );
                        }
                    });
                }
                Promise.all(promises).then(() => {
                    designerManager.init(projectData as any, DesignerMode.EDIT);
                    globalMessage.messageApi?.destroy();
                    globalMessage.messageApi?.success('项目数据导入成功');
                    clearTimeout(timeout);
                });
            }, 500);
        })
    }
    input.click();
}

export const searchLayer = () => {
    const {searchLayer, setSearchLayer} = layerListStore;
    setSearchLayer(!searchLayer);
}

/*************************蓝图快捷键实现*************************/

/**
 * 删除蓝图中选中的节点
 */
export const delBPNode = () => {
    if (!bluePrintHdStore.bluePrintVisible) return;
    const {selectedNodes, delNode} = bluePrintManager;
    if (selectedNodes.length === 0) return;
    const selectedNodeIds = selectedNodes.map(node => node.id.split(':')[1]!);
    delNode(selectedNodeIds);
    //如果删除的是图层节点，则恢复左侧图层节点的可拖拽性
    const {setUsedLayerNodes, usedLayerNodes} = bpLeftStore;
    selectedNodeIds.forEach(nodeId => {
        if (nodeId in usedLayerNodes)
            setUsedLayerNodes(nodeId, false);
    })
    reRenderAllLine();
}

/**
 * 删除蓝图中选中的连线
 */
export const delBPLine = () => {
    if (!bluePrintHdStore.bluePrintVisible) return;
    const {selectedLines, delLine} = bluePrintManager;
    if (selectedLines.length === 0) return;
    const selectedLineIds = selectedLines.map(line => line.id!);
    delLine(selectedLineIds);
    reRenderAllLine();
}