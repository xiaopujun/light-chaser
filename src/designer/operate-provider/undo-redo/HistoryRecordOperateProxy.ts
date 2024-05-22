import layerManager from "../../manager/LayerManager.ts";
import {
    IAddOperateData,
    IDelOperateData,
    IDragOperateData,
    IHideOperateData,
    IHistoryRecord,
    ILockOperateData,
    IResizeOperateData,
    IUpdLayerOperateData,
    IUpdStyleOperateData,
    OperateType
} from "./OperateType";
import {historyOperator} from "./HistoryOperator";
import eventOperateStore from "../EventOperateStore";
import {runInAction} from "mobx";
import rightStore from "../../right/RightStore";
import {cloneDeep} from "lodash";
import {ConfigureObjectFragments} from "../../../utils/ObjectUtil";
import IdGenerate from "../../../utils/IdGenerate";
import {Component} from "react";
import {ILayerItem} from "../../DesignerType";
import layerListStore from "../../left/layer-list/LayerListStore";
import LayerUtil from "../../left/layer-list/util/LayerUtil";
import designerLeftStore from "../../left/DesignerLeftStore";

class HistoryRecordOperateProxy {

    public doDrag(items: ILayerItem[]): void {
        //构建历史记录数据
        const {layerConfigs, updateLayer} = layerManager;
        const ids: string[] = [];
        let prev: IDragOperateData | null;
        let next: IDragOperateData | null;
        if (items.length === 1) { //单个组件拖动
            //构建prev数据
            const oldLayer = layerConfigs[items[0].id!];
            prev = {ids: [items[0].id!], x: oldLayer.x!, y: oldLayer.y!}
            //构建next数据
            const {id, x = 0, y = 0} = items[0];
            next = {ids: [id!], x, y}
        } else { //多个组件拖动
            //构建prev数据
            const oldItems: ILayerItem[] = [];
            items.forEach((item) => ids.push(item.id!));
            ids.forEach((id) => oldItems.push(layerConfigs[id]))
            let x = +Infinity, y = +Infinity;
            oldItems.forEach((oldItem) => {
                if (oldItem.x! < x) x = oldItem.x!;
                if (oldItem.y! < y) y = oldItem.y!;
            });
            prev = {ids, x, y};

            //构建next数据
            const {groupCoordinate} = eventOperateStore;
            next = {ids, x: groupCoordinate.minX!, y: groupCoordinate.minY!}
        }
        //构建历史记录节点
        const data: IHistoryRecord = {
            type: OperateType.DRAG,
            prev: prev!,
            next: next!
        }
        //更新布局数据
        updateLayer(items, false);
        //历史记录入队
        historyOperator.put({actions: [data]});
    }

    public doResize(items: ILayerItem[], direction: [number, number]): void {
        //构建历史记录数据
        const {layerConfigs, updateLayer} = layerManager;
        const ids: string[] = [];
        let prev: IResizeOperateData | null;
        let next: IResizeOperateData | null;
        if (items.length === 1) { //单个组件缩放
            //构建prev数据
            const {width = 0, height = 0} = layerConfigs[items[0].id!];
            prev = {ids: [items[0].id!], width, height, direction}
            //构建next数据
            const {id} = items[0];
            next = {ids: [id!], width: items[0].width!, height: items[0].height!, direction}
        } else { //多个组件缩放
            //构建prev数据
            const oldItems: ILayerItem[] = [];
            items.forEach((item) => ids.push(item.id!));
            ids.forEach((id) => oldItems.push(layerConfigs[id]))
            let minX = +Infinity, minY = +Infinity, maxX = -Infinity, maxY = -Infinity;
            oldItems.forEach((oldItem) => {
                const {x = 0, y = 0} = oldItem;
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (x + oldItem.width! > maxX) maxX = x + oldItem.width!;
                if (y + oldItem.height! > maxY) maxY = y + oldItem.height!;
            });
            const width = maxX - minX;
            const height = maxY - minY;
            prev = {ids, width, height, direction};

            //构建next数据
            const {groupCoordinate} = eventOperateStore;
            next = {ids, width: groupCoordinate.groupWidth!, height: groupCoordinate.groupHeight!, direction}
        }
        //构建历史记录节点
        const data: IHistoryRecord = {type: OperateType.RESIZE, prev: prev!, next: next!}
        //更新布局数据
        updateLayer(items, false);
        //历史记录入队
        historyOperator.put({actions: [data]});
    }

    public doAdd(layer: ILayerItem): void {
        const addPrev: IAddOperateData[] = [];
        const addNext: IAddOperateData[] = [];
        const updLayerPrev: IUpdLayerOperateData[] = [];
        const updLayerNext: IUpdLayerOperateData[] = [];
        const {layerConfigs, updateLayer} = layerManager;

        //头插法建立双向链表
        if (!layerManager.layerHeader) {
            //首次插入
            addPrev.push({layerHeader: undefined, layerTail: undefined})
            layerManager.layerHeader = layer.id;
            layerManager.layerTail = layer.id;
        } else {
            //非首次插入
            addPrev.push({layerHeader: layerManager.layerHeader})
            const oldHeaderLayer = layerConfigs[layerManager.layerHeader];
            updLayerPrev.push({id: oldHeaderLayer.id, prev: oldHeaderLayer.prev})
            oldHeaderLayer.prev = layer.id;
            layer.next = oldHeaderLayer.id;
            layerManager.layerHeader = layer.id;
            updLayerNext.push({id: oldHeaderLayer.id, prev: layer.id})
        }
        addNext.push({
            id: layer.id,
            layerConfig: cloneDeep(layer),
            layerHeader: layerManager.layerHeader,
            layerTail: layerManager.layerTail
        });

        const {addRecordCompId, setAddRecordCompId} = eventOperateStore;
        /**
         * addRecordCompId为不为null，说明是从组件面板拖拽添加的组件要记录操作日志，反之其他操作导致的组件添加则不记录日志
         */
        if (addRecordCompId && addRecordCompId === layer.id) {
            historyOperator.put({
                actions: [
                    {type: OperateType.ADD, prev: addPrev, next: addNext},
                    {type: OperateType.UPDATE_LAYER, prev: updLayerPrev, next: updLayerNext}
                ]
            });
            setAddRecordCompId(null);
        }
        layerConfigs[layer.id + ""] = layer;
        updateLayer(updLayerNext);
    }

