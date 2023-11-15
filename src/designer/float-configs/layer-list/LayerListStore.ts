import {action, makeObservable, observable} from "mobx";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {Component, MouseEvent, ReactElement} from "react";
import {LayerItemDataProps} from "./item/LayerItem";
import {setControlPointLineColor} from "../../operate-provider/movable/GroupSelectable";
import historyRecordOperateProxy from "../../operate-provider/undo-redo/HistoryRecordOperateProxy";
import LayerUtil from "./util/LayerUtil";

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

    layerInstances: Record<string, ReactElement> = {};

    searchContent = "";

    setVisible = (visible: boolean) => this.visible = visible;

    setContent = (content: string) => this.searchContent = content;

    /**
     * 更新图层的锁定状态，包括普通图层和分组图层
     * 普通图层直接更新即可，分组图层要更新分组图层中的所有子图层
     */
    lockChange = (id: string, lock: boolean) => {
        const updData = [];
        LayerUtil.findChildLayer([id]).forEach(id => updData.push({id, lock}));
        historyRecordOperateProxy.doLockUpd(updData);
    }

    /**
     * 通过图层选中组件
     * 直接点击图层为单选：
     *  1. 普通图层可以直接选中
     *  2. 分组图层选中时要同时选中分组图层中的所有子图层
     * 按照ctrl键多选：
     *  1. 多选普通图层为增量选中，比如选中A，按照ctrl键选中B，则A和B都会被选中。按住ctrl多次选中同一个图层，则这个图层会被取消选中
     *  2. 多选分组图层时同样为增量选中，基本规则与普通图层相同，但是多选分组图层时要同时选中它的所有子图层
     */
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
                //多选时，若本次选中的组件与其他已选中的组件锁定状态不一致，则本次选中无效（不能同时选中锁定状态不一致的组件）
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
            let layerIds = LayerUtil.findChildLayer([data.compId!]);
            currentTargetIds = layerIds;
            layerIds = LayerUtil.excludeGroupLayer(layerIds);
            const tempTargets = [];
            layerIds.forEach(id => {
                const target = document.getElementById(id);
                target && tempTargets.push(target);
            });
            selected = tempTargets;
        }

        if (selected.length === 0) return;

        //之前已经选中的取消选中
        if (targetIds.length > 0) {
            targetIds.forEach(id => {
                let instance = this.layerInstances[id];
                instance && (instance as Component).setState({selected: false});
            });
        }
        //更新选中组件列表
        setTargets(selected);
        //更新图层列表
        if (currentTargetIds.length > 0) {
            console.log('ddd', ...currentTargetIds)
            currentTargetIds.forEach(id => {
                let instance = this.layerInstances[id];
                console.log('ddd', instance)
                instance && (instance as Component).setState({selected: true});
            });
        }

        //更新选中组件的边框颜色（锁定状态组件为红色，非锁定状态组件为蓝色）
        let lock = selected[0].dataset.lock === 'true';
        const tempTimer = setTimeout(() => {
            setControlPointLineColor(lock);
            clearTimeout(tempTimer);
        }, 0)

    }

    hideChange = (id: string, hide: boolean) => {
        const updData = [];
        LayerUtil.findChildLayer([id]).forEach(id => updData.push({id, hide}));
        historyRecordOperateProxy.doHideUpd(updData);
    }
}

const layerListStore = new LayerListStore();
export default layerListStore;