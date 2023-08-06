import {action, makeObservable, observable} from "mobx";
import LayerComponent from "./LayerComponent";
import designerStore from "../../store/DesignerStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {MouseEvent} from "react";
import {LayerItemDataProps} from "./LayerItem";

class LayerListStore {
    constructor() {
        makeObservable(this, {
            visible: observable,
            setVisible: action,
        });
    }

    visible = false;

    layerInstanceMap: { [key: string]: LayerComponent } = {};

    selectedBefore: string[] = [];

    setVisible = (visible: boolean) => this.visible = visible;

    lockChange = (id: string, lock: boolean) => {
        const {updateLayout} = designerStore;
        const {targetIds, targets, setTargetIds, setTargets} = eventOperateStore;
        if (targetIds.includes(id)) {
            const newTargetIds = targetIds.filter(_id => _id !== id);
            setTargetIds(newTargetIds);
        }
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
        let {setTargets, setTargetIds, targetIds, targets} = eventOperateStore;
        const targetDom = document.getElementById(data.compId!);
        if (!targetDom || data.lock || data.hide) return;
        //之前已经选中的取消选中
        console.log(this.selectedBefore)
        if (this.selectedBefore.length > 0) {
            this.selectedBefore.forEach(id => {
                let instance = this.layerInstanceMap[id];
                instance && instance.update({selected: false});
            });
        }
        //计算本次选中的组件
        if (e.ctrlKey) {
            if (targetIds.includes(data.compId!)) {
                const newTargetIds = targetIds.filter(id => id !== data.compId);
                setTargetIds(newTargetIds);
                const newTargets = targets.filter(target => target.id !== data.compId);
                setTargets(newTargets);
                this.selectedBefore = newTargetIds;
            } else {
                targetIds = [...targetIds, data.compId!];
                targets = [...targets, targetDom];
                setTargetIds(targetIds);
                setTargets(targets);
                this.selectedBefore = targetIds;
            }
        } else {
            setTargetIds([data.compId!]);
            setTargets([targetDom]);
            this.selectedBefore = [data.compId!];
        }
        if (this.selectedBefore.length > 0) {
            this.selectedBefore.forEach(id => {
                let instance = this.layerInstanceMap[id];
                instance && instance.update({selected: true});
            });
        }
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