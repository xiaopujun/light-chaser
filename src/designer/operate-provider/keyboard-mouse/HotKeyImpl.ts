import eventOperateStore from "../EventOperateStore";
import designerStore from "../../store/DesignerStore";
import {MovableItemType} from "../../../lib/lc-movable/types";
import rightStore from "../../right/RightStore";
import RenderUtil from "../../../utils/RenderUtil";
import {SaveType} from "../../DesignerType";
import {cloneDeep} from "lodash";
import {message} from "antd";
import {abstractOperatorMap} from "../../loader/EditorDesignerLoader";

export const selectAll = () => {
    let comps = document.getElementsByClassName('lc-comp-item');
    let compIds: string[] = [];
    let compArr: any[] = [];
    comps && Array.from(comps).forEach((comp: any) => {
        if (comp.dataset.locked !== 'true') {
            compArr.push(comp);
            compIds.push(comp.id);
        }
    });
    const {setTargets, setTargetIds, calculateGroupCoordinate} = eventOperateStore;
    setTargets(compArr);
    setTargetIds(compIds);

    //计算组件多选时的左上角坐标
    if (compArr.length > 1)
        calculateGroupCoordinate(compArr);
}

export const doCopy = () => {
    const {targetIds, setTargetIds, setTargets} = eventOperateStore;
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
        setTargetIds(newIds);
    }, 10);
}

export const doLock = () => {
    const {targetIds, setTargets} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {updateLayout, layoutConfigs} = designerStore;
    let toBeUpdate = [];
    for (const targetId of targetIds) {
        let item = layoutConfigs[targetId];
        toBeUpdate.push({...item, locked: true})
    }
    updateLayout(toBeUpdate);
    //操作完毕之后，清空已被选择的元素。
    setTargets([]);
}

export const toTop = () => {
    let {maxLevel, setMaxLevel, targetIds, setTargetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {updateLayout, layoutConfigs} = designerStore;
    let toBeUpdate: MovableItemType[] = [];
    targetIds.forEach((id: string) => {
        let item = layoutConfigs[id];
        toBeUpdate.push({...item, order: ++maxLevel});
    });
    setMaxLevel(maxLevel)
    setTargetIds([]);
    updateLayout(toBeUpdate);
}

export const toBottom = () => {
    let {minLevel, setMinLevel, targetIds, setTargetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {updateLayout, layoutConfigs} = designerStore;
    let toBeUpdate: MovableItemType[] = [];
    targetIds.forEach((id: string) => {
        let item = layoutConfigs[id];
        toBeUpdate.push({...item, order: --minLevel});
    });
    setMinLevel(minLevel)
    setTargetIds([]);
    updateLayout(toBeUpdate);
}

export const doDelete = () => {
    const {targetIds, setTargetIds, setTargets} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {setContentVisible, activeConfig} = rightStore;
    setContentVisible(false);
    activeConfig("80cc666f", "LcBg");
    targetIds.length > 0 && designerStore.delItem(targetIds);
    setTargetIds([]);
    setTargets([])
}

export const doSave = () => {
    RenderUtil.throttle(() => {
        let {projectConfig: {saveType}} = designerStore;
        if (saveType === SaveType.LOCAL) {
            const {projectConfig: {saveType = SaveType.LOCAL}} = designerStore;
            abstractOperatorMap[saveType].doCreateOrUpdate(cloneDeep(designerStore.getData()));
        } else if (saveType === SaveType.SERVER) {
            alert("server save");
        }
    }, 5000, () => {
        message.warn('保存过于频繁，请稍后再试！')
    })();

}

export const doUnLock = () => {
    const {unLockedId} = eventOperateStore;
    if (!unLockedId || unLockedId === '') return;
    const {updateLayout, layoutConfigs} = designerStore;
    let item = layoutConfigs[unLockedId];
    updateLayout([{...item, locked: false}])
}

export const doHide = () => {
    const {targetIds} = eventOperateStore;
    if (!targetIds || targetIds.length === 0) return;
    const {updateLayout, layoutConfigs} = designerStore;
    let toBeUpdate: MovableItemType[] = [];
    targetIds.forEach((id: string) => {
        let item = layoutConfigs[id];
        toBeUpdate.push({...item, hide: true});
    });
    updateLayout(toBeUpdate)
}

/*************************快捷键控制移动组件的位置*************************/

export const doMoveUp = () => {
    const {targets, movableRef, groupCoordinate} = eventOperateStore;
    const {layoutConfigs, canvasConfig: {dragStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {dragStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {dragStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {dragStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
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
    const {layoutConfigs, canvasConfig: {resizeStep = 1}} = designerStore;
    if (!targets || targets.length === 0) return;
    let width;
    if (targets.length === 1) {
        let id = targets[0].id;
        width = layoutConfigs[id].width! - resizeStep;
    } else {
        width = groupCoordinate.groupWidth! - resizeStep;
    }
    movableRef?.current?.request("resizable", {offsetWidth: width, direction: [1, 1]}, true);
}