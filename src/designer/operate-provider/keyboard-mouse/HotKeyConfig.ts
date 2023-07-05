import {TriggerType} from "./HotKey";
import {doScale} from "../scale/Scaler";
import eventOperateStore from "../EventOperateStore";
import designerStore from "../../store/DesignerStore";
import {MovableItemType} from "../../../lib/lc-movable/types";
import rightStore from "../../right/RightStore";
import {SaveType} from "../../DesignerType";
import LocalOperator from "../../../framework/operate/LocalOperator";


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
    const {setTargets, setTargetIds} = eventOperateStore;
    setTargets(compArr);
    setTargetIds(compIds);
}

export const doCopy = () => {
    const {targetIds, setTargetIds, setTargets} = eventOperateStore;
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
    const {updateActive} = designerStore;
    const {setContentVisible} = rightStore;
    setContentVisible(false);
    updateActive && updateActive({
        id: -1,
        type: 'LcBg'
    });
    targetIds.length > 0 && designerStore.delItem(targetIds);
    setTargetIds([]);
    setTargets([])
}

export const doSave = () => {
    let {projectConfig: {saveType}} = designerStore;
    if (saveType === SaveType.LOCAL) {
        //todo 策略模式优化
        new LocalOperator().doCreateOrUpdate(designerStore).then(() => {
        });
    } else if (saveType === SaveType.SERVER) {
        alert("server save");
    }
}

export const doUnLock = () => {
    const {unLockedId} = eventOperateStore;
    const {updateLayout, layoutConfigs} = designerStore;
    let item = layoutConfigs[unLockedId];
    updateLayout([{...item, locked: false}])
}

export const getOperateEventMapping: any = (target: any) => {
    return {
        'alt + wheel': {
            handler: doScale,
            triggerType: TriggerType.COILED,
            target
        },
        'control + a': {
            handler: selectAll,
            target
        },
        'control + v': {
            handler: doCopy,
            target
        },
        'control + l': {
            handler: doLock,
            target
        },
        'control + arrowup': {
            handler: toTop,
            target
        },
        'control + arrowdown': {
            handler: toBottom,
            target
        },
        'control + s': {
            handler: doSave,
        },
        'delete': {
            handler: doDelete,
            target
        }
    }
}