import {action, makeObservable, observable} from "mobx";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {Component, MouseEvent} from "react";
import {setControlPointLineColor} from "../../operate-provider/movable/DesignerSelectable";
import historyRecordOperateProxy from "../../operate-provider/undo-redo/HistoryRecordOperateProxy";
import LayerUtil from "./util/LayerUtil";
import layerManager from "../../manager/LayerManager.ts";
import {ILayerItem} from "../../DesignerType.ts";

class LayerListStore {
    constructor() {
        makeObservable(this, {
            searchLayer: observable,
            setSearchLayer: action,
        });
    }

    layerInstances: Record<string, Component> = {};

    searchLayer: boolean = false;

    setSearchLayer = (searchlayer: boolean) => this.searchLayer = searchlayer;


    /**
     * 更新图层的锁定状态，包括普通图层和分组图层
     * 普通图层直接更新即可，分组图层要更新分组图层中的所有子图层
     */
    lockChange = (id: string, lock: boolean) => {
        const updData = [];
        const {layerConfigs} = layerManager;
        const {type} = layerConfigs[id];
        if (type === 'group') {
            //分组图层
            LayerUtil.findAllChildLayer([id]).forEach(id => updData.push({id, lock}));
        } else {
            //普通图层
            updData.push({id, lock});
        }
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
    selectedChange = (id: string, event: MouseEvent) => {
        const {targetIds, setTargetIds} = eventOperateStore;
        const {layerConfigs} = layerManager;
        const {type, lock} = layerConfigs[id];
        if (!type) return;
        const groupLayer = type === 'group';
        let selectedLayerIds: string[] = [];
        //处理单选多选
        if (event.ctrlKey) {
            //多选
            if (targetIds.includes(id)) {
                //多选模式下同一图层再次点击视为取消选中
                if (groupLayer) {
                    //分组图层
                    const toBeCancelled = LayerUtil.findAllChildLayer([id]);
                    selectedLayerIds = targetIds.filter(_id => !toBeCancelled.includes(_id));
                } else
                    selectedLayerIds = targetIds.filter(_id => _id !== id);
            } else {
                /**
                 * 多选时，不能同时选中锁定状态不一致的组件，若存在状态不一致的场景，只选中未锁定的组件
                 */
                if (targetIds.length === 0) {
                    //多选模式首次选中
                    if (groupLayer)
                        selectedLayerIds = LayerUtil.findAllChildLayer([id]);
                    else
                        selectedLayerIds = [id];
                } else {
                    const firstLock = layerConfigs[targetIds[0]].lock;
                    if (lock !== firstLock) {
                        //只选中未锁定的组件
                        if (groupLayer)
                            selectedLayerIds = [...targetIds, ...LayerUtil.findAllChildLayer([id])].filter(id => !layerConfigs[id].lock);
                        else
                            selectedLayerIds = [...targetIds, id].filter(id => !layerConfigs[id].lock);
                    } else {
                        //直接在已选择的组件上增量本次选中的图层
                        if (groupLayer)
                            selectedLayerIds = [...targetIds, ...LayerUtil.findAllChildLayer([id])];
                        else
                            selectedLayerIds = [...targetIds, id];
                    }
                    //多选模式下需要去重，（避免在图层列表选中先选中子图层，再多选选中分组图层时候，分组图层被重复计算的问题）
                    selectedLayerIds = [...new Set(selectedLayerIds)];
                }
            }
        } else if (event.shiftKey) {
            if (targetIds.length === 1) {
                const startLayer = layerConfigs[targetIds[0]];
                const endLayer = layerConfigs[id];
                let maxId, minId;
                if (startLayer.order! > endLayer.order!) {
                    maxId = targetIds[0];
                    minId = id;
                } else {
                    maxId = id;
                    minId = targetIds[0];
                }

                let finished = false;
                const calculateLayerIds = (selectedIds: string[], nextLayer: ILayerItem, targetId: string) => {
                    if (!nextLayer || finished)
                        return;
                    if (nextLayer.type === 'group') {
                        selectedIds.push(nextLayer.id!)
                        const childHeaderLayer = layerConfigs[nextLayer.childHeader!];
                        if (!childHeaderLayer)
                            return;
                        calculateLayerIds(selectedLayerIds, childHeaderLayer, targetId);
                    } else {
                        selectedIds.push(nextLayer.id!);
                    }
                    if (nextLayer.id === targetId) {
                        finished = true;
                        return;
                    }
                    if (nextLayer.pid && !nextLayer.next) {
                        //查找到分组图层的最后一个元素依然没有匹配到目标图层，则跳转到父级图层往下继续匹配
                        let safeLock = 0; //防止死循环
                        let parentLayer = layerConfigs[nextLayer.pid];
                        let tempNext = layerConfigs[parentLayer.next!];
                        while (!tempNext && safeLock < 1000) {
                            parentLayer = layerConfigs[parentLayer.pid!];
                            tempNext = layerConfigs[parentLayer.next!];
                            safeLock++;
                        }
                        calculateLayerIds(selectedIds, tempNext, targetId);
                    } else
                        calculateLayerIds(selectedIds, layerConfigs[nextLayer.next!], targetId);
                }

                const maxLayer = layerConfigs[maxId];
                selectedLayerIds.push(maxId);
                if (maxLayer.type === 'group') {
                    calculateLayerIds(selectedLayerIds, layerConfigs[maxLayer.childHeader!], minId);
                } else if (maxLayer.pid && !maxLayer.next) {
                    //第一个图层是分组图层下的最后一个子图层，则跳转到父级图层往下继续匹配
                    let safeLock = 0; //防止死循环
                    let parentLayer = layerConfigs[maxLayer.pid];
                    let tempNext = layerConfigs[parentLayer.next!];
                    while (!tempNext && safeLock < 1000) {
                        parentLayer = layerConfigs[parentLayer.pid!];
                        tempNext = layerConfigs[parentLayer.next!];
                        safeLock++;
                    }
                    calculateLayerIds(selectedLayerIds, tempNext, minId);
                } else {
                    calculateLayerIds(selectedLayerIds, layerConfigs[maxLayer.next!], minId);
                }
            }
        } else {
            //单选
            if (groupLayer)
                selectedLayerIds = LayerUtil.findAllChildLayer([id]);
            else
                selectedLayerIds = [id];
        }
        const targetTimer = setTimeout(() => {
            setTargetIds(selectedLayerIds);
            clearTimeout(targetTimer);
        }, 0)

        //更新选中组件的边框颜色（锁定状态组件为红色，非锁定状态组件为蓝色）
        const finalLock = layerConfigs[selectedLayerIds[0]]?.lock;
        const tempTimer = setTimeout(() => {
            setControlPointLineColor(finalLock!);
            clearTimeout(tempTimer);
        }, 0)

    }

    hideChange = (id: string, hide: boolean) => {
        const updData = [];
        const {layerConfigs} = layerManager;
        const {type} = layerConfigs[id];
        if (type === 'group') {
            //分组图层
            LayerUtil.findAllChildLayer([id]).forEach(id => updData.push({id, hide}));
        } else {
            //普通图层
            updData.push({id, hide});
        }
        historyRecordOperateProxy.doHideUpd(updData);
    }
}

const layerListStore = new LayerListStore();
export default layerListStore;