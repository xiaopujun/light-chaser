import {HandlerMapping, TriggerType} from "./HotKey";
import {doScale} from "../scale/Scaler";
import eventOperateStore from "../EventOperateStore";
import designerStore from "../../store/DesignerStore";
import {MovableItemType} from "../../../lib/lc-movable/types";
import rightStore from "../../right/RightStore";
import {SaveType} from "../../DesignerType";
import {localSave} from "../../header/items/save/SaveHdItem";


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
    let {maxOrder, setMaxOrder, targetIds, setTargetIds} = eventOperateStore;
    const {updateLayout, layoutConfigs} = designerStore;
    let toBeUpdate: MovableItemType[] = [];
    targetIds.forEach((id: string) => {
        let item = layoutConfigs[id];
        toBeUpdate.push({...item, order: ++maxOrder});
    });
    setMaxOrder(maxOrder)
    setTargetIds([]);
    updateLayout(toBeUpdate);
}

export const toBottom = () => {
    let {minOrder, setMinOrder, targetIds, setTargetIds} = eventOperateStore;
    const {updateLayout, layoutConfigs} = designerStore;
    let toBeUpdate: MovableItemType[] = [];
    targetIds.forEach((id: string) => {
        let item = layoutConfigs[id];
        toBeUpdate.push({...item, order: --minOrder});
    });
    setMinOrder(minOrder)
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
        localSave();
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

export const operateEventMapping: HandlerMapping = {
    'alt + wheel': {
        handler: doScale,
        triggerType: TriggerType.COILED
    },
    'control + a': {
        handler: selectAll,
    },
    'control + v': {
        handler: doCopy,
    },
    'control + l': {
        handler: doLock,
    },
    'control + arrowup': {
        handler: toTop,
    },
    'control + arrowdown': {
        handler: toBottom,
    },
    'control + s': {
        handler: doSave,
    },
    'delete': {
        handler: doDelete,
    }

}