    public doDelete(): void {
        let {targetIds, setTargetIds} = eventOperateStore;
        if (targetIds.length === 0)
            return;
        const {setContentVisible, activeConfig, activeElem} = rightStore;
        //若被删除元素处于配置项的激活状态，则取消激活状态（关闭右侧配置项）
        if (targetIds.includes(activeElem.id!)) {
            setContentVisible(false);
            activeConfig(null, "");
        }

        const {delItem, layerConfigs, compController} = layerManager;
        const delPrev: IDelOperateData[] = [];
        const delNext: IDelOperateData[] = [];
        const updPrev: IUpdLayerOperateData[] = [];
        const updNext: IUpdLayerOperateData[] = [];

        //计算本次操作所涉及到的所有图层id
        const relatedLayerIds: Set<string> = new Set();
        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            relatedLayerIds.add(id);
            if (layer.next)
                relatedLayerIds.add(layer.next);
            if (layer.prev)
                relatedLayerIds.add(layer.prev);
            if (layer.pid) {
                const parentLayer = layerConfigs[layer.pid];
                if (parentLayer.childHeader === id)
                    relatedLayerIds.add(parentLayer.id!);
                if (parentLayer.childTail === id)
                    relatedLayerIds.add(parentLayer.id!);
            }
        });

        const toBeUpd = Array.from(relatedLayerIds).filter((id) => !targetIds.includes(id));

        //记录删除前状态
        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            const elemConfig = compController[id] && compController[id].getConfig();
            delPrev.push({id, layerConfig: cloneDeep(layer), elemConfig: elemConfig})
        });
        updPrev.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        toBeUpd.forEach((id) => {
            const layer = layerConfigs[id];
            const {next, prev, childHeader, childTail, pid} = layer;
            updPrev.push({id, next, prev, childHeader, childTail, pid});
        })

        //修改数据
        runInAction(() => {
            targetIds.forEach((id) => {
                const layer = layerConfigs[id];
                const prevLayer = layerConfigs[layer.prev!];
                const nextLayer = layerConfigs[layer.next!];

                if (layer.id === layerManager.layerHeader)
                    layerManager.layerHeader = layer.next;
                if (layer.id === layerManager.layerTail)
                    layerManager.layerTail = layer.prev;

                prevLayer && (prevLayer.next = layer?.next);
                nextLayer && (nextLayer.prev = layer?.prev);
                if (layer.pid) {
                    const parentLayer = layerConfigs[layer.pid];
                    if (parentLayer.childHeader === id)
                        parentLayer.childHeader = layer?.next;
                    if (parentLayer.childTail === id)
                        parentLayer.childTail = layer?.prev;
                }
            });
            delItem(targetIds);
        });

        //记录删除后状态
        toBeUpd.forEach((id) => {
            const layer = layerConfigs[id];
            const {next, prev, childHeader, childTail, pid} = layer;
            updNext.push({id, next, prev, childHeader, childTail, pid});
        });
        delNext.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})

        historyOperator.put({
            actions: [
                {type: OperateType.DEL, prev: delPrev, next: delNext},
                {type: OperateType.UPDATE_LAYER, prev: updPrev, next: updNext}
            ]
        });

        setTargetIds([]);
        //删除组件后，重新聚焦鼠标指针到容器上，避免鼠标失去焦点导致其他快捷键失效。
        eventOperateStore?.focusDesignerCanvas();
    }

    /**
     * @see https://picss.sunbangyan.cn/2023/12/04/6d352450af32841a97f4784d2252eeb8.jpeg
     * 被复制的图层可以同时包含普通图层、分组图层和分组图层的子图层。
     * 1.普通图层和没有包含分组图层的子图层，则直接复制。
     * 2.对于分组图层和其下的子图层，复制时需要创建复制前后的映射关系，复制完毕后根据映射关系恢复新图层之前的层级关系。
     * @param ids
     */
    public doCopy(ids: string[]): string[] {
        if (ids.length === 0)
            return [];

        const addPrev: IAddOperateData[] = [];
        const addNext: IAddOperateData[] = [];
        const updPrev: IUpdLayerOperateData[] = [];
        const updNext: IUpdLayerOperateData[] = [];
        const layerIdOldToNew: Record<string, string> = {};
        const newLayouts: ILayerItem[] = [];
        const newIds: string[] = [];

        //计算复制操作所涉及的所有图层
        const relatedLayerIds: Set<string> = new Set();
        ids.forEach((id) => {
            const layer = layerManager.layerConfigs[id];
            relatedLayerIds.add(id)
            if (layer.prev)
                relatedLayerIds.add(layer.prev);
            if (layer.pid) {
                const parentLayer = layerManager.layerConfigs[layer.pid];
                if (parentLayer) {
                    relatedLayerIds.add(parentLayer.id!);
                    relatedLayerIds.add(parentLayer.childHeader!);
                }
            }
        });

        //记录操作前状态
        updPrev.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerManager.layerConfigs[id];
            const {prev, next, childHeader, childTail, pid} = layer;
            updPrev.push({id, prev, next, childHeader, childTail, pid})
        })

        //执行复制操作
        runInAction(() => {
            const {layerConfigs, compController, elemConfigs} = layerManager;

            //复制数据
            ids.forEach((oldLayerId) => {
                const oldLayer = layerConfigs[oldLayerId];
                const newLayer = cloneDeep(oldLayer);
                newLayer.id = IdGenerate.generateId();
                newLayer.name = newLayer.name + "-副本";
                newLayer.prev = undefined;
                newLayer.next = undefined;
                if (newLayer.type !== 'group') {
                    newLayer.x = newLayer.x! + 10;
                    newLayer.y = newLayer.y! + 10;
                }
                layerConfigs[newLayer.id] = newLayer;
                layerIdOldToNew[oldLayerId] = newLayer.id!;

                //生成新组件配置项数据
                const oldCompController = compController[oldLayer.id!];
                if (oldCompController) {
                    const newConfig = cloneDeep(oldCompController.getConfig());
                    newConfig.base.id = newLayer.id;
                    elemConfigs![newLayer.id] = newConfig;
                }
                newIds.push(newLayer.id);
                newLayouts.push(newLayer);
            });

            //更新复制后的图层层级关系
            ids.forEach((oldLayerId) => {
                const oldLayer = layerConfigs[oldLayerId];
                const newLayer = layerConfigs[layerIdOldToNew[oldLayerId]];

                if (oldLayer.type === 'group') {
                    newLayer.childHeader = layerIdOldToNew[oldLayer.childHeader!];
                    newLayer.childTail = layerIdOldToNew[oldLayer.childTail!];
                }

                //不在分组内的图层
                if (!oldLayer.pid) {
                    const oldPrevLayer = layerConfigs[oldLayer.prev!];
                    newLayer.prev = oldPrevLayer?.id;
                    newLayer.next = oldLayer?.id;
                    oldLayer && (oldLayer.prev = newLayer.id);
                    oldPrevLayer && (oldPrevLayer.next = newLayer.id);
                    if (oldLayer.id === layerManager.layerHeader)
                        layerManager.layerHeader = newLayer.id;
                } else {
                    //在分组内的图层，且整个分组都需要复制
                    if (oldLayer.pid && ids.includes(oldLayer.pid)) {
                        newLayer.prev = layerIdOldToNew[oldLayer.prev!];
                        newLayer.next = layerIdOldToNew[oldLayer.next!];
                        newLayer.pid = layerIdOldToNew[oldLayer.pid!];
                    } else { //在分组内，但仅分组内的单个图层复制
                        const oldChildPrevLayer = layerConfigs[oldLayer.prev!];
                        newLayer.prev = oldChildPrevLayer?.id;
                        newLayer.next = oldLayer?.id;
                        oldLayer && (oldLayer.prev = newLayer.id);
                        oldChildPrevLayer && (oldChildPrevLayer.next = newLayer.id);

                        const parentLayer = layerConfigs[oldLayer.pid!];
                        if (parentLayer.childHeader === oldLayer.id)
                            parentLayer.childHeader = newLayer.id;
                    }
                }
            });
        });

        //记录操作后数据
        updNext.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerManager.layerConfigs[id];
            const {prev, next, childHeader, childTail, pid} = layer;
            updNext.push({id, prev, next, childHeader, childTail, pid})
        })
        newIds.forEach((id) => {
            const newLayer = layerManager.layerConfigs[id];
            const newConfig = layerManager.elemConfigs![id];
            if (newLayer.type === 'group')
                addNext.push({id: id, layerConfig: cloneDeep(newLayer)})
            else
                addNext.push({id: id, layerConfig: cloneDeep(newLayer), elemConfig: newConfig})
        })

        historyOperator.put({
            actions: [
                {type: OperateType.ADD, prev: addPrev, next: addNext},
                {type: OperateType.UPDATE_LAYER, prev: updPrev, next: updNext},
            ]
        })
        //多个组件同时复制时，需要计算多选框的新位置
        if (newLayouts.length > 1) {
            const {groupCoordinate, setGroupCoordinate} = eventOperateStore;
            setGroupCoordinate({minX: groupCoordinate.minX! + 10, minY: groupCoordinate.minY! + 10})
        }
        return newIds;
    }

    public doHideUpd(items: ILayerItem[]): void {
        const prev: IHideOperateData[] = [];
        const next: IHideOperateData[] = [];
        const {layerConfigs, updateLayer} = layerManager;
        items.forEach((item) => {
            const {id, hide} = item;
            next.push({id: id!, hide: hide!});
            const oldHideData = layerConfigs[id!];
            prev.push({id: id!, hide: oldHideData.hide!});
        })
        const data: IHistoryRecord = {type: OperateType.HIDE, prev, next}
        historyOperator.put({actions: [data]});
        //更新隐藏状态
        updateLayer(items);
        //取消所有选中状态
        const {setTargetIds} = eventOperateStore;
        setTargetIds([]);
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
            //更新图层列表
            items.forEach((item) => {
                (layerInstances[item.id!] as Component)?.setState({hide: item.hide, selected: false})
            })
        }
    }

    public doLockUpd(items: ILayerItem[]): void {
        const prev: ILockOperateData[] = [];
        const next: ILockOperateData[] = [];
        const {layerConfigs, updateLayer} = layerManager;
        items.forEach((item) => {
            const {id, lock} = item;
            next.push({id: id!, lock: lock!});
            const oldLockData = layerConfigs[id!];
            prev.push({id: id!, lock: oldLockData.lock!});
        })
        const data: IHistoryRecord = {type: OperateType.LOCK, prev, next}
        historyOperator.put({actions: [data]});
        updateLayer(items);
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
            //更新图层列表
            items.forEach((item) => {
                (layerInstances[item.id!] as Component)?.setState({lock: item.lock})
            })
        }
    }

    /**
     * 判断是否可以上移图层
     * @param targetIds
     * @private
     */
    private canMoveUp(targetIds: string[]): boolean {
        const {layerConfigs} = layerManager;
        const layerHeaderMap: Record<string, string[]> = {};

        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            if (layer.pid) {
                const parentLayer = layerConfigs[layer.pid]
                if (parentLayer.childHeader) {
                    if (!layerHeaderMap[parentLayer.childHeader])
                        layerHeaderMap[parentLayer.childHeader] = [id];
                    else
                        layerHeaderMap[parentLayer.childHeader].push(id);
                }
            } else {
                if (!layerHeaderMap[layerManager.layerHeader!])
                    layerHeaderMap[layerManager.layerHeader!] = [id];
                else
                    layerHeaderMap[layerManager.layerHeader!].push(id);
            }
        })

        for (const [header, layerIds] of Object.entries(layerHeaderMap)) {
            if (layerIds.includes(header!)) {
                let count = 1;
                let layer = layerConfigs[header]
                while (layer.next) {
                    layer = layerConfigs[layer.next];
                    if (targetIds.includes(layer.id!))
                        count++;
                    else
                        break;
                }
                if (count >= layerIds.length)
                    targetIds = targetIds.filter(id => !layerIds.includes(id))
            }
        }

        return targetIds.length !== 0;
    }

    /**
     * 判断图层是否可以下移
     * @param targetIds
     * @private
     */
    private canMoveDown(targetIds: string[]): boolean {
        const {layerConfigs} = layerManager;
        const layerTailMap: Record<string, string[]> = {};

        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            if (layer.pid) {
                const parentLayer = layerConfigs[layer.pid]
                if (parentLayer.childTail) {
                    if (!layerTailMap[parentLayer.childTail])
                        layerTailMap[parentLayer.childTail] = [id];
                    else
                        layerTailMap[parentLayer.childTail].push(id);
                }
            } else {
                if (!layerTailMap[layerManager.layerTail!])
                    layerTailMap[layerManager.layerTail!] = [id];
                else
                    layerTailMap[layerManager.layerTail!].push(id);
            }
        })


        for (const [tail, layerIds] of Object.entries(layerTailMap)) {
            if (layerIds.includes(tail!)) {
                let count = 1;
                let layer = layerConfigs[tail]
                while (layer.prev) {
                    layer = layerConfigs[layer.prev];
                    if (targetIds.includes(layer.id!))
                        count++;
                    else
                        break;
                }
                if (count >= layerIds.length)
                    targetIds = targetIds.filter(id => !layerIds.includes(id))
            }
        }

        return targetIds.length !== 0;
    }

    public doLayerToTop(): void {
        let {targetIds} = eventOperateStore;
        if (targetIds.length === 0)
            return;

        if (!this.canMoveUp(targetIds))
            return;

        const {layerConfigs} = layerManager;
        const updPrev: IUpdLayerOperateData[] = [];
        const updNext: IUpdLayerOperateData[] = [];

        let finalTargetIds = targetIds.filter((id) => {
            const layer = layerConfigs[id];
            return !layer.pid || (layer.pid && !targetIds.includes(layer.pid));
        })

        //计算相关的图层id
        const relatedLayerIds: Set<string> = new Set();
        relatedLayerIds.add(layerManager.layerHeader!);
        finalTargetIds.forEach((id) => {
            const layer = layerConfigs[id];
            relatedLayerIds.add(id);
            layer.next && relatedLayerIds.add(layer.next);
            layer.prev && relatedLayerIds.add(layer.prev);
            layer.pid && relatedLayerIds.add(layer.pid);
        });

        //记录数据修改前状态
        updPrev.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const {prev, next, childHeader, childTail} = layerConfigs[id];
            updPrev.push({id, prev, next, childHeader, childTail})
        });

        //将被操作图层排序
        finalTargetIds = finalTargetIds.sort((prev, next) => {
            const prevLayer = layerConfigs[prev];
            const nextLayer = layerConfigs[next];
            return prevLayer.order! - nextLayer.order!;
        });

        //修改数据
        runInAction(() => {
            for (let i = 0; i < finalTargetIds.length; i++) {
                const id = finalTargetIds[i];
                const layer = layerConfigs[id];
                const prevLayer = layerConfigs[layer.prev!];
                const nextLayer = layerConfigs[layer.next!];
                if (layer.pid) {
                    //组内元素
                    const parentLayer = layerConfigs[layer.pid!];
                    if (parentLayer.childHeader === id)
                        continue;
                    const oldHeaderChildLayer = layerConfigs[parentLayer.childHeader!];
                    layer.prev = undefined;
                    layer.next = parentLayer?.childHeader;
                    prevLayer && (prevLayer.next = nextLayer?.id);
                    nextLayer && (nextLayer.prev = prevLayer?.id);
                    oldHeaderChildLayer && (oldHeaderChildLayer.prev = id);
                    parentLayer.childHeader = id;
                    if (id === parentLayer.childTail)
                        parentLayer.childTail = prevLayer?.id;
                } else {
                    //组外元素
                    if (layerManager.layerHeader === id)
                        continue;
                    layer.prev = undefined;
                    layer.next = layerManager.layerHeader;
                    prevLayer && (prevLayer.next = nextLayer?.id);
                    nextLayer && (nextLayer.prev = prevLayer?.id);
                    const oldHeaderLayer = layerConfigs[layerManager.layerHeader!];
                    oldHeaderLayer && (oldHeaderLayer.prev = id);
                    layerManager.layerHeader = id;
                    if (id === layerManager.layerTail)
                        layerManager.layerTail = prevLayer?.id;
                }
            }
        })

        //记录数据修改后状态
        updNext.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const {prev, next, childHeader, childTail} = layerConfigs[id];
            updNext.push({id, prev, next, childHeader, childTail})
        });

        historyOperator.put({actions: [{type: OperateType.UPDATE_LAYER, prev: updPrev, next: updNext}]});
        layerManager.reRenderLayer();
    }

    public doLayerToBottom(): void {
        const {targetIds} = eventOperateStore;
        if (targetIds.length === 0 || !this.canMoveDown(targetIds))
            return;

        const updPrev: IUpdLayerOperateData[] = [];
        const updNext: IUpdLayerOperateData[] = [];
        const {layerConfigs} = layerManager;

        let finalTargetIds = targetIds.filter((id) => {
            const layer = layerConfigs[id];
            return !layer.pid || (layer.pid && !targetIds.includes(layer.pid));
        })

        //计算相关的图层id
        const relatedLayerIds: Set<string> = new Set();
        relatedLayerIds.add(layerManager.layerTail!)
        finalTargetIds.forEach((id) => {
            const layer = layerConfigs[id];
            relatedLayerIds.add(id);
            layer.next && relatedLayerIds.add(layer.next);
            layer.prev && relatedLayerIds.add(layer.prev);
            layer.pid && relatedLayerIds.add(layer.pid);
        });

        //记录数据修改前状态
        updPrev.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const {prev, next, childHeader, childTail} = layerConfigs[id];
            updPrev.push({id, prev, next, childHeader, childTail})
        });

        //将被操作图层排序
        finalTargetIds = finalTargetIds.sort((prev, next) => {
            const prevLayer = layerConfigs[prev];
            const nextLayer = layerConfigs[next];
            return nextLayer.order! - prevLayer.order!;
        });

        //修改数据
        runInAction(() => {
            for (let i = 0; i < finalTargetIds.length; i++) {
                const id = finalTargetIds[i];
                const layer = layerConfigs[id];
                const prevLayer = layerConfigs[layer.prev!];
                const nextLayer = layerConfigs[layer.next!];
                if (layer.pid) {
                    //组内元素
                    const parentLayer = layerConfigs[layer.pid!];
                    if (id === parentLayer.childTail)
                        continue;
                    const oldTailChildLayer = layerConfigs[parentLayer.childTail!];
                    layer.prev = parentLayer.childTail;
                    layer.next = undefined;
                    prevLayer && (prevLayer.next = nextLayer?.id);
                    nextLayer && (nextLayer.prev = prevLayer?.id);
                    oldTailChildLayer && (oldTailChildLayer.next = id);
                    parentLayer.childTail = id;
                    if (id === parentLayer.childHeader)
                        parentLayer.childHeader = nextLayer?.id;
                } else {
                    //组外元素
                    if (layerManager.layerTail === id)
                        continue;
                    layer.prev = layerManager.layerTail;
                    layer.next = undefined;
                    prevLayer && (prevLayer.next = nextLayer?.id);
                    nextLayer && (nextLayer.prev = prevLayer?.id);
                    const oldTailLayer = layerConfigs[layerManager.layerTail!];
                    oldTailLayer && (oldTailLayer.next = id);
                    layerManager.layerTail = id;
                    if (id === layerManager.layerHeader)
                        layerManager.layerHeader = nextLayer?.id;
                }
            }
        })

        //记录数据修改后状态
        updNext.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const {prev, next, childHeader, childTail} = layerConfigs[id];
            updNext.push({id, prev, next, childHeader, childTail})
        });

        historyOperator.put({actions: [{type: OperateType.UPDATE_LAYER, prev: updPrev, next: updNext}]});
        layerManager.reRenderLayer();
    }

    public doLayerMoveUp(): void {
        let {targetIds} = eventOperateStore;
        if (targetIds.length === 0)
            return;

        if (!this.canMoveUp(targetIds))
            return;

        const {layerConfigs} = layerManager;
        const prev: IUpdLayerOperateData[] = [];
        const next: IUpdLayerOperateData[] = [];

        //收集相关的图层id
        const relatedLayerIds: Set<string> = new Set();
        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            const prevLayer = layerConfigs[layer.prev!];
            relatedLayerIds.add(id);
            if (layer && layer.next)
                relatedLayerIds.add(layer.next);
            if (layer && layer.prev)
                relatedLayerIds.add(layer.prev);
            if (prevLayer && prevLayer.prev)
                relatedLayerIds.add(prevLayer.prev!);
        });

        //将被操作图层排序
        targetIds = targetIds.sort((prev, next) => {
            const prevLayer = layerConfigs[prev];
            const nextLayer = layerConfigs[next];
            return nextLayer.order! - prevLayer.order!;
        });

        //记录数据变更前状态
        prev.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            const {childTail, childHeader} = layer;
            prev.push({id, prev: layer.prev, next: layer.next, childHeader, childTail})
        });

        //变更数据
        runInAction(() => {
            targetIds.forEach((id) => {
                const layer = layerConfigs[id];
                const prevLayer = layerConfigs[layer.prev!];
                const prevPrevLayer = layerConfigs[prevLayer?.prev!];
                const nextLayer = layerConfigs[layer.next!];
                if (layer.pid) {
                    //在分组内
                    const parent = layerConfigs[layer.pid];
                    if (id !== parent.childHeader) {
                        if (layer.prev === parent.childHeader)
                            parent.childHeader = id;
                        if (id === parent.childTail)
                            parent.childTail = layer.prev!;
                        layer.prev = prevPrevLayer?.id;
                        layer.next = prevLayer?.id;
                        if (prevLayer) {
                            prevLayer.prev = layer.id
                            prevLayer.next = nextLayer?.id
                        }
                        prevPrevLayer && (prevPrevLayer.next = layer.id)
                        nextLayer && (nextLayer.prev = prevLayer?.id)
                    }
                } else {
                    //不再分组内
                    if (id !== layerManager.layerHeader) {
                        if (layer.prev === layerManager.layerHeader)
                            layerManager.layerHeader = id;
                        if (id === layerManager.layerTail)
                            layerManager.layerTail = layer.prev!;
                        layer.prev = prevPrevLayer?.id;
                        layer.next = prevLayer?.id;
                        if (prevLayer) {
                            prevLayer.prev = layer.id
                            prevLayer.next = nextLayer?.id
                        }
                        prevPrevLayer && (prevPrevLayer.next = layer.id)
                        nextLayer && (nextLayer.prev = prevLayer?.id)
                    }
                }
            })
        })

        //记录数据变更后状态
        next.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            const {childTail, childHeader} = layer;
            next.push({id, prev: layer.prev, next: layer.next, childHeader, childTail})
        });
        historyOperator.put({actions: [{type: OperateType.UPDATE_LAYER, prev, next}]});
        layerManager.reRenderLayer();
    }

    public doLayerMoveDown(): void {
        let {targetIds} = eventOperateStore;
        if (targetIds.length === 0 || !this.canMoveDown(targetIds))
            return;

        const {layerConfigs} = layerManager;
        const prev: IUpdLayerOperateData[] = [];
        const next: IUpdLayerOperateData[] = [];

        //收集相关的图层id
        const relatedLayerIds: Set<string> = new Set();
        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            const nextLayer = layerConfigs[layer.next!];
            relatedLayerIds.add(id);
            if (layer && layer.next)
                relatedLayerIds.add(layer.next);
            if (layer && layer.prev)
                relatedLayerIds.add(layer.prev);
            if (nextLayer && nextLayer.next)
                relatedLayerIds.add(nextLayer.next!);
        });

        //将被操作图层排序
        targetIds = targetIds.sort((prev, next) => {
            const prevLayer = layerConfigs[prev];
            const nextLayer = layerConfigs[next];
            return prevLayer.order! - nextLayer.order!;
        });

        //记录数据变更前状态
        prev.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            const {childTail, childHeader} = layer;
            prev.push({id, prev: layer.prev, next: layer.next, childHeader, childTail})
        });

        //变更数据
        runInAction(() => {
            targetIds.forEach((id) => {
                const layer = layerConfigs[id];
                const prevLayer = layerConfigs[layer.prev!];
                const nextLayer = layerConfigs[layer.next!];
                const nextNextLayer = layerConfigs[nextLayer?.next!];
                if (layer.pid) {
                    //在分组内
                    const parent = layerConfigs[layer.pid];
                    if (id !== parent.childTail) {
                        if (layer.next === parent.childTail)
                            parent.childTail = id;
                        if (id === parent.childHeader)
                            parent.childHeader = layer.next!;
                        layer.prev = nextLayer?.id;
                        layer.next = nextNextLayer?.id;
                        if (nextLayer) {
                            nextLayer.prev = prevLayer?.id
                            nextLayer.next = layer.id
                        }
                        prevLayer && (prevLayer.next = nextLayer?.id)
                        nextNextLayer && (nextNextLayer.prev = layer?.id)
                    }
                } else {
                    //不再分组内
                    if (id !== layerManager.layerTail) {
                        if (layer.next === layerManager.layerTail)
                            layerManager.layerTail = id;
                        if (id === layerManager.layerHeader)
                            layerManager.layerHeader = layer.next!;
                        layer.prev = nextLayer?.id;
                        layer.next = nextNextLayer?.id;
                        if (nextLayer) {
                            nextLayer.prev = prevLayer?.id
                            nextLayer.next = layer.id
                        }
                        prevLayer && (prevLayer.next = nextLayer?.id)
                        nextNextLayer && (nextNextLayer.prev = layer?.id)
                    }
                }
            })
        })

        //记录数据变更后状态
        next.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            const {childTail, childHeader} = layer;
            next.push({id, prev: layer.prev, next: layer.next, childHeader, childTail})
        });
        historyOperator.put({actions: [{type: OperateType.UPDATE_LAYER, prev, next}]});
        layerManager.reRenderLayer();
    }

    /**
     * 记录组件配置更新
     * @param newData
     * @param oldData
     */
    public doStyleUpd(newData: ConfigureObjectFragments, oldData: ConfigureObjectFragments): void {
        const {activeElem: {id}} = rightStore;
        const record: IHistoryRecord = {
            type: OperateType.UPD_STYLE,
            prev: {id, data: oldData} as IUpdStyleOperateData,
            next: {id, data: newData} as IUpdStyleOperateData
        }
        historyOperator.put({actions: [record]});
    }

    /**
     * 图层编组
     */
    public doGrouping() {
        const {targetIds, setTargetIds} = eventOperateStore;
        if (!targetIds || targetIds.length <= 1)
            return;
        //被选中图层如已处于相同分组下，则无需进行分组操作
        if (LayerUtil.hasSameGroup(targetIds))
            return;
        //查找当前选中的图层的所有最上层的分组图层,作为本次分组的子图层
        let beGroupIds = LayerUtil.findTopGroupLayer(targetIds, true);
        //构建新的分组数据
        const {layerConfigs, addItem} = layerManager;
        const groupId = IdGenerate.generateId();
        //计算新分组的锁定状态
        let allLock = layerConfigs[beGroupIds[0]].lock;
        for (let i = 1; i < beGroupIds.length; i++) {
            if (allLock !== layerConfigs[beGroupIds[i]].lock) {
                allLock = false;
                break;
            }
        }
        //构建新的分组数据
        const groupItem: ILayerItem = {
            id: groupId,
            type: 'group',
            name: '新建分组',
            hide: false,
            lock: allLock,
        };

        //计算相关图层
        const relatedLayerIds: Set<string> = new Set();
        relatedLayerIds.add(layerManager.layerHeader!);
        beGroupIds.forEach((id) => {
            const layer = layerConfigs[id];
            relatedLayerIds.add(id);
            if (layer.next)
                relatedLayerIds.add(layer.next);
            if (layer.prev)
                relatedLayerIds.add(layer.prev);
        });

        //构建操作记录
        const updPrev: IUpdLayerOperateData[] = [];
        const updNext: IUpdLayerOperateData[] = [];
        const addNext: IAddOperateData[] = [];

        //记录操作前状态
        updPrev.push({layerHeader: layerManager.layerHeader});
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            updPrev.push({id, pid: layer.pid, prev: layer.prev, next: layer.next});
        });

        let chileHeader = "";
        let chileTail = "";
        //修改数据
        runInAction(() => {
            //对目标图层排序
            beGroupIds = beGroupIds.sort((prev, next) => {
                const prevLayer = layerConfigs[prev];
                const nextLayer = layerConfigs[next];
                return prevLayer.order! - nextLayer.order!;
            });
            beGroupIds.forEach((id) => {
                const layer = layerConfigs[id];
                const prevLayer = layerConfigs[layer.prev!];
                const nextLayer = layerConfigs[layer.next!];

                if (layerManager.layerHeader === id)
                    layerManager.layerHeader = layer.next;
                if (layerManager.layerTail === id) {
                    //如果当前图层加入分组前layer.prev指向为undefine，则说明所有图层都加入了分组，则最新的designerStore.layerTail指向本次分组的id
                    layerManager.layerTail = layer.prev || groupItem.id;
                }

                layer.pid = groupId;
                //prev图层和next图层建立联系
                prevLayer && (prevLayer.next = layer.next);
                nextLayer && (nextLayer.prev = layer.prev);
                //清空原有图层的prev和next指针
                layer.prev = undefined;
                layer.next = undefined;

                //头插法建立子双向链表
                if (chileHeader) {
                    const oldChildHeader = layerConfigs[chileHeader];
                    oldChildHeader.prev = id;
                    layer.next = chileHeader;
                } else {
                    chileTail = id;
                }
                chileHeader = id;
            });
        });
        groupItem.childHeader = chileHeader;
        groupItem.childTail = chileTail;
        groupItem.next = layerManager.layerHeader;
        const oldHeader = layerConfigs[layerManager.layerHeader!];
        oldHeader && (oldHeader.prev = groupId)
        addItem(groupItem);

        //记录操作后状态
        layerManager.layerHeader = groupId;
        updNext.push({layerHeader: groupId});
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            updNext.push({id, pid: layer.pid, prev: layer.prev, next: layer.next});
        });
        addNext.push({id: groupId, layerConfig: groupItem});
        const actions: IHistoryRecord[] = [
            {type: OperateType.ADD, prev: null, next: addNext},
            {type: OperateType.UPDATE_LAYER, prev: updPrev, next: updNext}
        ];
        historyOperator.put({actions});
        setTargetIds([]);
        //特殊场景处理，如果编组时，所有的子图层都处于锁定状态，则编组后，编组图层也处于锁定状态
        if (allLock) {
            const {layerInstances} = layerListStore;
            const groupTimer = setTimeout(() => {
                (layerInstances[groupId] as Component).setState({lock: true});
                clearTimeout(groupTimer);
            }, 10);
        }
    }

    public doUnGrouping() {
        const {targetIds, setTargetIds} = eventOperateStore;
        if (targetIds.length === 0)
            return;
        //找出当前选中的图层中，最顶层的分组图层
        let groupIds = LayerUtil.findTopGroupLayer(targetIds, true);
        //过滤掉其中分组等于自身的图层（即非分组图层）
        const {layerConfigs, delLayout} = layerManager;
        groupIds = groupIds.filter((id: string) => layerConfigs[id].type === 'group');
        //对每个分组图层进行解组
        const updPrev: IUpdLayerOperateData[] = [];
        const updNext: IUpdLayerOperateData[] = [];
        const delPrev: IDelOperateData[] = [];


        const relatedLayerIds: Set<string> = new Set();
        groupIds.forEach((id) => {
            const groupLayer = layerConfigs[id];
            if (groupLayer.next)
                relatedLayerIds.add(groupLayer.next);
            if (groupLayer.prev)
                relatedLayerIds.add(groupLayer.prev);
            if (groupLayer.childHeader) {
                let childLayer = layerConfigs[groupLayer.childHeader];
                if (childLayer)
                    relatedLayerIds.add(childLayer.id!)
                while (childLayer?.next) {
                    childLayer = layerConfigs[childLayer.next];
                    if (childLayer)
                        relatedLayerIds.add(childLayer.id!)
                }
            }
        });

        //记录操作前状态
        updPrev.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail});
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            const {prev, next, pid, childHeader, childTail} = layer;
            updPrev.push({id, prev, next, pid, childHeader, childTail});
        });
        groupIds.forEach((id) => {
            delPrev.push({id, layerConfig: cloneDeep(layerConfigs[id])})
        })

        //修改数据
        runInAction(() => {
            groupIds.forEach((groupId: string) => {
                const layer = layerConfigs[groupId];
                const prevLayer = layerConfigs[layer.prev!];
                const nextLayer = layerConfigs[layer.next!];
                const childHeaderLayer = layerConfigs[layer.childHeader!];
                const childTailLayer = layerConfigs[layer.childTail!];
                childHeaderLayer && (childHeaderLayer.prev = prevLayer?.id)
                childTailLayer && (childTailLayer.next = nextLayer?.id)
                prevLayer && (prevLayer.next = layer?.childHeader)
                nextLayer && (nextLayer.prev = layer?.childTail)

                let childNext = layer.childHeader;
                while (childNext) {
                    const childLayer = layerConfigs[childNext];
                    childLayer && (childLayer.pid = undefined)
                    childNext = childLayer?.next;
                }

                if (groupId === layerManager.layerHeader)
                    layerManager.layerHeader = layer.childHeader;
                if (groupId === layerManager.layerTail)
                    layerManager.layerTail = layer.childTail;
            });
            delLayout(groupIds);
        });

        //记录操作后数据
        updNext.push({layerHeader: layerManager.layerHeader, layerTail: layerManager.layerTail});
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            const {prev, next, pid, childHeader, childTail} = layer;
            updNext.push({id, prev, next, pid, childHeader, childTail});
        });

        const actions: IHistoryRecord[] = [
            {type: OperateType.UPDATE_LAYER, prev: updPrev, next: updNext},
            {type: OperateType.DEL, prev: delPrev, next: null}
        ];
        historyOperator.put({actions});
        //清空组件选中状态
        setTargetIds([]);
        //处理右侧设置项，如果为当前选中的分组图层，则卸载该设置项（因为分组图层已经被删除）
        const {activeElem, activeConfig, setContentVisible} = rightStore;
        if (activeElem && groupIds.includes(activeElem.id!)) {
            setContentVisible(false);
            activeConfig(null, "");
        }
    }

    public doRemoveFromGroup() {
        let {targetIds} = eventOperateStore;
        if (targetIds.length === 0)
            return;
        //筛选出目标图层
        const {layerConfigs} = layerManager;
        const finalTargetIds = targetIds.filter(id => {
            const layer = layerConfigs[id];
            return layer.pid && !targetIds.includes(layer.pid)
        })

        const updPrev: IUpdLayerOperateData[] = [];
        const updNext: IUpdLayerOperateData[] = [];

        //计算关联图层id
        const relateIds = new Set<string>();
        relateIds.add(layerManager.layerHeader!);
        finalTargetIds.forEach(id => {
            const layer = layerConfigs[id];
            const parent = layerConfigs[layer.pid!];
            relateIds.add(layer.id!)
            if (layer.prev)
                relateIds.add(layer.prev)
            if (layer.next)
                relateIds.add(layer.next)
            if (parent.childHeader === id || parent.childTail === id)
                relateIds.add(parent.id!)
        })

        //记录数据变更前状态
        updPrev.push({layerHeader: layerManager.layerHeader!, layerTail: layerManager.layerTail!})
        relateIds.forEach((id) => {
            const layer = layerConfigs[id];
            const {prev, next, pid, childHeader, childTail} = layer;
            updPrev.push({id, prev, next, pid, childHeader, childTail});
        });

        //修改数据
        runInAction(() => {
            finalTargetIds.forEach(id => {
                const layer = layerConfigs[id];
                const prevLayer = layerConfigs[layer.prev!];
                const nextLayer = layerConfigs[layer.next!];
                const parentLayer = layerConfigs[layer.pid!];
                const oldHeaderLayer = layerConfigs[layerManager.layerHeader!];

                if (parentLayer.childHeader === id)
                    parentLayer.childHeader = nextLayer?.id!;
                if (parentLayer.childTail === id)
                    parentLayer.childTail = prevLayer?.id!;

                layer.pid = undefined;
                layer.prev = undefined;
                layer.next = layerManager.layerHeader;
                oldHeaderLayer.prev = layer.id;
                layerManager.layerHeader = layer.id;

                prevLayer && (prevLayer.next = nextLayer?.id)
                nextLayer && (nextLayer.prev = prevLayer?.id)
            })
        })

        //记录数据变更后状态
        updNext.push({layerHeader: layerManager.layerHeader!, layerTail: layerManager.layerTail!})
        relateIds.forEach((id) => {
            const layer = layerConfigs[id];
            const {prev, next, pid, childHeader, childTail} = layer;
            updNext.push({id, prev, next, pid, childHeader, childTail});
        });

        historyOperator.put({actions: [{type: OperateType.UPDATE_LAYER, prev: updPrev, next: updNext}]});
        layerManager.reRenderLayer();
    }

}

const historyRecordOperateProxy = new HistoryRecordOperateProxy();
export default historyRecordOperateProxy;



