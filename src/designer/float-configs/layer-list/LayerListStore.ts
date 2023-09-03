import {action, makeObservable, observable} from "mobx";
import LayerComponent from "./LayerComponent";
import designerStore from "../../store/DesignerStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {MouseEvent} from "react";
import {LayerItemDataProps} from "./LayerItem";
import {setControlPointLineColor} from "../../../lib/lc-movable/GroupSelectable";

class LayerListStore {
    constructor() {
        makeObservable(this, {
            visible: observable,
            searchContent: observable,
            setVisible: action,
            setContent: action,
        });
    }

    visible = false;

    layerInstanceMap: { [key: string]: LayerComponent } = {};

    searchContent = "";

    setVisible = (visible: boolean) => this.visible = visible;

    setContent = (content: string) => this.searchContent = content;

    lockChange = (id: string, lock: boolean) => {
        const {updateLayout} = designerStore;
        const {targetIds, targets, /*setTargetIds,*/ setTargets} = eventOperateStore;
        // if (targetIds.includes(id)) {
        //     const newTargetIds = targetIds.filter(_id => _id !== id);
        //     setTargetIds(newTargetIds);
        // }
        if (targets && targets.length > 0) {
            const newTargets = targets.filter(target => target.id !== id);
            if (newTargets.length !== targets.length)
                setTargets(newTargets);
        }
        updateLayout && updateLayout([{id, locked: lock}]);
        let instance = this.layerInstanceMap[id];
        instance && instance.update({lock});
    }

    //todo 此方法逻辑需要优化
    selectedChange = (data: LayerItemDataProps, e: MouseEvent<HTMLDivElement>) => {
        let {setTargets, /*setTargetIds,*/ targetIds, targets} = eventOperateStore;
        const targetDom = document.getElementById(data.compId!);

        //隐藏的组件不可选
        if (!targetDom || data.hide) return;

        //计算本次选中的组件id
        let currentTargetIds: string[];
        let selected: HTMLElement[] = [];
        if (e.ctrlKey) {
            //多选
            if (targetIds.includes(data.compId!)) {
                //重复选择之前已经选中的组件,则取消选中该组件
                currentTargetIds = targetIds.filter(id => id !== data.compId);
                selected = targets.filter(target => target.id !== data.compId);
            } else {
                //多选时，若本次选中的组件与首次选中的组件锁定状态不一致，则本次选中无效
                if (targets.length > 0) {
                    const firstLock = targets[0].dataset.locked === 'true';
                    if (data.lock !== firstLock) return;
                }
                //将新的组件加入到选中组件列表中
                currentTargetIds = [...targetIds, data.compId!];
                selected = [...targets, targetDom];
            }
        } else {
            //单选
            currentTargetIds = [data.compId!];
            selected = [targetDom];
        }

        if (selected.length === 0) return;

        //之前已经选中的取消选中
        if (targetIds.length > 0) {
            targetIds.forEach(id => {
                let instance = this.layerInstanceMap[id];
                instance && instance.update({selected: false});
            });
        }

        //更新选中组件列表
        setTargets(selected);
        //更新图层列表的显示效果
        // setTargetIds(currentTargetIds);

        if (currentTargetIds.length > 0) {
            currentTargetIds.forEach(id => {
                let instance = this.layerInstanceMap[id];
                instance && instance.update({selected: true});
            });
        }

        let locked = selected[0].dataset.locked === 'true';
        //更新选中组件的边框颜色（锁定状态组件为红色，非锁定状态组件为蓝色）
        const tempTimer = setTimeout(() => {
            setControlPointLineColor(locked);
            clearTimeout(tempTimer);
        }, 0)

    }

    hideChange = (id: string, hide: boolean) => {
        const {updateLayout} = designerStore;
        updateLayout && updateLayout([{id, hide}]);
        let instance = this.layerInstanceMap[id];
        instance && instance.update({hide});
    }
}

const layerListStore = new LayerListStore();
export default layerListStore;