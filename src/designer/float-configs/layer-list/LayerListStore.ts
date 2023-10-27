import {action, makeObservable, observable} from "mobx";
import LayerComponent from "./LayerComponent";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {MouseEvent} from "react";
import {LayerItemDataProps} from "./LayerItem";
import {setControlPointLineColor} from "../../operate-provider/movable/GroupSelectable";
import historyRecordOperateProxy from "../../operate-provider/undo-redo/HistoryRecordOperateProxy";

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
        const {targets, setTargets} = eventOperateStore;
        if (targets && targets.length > 0) {
            const newTargets = targets.filter(target => target.id !== id);
            if (newTargets.length !== targets.length)
                setTargets(newTargets);
        }
        historyRecordOperateProxy.doLockUpd([{id, lock}]);
        let instance = this.layerInstanceMap[id];
        instance && instance.update({lock});
    }

    //todo 此方法逻辑需要优化
    selectedChange = (data: LayerItemDataProps, e: MouseEvent<HTMLDivElement>) => {
        let {setTargets, targetIds, targets} = eventOperateStore;
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
                    const firstLock = targets[0].dataset.lock === 'true';
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

        if (currentTargetIds.length > 0) {
            currentTargetIds.forEach(id => {
                let instance = this.layerInstanceMap[id];
                instance && instance.update({selected: true});
            });
        }

        let lock = selected[0].dataset.lock === 'true';
        //更新选中组件的边框颜色（锁定状态组件为红色，非锁定状态组件为蓝色）
        const tempTimer = setTimeout(() => {
            setControlPointLineColor(lock);
            clearTimeout(tempTimer);
        }, 0)

    }

    hideChange = (id: string, hide: boolean) => {
        historyRecordOperateProxy.doHideUpd([{id, hide}])
        let instance = this.layerInstanceMap[id];
        instance && instance.update({hide});
    }
}

const layerListStore = new LayerListStore();
export default layerListStore;