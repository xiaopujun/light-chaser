import designerStore from "../../store/DesignerStore";
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
import {toJS} from "mobx";
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
        const {layerConfigs, updateLayer} = designerStore;
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
        const {layerConfigs, updateLayer} = designerStore;
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
        const {layerConfigs, updateLayer} = designerStore;

        //头插法建立双向链表
        if (!designerStore.layerHeader) {
            //首次插入
            addPrev.push({layerHeader: undefined, layerTail: undefined})
            designerStore.layerHeader = layer.id;
            designerStore.layerTail = layer.id;
        } else {
            //非首次插入
            addPrev.push({layerHeader: designerStore.layerHeader})
            const oldHeaderLayer = layerConfigs[designerStore.layerHeader];
            updLayerPrev.push({id: oldHeaderLayer.id, prev: oldHeaderLayer.prev})
            oldHeaderLayer.prev = layer.id;
            layer.next = oldHeaderLayer.id;
            designerStore.layerHeader = layer.id;
            updLayerNext.push({id: oldHeaderLayer.id, prev: layer.id})
        }
        addNext.push({
            id: layer.id,
            layerConfig: cloneDeep(layer),
            layerHeader: designerStore.layerHeader,
            layerTail: designerStore.layerTail
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
        const delPrev: IDelOperateData[] = [];
        const delNext: IDelOperateData[] = [];
        const updLayerPrev: IUpdLayerOperateData[] = [];
        const updLayerNext: IUpdLayerOperateData[] = [];


        //记录删除前图层双向链表的头尾指针
        delPrev.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})

        let {targetIds, setTargetIds} = eventOperateStore;
        const {delItem, layerConfigs, compController, updateLayer} = designerStore;
        if (!targetIds || targetIds.length === 0) return;
        const {setContentVisible, activeConfig, activeElem} = rightStore;
        //若被删除元素处于配置项的激活状态，则取消激活状态（关闭右侧配置项）
        if (targetIds.includes(activeElem.id!)) {
            setContentVisible(false);
            activeConfig(null, "");
        }

        //对被删除元素分类：1. 完全独立的组件（没有分组）2.分组的子组件（选中了分组中的子组件，但没有选中分组）3.分组图层（包括分组图层和其下所有子图层）
        //可删除数据分为：1. 可以直接删除的数据。 2. 删除后需要维护图层关系的数据
        const directDelIds: string[] = [];
        const maintenanceDelIds: string[] = [];
        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            if (layer) {
                const {type, pid} = layer;
                if (type !== 'group' && pid && !targetIds.includes(pid))
                    maintenanceDelIds.push(id);
                else
                    directDelIds.push(id);
            }
        });

        //可直接删除的数据--构建操作记录
        directDelIds.forEach((id) => {
            const oldLayer = layerConfigs[id];
            if (oldLayer.type === 'group') {
                delPrev.push({id, layerConfig: cloneDeep(layerConfigs[id])})
            } else {
                const elemConfig = compController[id] && compController[id].getConfig();
                delPrev.push({id, layerConfig: cloneDeep(layerConfigs[id]), elemConfig: elemConfig})
            }
        })

        //需要维护图层关系的数据--构建操作记录
        maintenanceDelIds.forEach((id) => {
                const {pid} = layerConfigs[id];
                const groupLayer = layerConfigs[pid!];
                if (groupLayer.childIds!.length === 1 && groupLayer.childIds![0] === id) {
                    //说明该分组下只有一个图层，且本次需要删除。这种场景下，将分组图层一起删除
                    delPrev.push({id: pid!, layerConfig: layerConfigs[pid!]});
                    targetIds = [...targetIds, pid!];
                } else {
                    //否则，只需要更新分组图层的childIds字段即可
                    updLayerPrev.push({id: pid!, childIds: groupLayer.childIds!});
                    //删除分组图层中的目标子图层
                    const oldChildIds = cloneDeep(groupLayer.childIds)
                    const newChildIds = oldChildIds!.filter((cid) => cid !== id);
                    updLayerNext.push({id: pid!, childIds: newChildIds});
                }
                //构建子图层的操作记录
                const elemConfig = compController[id] && compController[id].getConfig();
                delPrev.push({id, layerConfig: toJS(layerConfigs[id]), elemConfig: elemConfig});
            }
        );

        //更新被删除图层的双向指针
        targetIds.forEach((id) => {
            const oldLayer = layerConfigs[id];
            //删除的是头指针指向元素
            if (id === designerStore.layerHeader)
                designerStore.layerHeader = oldLayer.next;
            //删除的是尾指针指向元素
            if (id === designerStore.layerTail)
                designerStore.layerTail = oldLayer.prev;
            const prevLayer = cloneDeep(layerConfigs[oldLayer.prev!]);
            const nextLayer = cloneDeep(layerConfigs[oldLayer.next!]);
            if (prevLayer) {
                updLayerPrev.push({id: prevLayer.id!, next: id});
                updLayerNext.push({id: prevLayer.id!, next: oldLayer.next});
                //此处必须及时更新原有数据的next指针，否则下一轮的数据指针取到的是错误的旧数据
                updateLayer([{id: prevLayer.id!, next: oldLayer.next}], false)
            }
            if (nextLayer) {
                updLayerPrev.push({id: nextLayer.id!, prev: id});
                updLayerNext.push({id: nextLayer.id!, prev: oldLayer.prev});
                //此处必须及时更新原有数据的next指针，否则下一轮的数据指针取到的是错误的旧数据
                updateLayer([{id: nextLayer.id!, prev: oldLayer.prev}], false)
            }
        })

        delNext.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        historyOperator.put({
            actions: [
                {type: OperateType.DEL, prev: delPrev, next: delNext},
                {type: OperateType.UPDATE_LAYER, prev: updLayerPrev, next: updLayerNext}
            ]
        });

        //更新图层数据，此处虽存在部分重复更新，但不影响实际性能和最终的数据一致性，故不再做数据筛选
        updLayerNext.length > 0 && updateLayer(updLayerNext, false);
        //删除组件
        targetIds.length > 0 && delItem(targetIds);
        setTargetIds([]);
        const {focusDesignerCanvas} = eventOperateStore;
        //删除组件后，重新聚焦鼠标指针到容器上，避免鼠标失去焦点导致其他快捷键失效。
        focusDesignerCanvas();
    }

    private _copyLayerBefore = (oldLayer: ILayerItem, newIds: string[], newLayers: ILayerItem[]): ILayerItem => {
        const {layerConfigs, compController, elemConfigs} = designerStore;
        const newLayer = cloneDeep(oldLayer);
        newLayer.id = IdGenerate.generateId();
        newLayer.prev = undefined;
        newLayer.next = undefined;
        if (newLayer.type !== 'group') {
            newLayer.x = newLayer.x! + 10;
            newLayer.y = newLayer.y! + 10;
        }
        if (newLayer.pid)
            newLayer.pid = undefined;
        if (newLayer.childIds)
            newLayer.childIds = [];

        layerConfigs[newLayer.id] = newLayer;
        //生成新组件配置项数据
        const oldCompController = compController[oldLayer.id!];
        if (oldCompController) {
            const newConfig = cloneDeep(oldCompController.getConfig());
            newConfig.base.id = newLayer.id;
            elemConfigs![newLayer.id] = newConfig;
        }
        newIds.push(newLayer.id);
        newLayers.push(newLayer);
        return newLayer;
    }

    /**
     * @see https://picss.sunbangyan.cn/2023/12/04/6d352450af32841a97f4784d2252eeb8.jpeg
     * 被复制的图层可以同时包含普通图层、分组图层和分组图层的子图层。
     * 1.普通图层和没有包含分组图层的子图层，则直接复制。
     * 2.对于分组图层和其下的子图层，复制时需要创建复制前后的映射关系，复制完毕后根据映射关系恢复新图层之前的层级关系。
     * @param ids
     */
    public doCopy(ids: string[]): string[] {
        const addPrev: IAddOperateData[] = [];
        const addNext: IAddOperateData[] = [];
        const updLayerPrev: IUpdLayerOperateData[] = [];
        const updLayerNext: IUpdLayerOperateData[] = [];
        const layerIdMapOldToNew: Record<string, string> = {};
        const newLayouts: ILayerItem[] = [];
        let copyFirstLayer: boolean = true;

        //记录复制前的双向链表指针状态
        addPrev.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        //记录复制前头指针所指元素的prev指针状态
        updLayerPrev.push({id: designerStore.layerHeader, prev: undefined})

        const newIds: string[] = [];
        const {layerConfigs, elemConfigs} = designerStore;

        ids.forEach((oldLayerId) => {
            const oldLayer = layerConfigs[oldLayerId];
            if (!oldLayer)
                return;
            //赋值获取到最新的图层数据
            const newLayer = this._copyLayerBefore(oldLayer, newIds, newLayouts);
            layerIdMapOldToNew[oldLayerId] = newLayer.id!;
            const oldHeaderLayer = layerConfigs[designerStore.layerHeader!];
            //修改被赋值图层的prev和next指针
            if (copyFirstLayer) {
                //记录原头指针所指元素的prev指针的下一个状态
                updLayerNext.push({id: oldHeaderLayer.id, prev: newLayer.id})
                copyFirstLayer = false;
            }
            newLayer.next = oldHeaderLayer.id;
            oldHeaderLayer.prev = newLayer.id;
            designerStore.layerHeader = newLayer.id;
        });

        //根据oldLayer所处位置推断每个一被复制图层后的新图层的层级关系，维护其pid和childIds字段
        for (let i = 0; i < ids.length; i++) {
            const oldLayer = layerConfigs[ids[i]];
            if (!oldLayer.pid && oldLayer.type !== 'group')
                continue;
            if (oldLayer.pid && !ids.includes(oldLayer.pid)) {
                //存在pid，但pid对应图层不在被选中的图层列表中
                if (oldLayer.type === 'group') {
                    //分组图层（此时新复制出来的图层pid保持不变，但是需要更新childIds的内容，指向新复制出来的子图层）
                    const newChildIds = oldLayer.childIds!.map((childId) => layerIdMapOldToNew[childId]);
                    const newLayer = layerConfigs[layerIdMapOldToNew[oldLayer.id!]];
                    newLayer.childIds = newChildIds;
                    newLayer.pid = oldLayer.pid;
                    //该分组的父图层childIds加入新复制出来的分组图层
                    const parentLayer = layerConfigs[newLayer.pid!];
                    parentLayer.childIds!.push(newLayer.id!);
                } else {
                    //普通图层(独立子图层的复制，加入原有分组图层即可）
                    const newLayer = layerConfigs[layerIdMapOldToNew[oldLayer.id!]];
                    newLayer.pid = oldLayer.pid;
                    const parentLayer = layerConfigs[oldLayer.pid!];
                    parentLayer.childIds!.push(layerIdMapOldToNew[oldLayer.id!]);
                }
            }
            if (!oldLayer.pid && oldLayer.type === 'group') {
                //分组图层的复制，需要更新childIds的内容，指向新复制出来的子图层
                const newChildIds = oldLayer.childIds!.map((childId) => layerIdMapOldToNew[childId]);
                const newLayer = layerConfigs[layerIdMapOldToNew[oldLayer.id!]];
                newLayer.childIds = newChildIds;
            }
            if (oldLayer.pid && ids.includes(oldLayer.pid)) {
                if (oldLayer.type === 'group') {
                    //非独立子图层为分组图层时，要同时更新新复制出来的分组图层的pid和childIds
                    const newLayer = layerConfigs[layerIdMapOldToNew[oldLayer.id!]];
                    newLayer.pid = layerIdMapOldToNew[oldLayer.pid!];
                    newLayer.childIds = oldLayer.childIds!.map((childId) => layerIdMapOldToNew[childId]);
                } else {
                    //非独立子图层为普通图层时，只需要更新新复制出来图层的pid
                    const newLayer = layerConfigs[layerIdMapOldToNew[oldLayer.id!]];
                    newLayer.pid = layerIdMapOldToNew[oldLayer.pid!];
                }
            }
        }

        //设置分组复制的操作记录信息
        newIds.forEach((id) => {
            const newLayout = layerConfigs[id];
            const newConfig = elemConfigs![id];
            if (newLayout.type === 'group')
                addNext.push({id: id, layerConfig: cloneDeep(newLayout)})
            else
                addNext.push({id: id, layerConfig: cloneDeep(newLayout), elemConfig: newConfig})
        })

        //记录赋值后下一个状态的双向链表指针状态
        addNext.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})

        historyOperator.put({
            actions: [
                {type: OperateType.ADD, prev: addPrev, next: addNext},
                {type: OperateType.UPDATE_LAYER, prev: updLayerPrev, next: updLayerNext},
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
        const {layerConfigs, updateLayer} = designerStore;
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
        const {layerConfigs, updateLayer} = designerStore;
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

    public doLayerToTop(): void {
        const prev: IUpdLayerOperateData[] = [];
        const next: IUpdLayerOperateData[] = [];
        const {layerConfigs, updateLayer} = designerStore;
        let {targetIds} = eventOperateStore;

        //收集相关的图层id
        const relatedLayerIds: Set<string> = new Set();
        relatedLayerIds.add(designerStore.layerHeader!)
        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            relatedLayerIds.add(id);
            if (layer.next)
                relatedLayerIds.add(layer.next);
            if (layer.prev)
                relatedLayerIds.add(layer.prev);
        });

        //记录上一个状态
        prev.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            prev.push({id, prev: layer.prev, next: layer.next})
        });

        for (let i = 0; i < targetIds.length; i++) {
            const id = targetIds[i];
            if (id === designerStore.layerHeader)
                continue;
            const tempNext: IUpdLayerOperateData[] = [];
            const oldLayer = layerConfigs[id];
            const oldPrev = layerConfigs[oldLayer.prev!];
            const oldNext = layerConfigs[oldLayer.next!];

            //调整双向链表数据指针，将图层移动到最顶层
            oldPrev && tempNext.push({id: oldPrev.id!, next: oldNext?.id})
            oldNext && tempNext.push({id: oldNext.id!, prev: oldPrev?.id})
            oldLayer && tempNext.push({id: oldLayer.id!, prev: undefined, next: designerStore.layerHeader})
            oldLayer && tempNext.push({id: designerStore.layerHeader, prev: oldLayer?.id})
            designerStore.layerHeader = oldLayer.id;
            if (id === designerStore.layerTail)
                designerStore.layerTail = oldLayer.prev;
            updateLayer(tempNext);
            next.push(...tempNext);
        }

        next.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        historyOperator.put({actions: [{type: OperateType.UPDATE_LAYER, prev, next}]});
    }

    public doLayerToBottom(): void {
        const prev: IUpdLayerOperateData[] = [];
        const next: IUpdLayerOperateData[] = [];
        const {layerConfigs, updateLayer} = designerStore;
        let {targetIds} = eventOperateStore;

        //收集相关的图层id
        const relatedLayerIds: Set<string> = new Set();
        relatedLayerIds.add(designerStore.layerTail!)
        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            relatedLayerIds.add(id);
            if (layer.next)
                relatedLayerIds.add(layer.next);
            if (layer.prev)
                relatedLayerIds.add(layer.prev);
        });

        //记录上一个状态
        prev.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            prev.push({id, prev: layer.prev, next: layer.next})
        });

        for (let i = 0; i < targetIds.length; i++) {
            const id = targetIds[i];
            if (id === designerStore.layerTail)
                continue;
            const tempNext: IUpdLayerOperateData[] = [];
            const oldLayer = layerConfigs[id];
            const oldPrev = layerConfigs[oldLayer.prev!];
            const oldNext = layerConfigs[oldLayer.next!];

            //调整双向链表数据指针，将图层移动到最顶层
            oldPrev && tempNext.push({id: oldPrev.id!, next: oldNext?.id})
            oldNext && tempNext.push({id: oldNext.id!, prev: oldPrev?.id})
            oldLayer && tempNext.push({id: oldLayer.id!, prev: designerStore.layerTail, next: undefined})
            oldLayer && tempNext.push({id: designerStore.layerTail, next: oldLayer?.id})
            designerStore.layerTail = oldLayer.id;
            if (id === designerStore.layerHeader)
                designerStore.layerHeader = oldLayer.next;
            updateLayer(tempNext);
            next.push(...tempNext);
        }

        next.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        historyOperator.put({actions: [{type: OperateType.UPDATE_LAYER, prev, next}]});
    }

    public doLayerMoveUp(): void {
        const prev: IUpdLayerOperateData[] = [];
        const next: IUpdLayerOperateData[] = [];
        const {layerConfigs, updateLayer} = designerStore;
        let {targetIds} = eventOperateStore;

        if (targetIds.length === 0)
            return;

        //收集相关的图层id
        const relatedLayerIds: Set<string> = new Set();
        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            const prevLayer = layerConfigs[layer.prev!];
            relatedLayerIds.add(id);
            if (layer.next)
                relatedLayerIds.add(layer.next);
            if (layer.prev)
                relatedLayerIds.add(layer.prev);
            if (prevLayer.prev)
                relatedLayerIds.add(prevLayer.prev!);
        });

        //记录上一个状态
        prev.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            prev.push({id, prev: layer.prev, next: layer.next})
        });

        for (let i = 0; i < targetIds.length; i++) {
            const id = targetIds[i];
            if (id === designerStore.layerHeader)
                continue;
            const tempNext: IUpdLayerOperateData[] = [];
            const oldLayer = layerConfigs[id];
            const oldPrev = layerConfigs[oldLayer.prev!];
            const oldPrevPrev = layerConfigs[oldPrev.prev!];
            const oldNext = layerConfigs[oldLayer.next!];

            //调整双向链表数据指针，将图层移动到上一层
            oldLayer && tempNext.push({id: oldLayer.id!, prev: oldPrevPrev?.id, next: oldPrev?.id})
            oldPrev && tempNext.push({id: oldPrev.id!, prev: oldLayer?.id, next: oldNext?.id})
            oldNext && tempNext.push({id: oldNext.id!, prev: oldPrev?.id})
            oldPrevPrev && tempNext.push({id: oldPrevPrev.id!, next: oldLayer?.id})
            if (designerStore.layerHeader === oldPrev.id)
                designerStore.layerHeader = oldLayer.id;
            if (id === designerStore.layerTail)
                designerStore.layerTail = oldLayer.prev;
            updateLayer(tempNext);
            next.push(...tempNext);
        }
        next.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        historyOperator.put({actions: [{type: OperateType.UPDATE_LAYER, prev, next}]});
    }

    public doLayerMoveDown(): void {
        const prev: IUpdLayerOperateData[] = [];
        const next: IUpdLayerOperateData[] = [];
        const {layerConfigs, updateLayer} = designerStore;
        let {targetIds} = eventOperateStore;

        if (targetIds.length === 0)
            return;

        //收集相关的图层id
        const relatedLayerIds: Set<string> = new Set();
        targetIds.forEach((id) => {
            const layer = layerConfigs[id];
            const nextLayer = layerConfigs[layer.next!];
            relatedLayerIds.add(id);
            if (layer.prev)
                relatedLayerIds.add(layer.prev);
            if (layer.next)
                relatedLayerIds.add(layer.next);
            if (nextLayer.next)
                relatedLayerIds.add(nextLayer.next!);
        });

        //记录上一个状态
        prev.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        relatedLayerIds.forEach((id) => {
            const layer = layerConfigs[id];
            prev.push({id, prev: layer.prev, next: layer.next})
        });

        for (let i = 0; i < targetIds.length; i++) {
            const id = targetIds[i];
            if (id === designerStore.layerTail)
                continue;
            const tempNext: IUpdLayerOperateData[] = [];
            const oldLayer = layerConfigs[id];
            const oldPrev = layerConfigs[oldLayer.prev!];
            const oldNext = layerConfigs[oldLayer.next!];
            const oldNextNext = layerConfigs[oldNext.next!];

            //调整双向链表数据指针，将图层移动到上一层
            oldLayer && tempNext.push({id: oldLayer.id!, next: oldNextNext?.id, prev: oldNext?.id})
            oldPrev && tempNext.push({id: oldPrev.id!, next: oldNext?.id})
            oldNext && tempNext.push({id: oldNext.id!, prev: oldPrev?.id, next: oldLayer?.id})
            oldNextNext && tempNext.push({id: oldNextNext.id!, prev: oldLayer?.id})
            if (designerStore.layerTail === oldNext.id)
                designerStore.layerTail = oldLayer.id;
            if (id === designerStore.layerHeader)
                designerStore.layerHeader = oldLayer.next;
            updateLayer(tempNext);
            next.push(...tempNext);
        }
        next.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail})
        historyOperator.put({actions: [{type: OperateType.UPDATE_LAYER, prev, next}]});
        console.log('doLayerMoveDown', toJS(designerStore.layerConfigs), designerStore.layerHeader, designerStore.layerTail)
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
        const childIds = LayerUtil.findTopGroupLayer(targetIds, true);
        //构建新的分组数据
        const {updateLayer, layerConfigs, addItem} = designerStore;
        const pid = IdGenerate.generateId();
        //计算新分组的锁定状态
        let allLock = layerConfigs[childIds[0]].lock;
        for (let i = 1; i < childIds.length; i++) {
            if (allLock !== layerConfigs[childIds[i]].lock) {
                allLock = false;
                break;
            }
        }
        //构建新的分组数据
        const groupItem: ILayerItem = {
            id: pid,
            type: 'group',
            name: '新建分组',
            hide: false,
            lock: allLock,
            childIds,
        };

        //构建操作记录
        const updPrev: IUpdLayerOperateData[] = [];
        const updNext: IUpdLayerOperateData[] = [];
        const addNext: IAddOperateData[] = [];

        /**
         * 记录操作前状态
         * 分组前状态设计当前链表的头指针、尾指针、被选中图层的prev、next指针、pid指针
         *
         * 修改图层数据
         *
         * 记录操作后状态
         */
        const headerLayer = layerConfigs[designerStore.layerHeader!];
        updPrev.push({layerHeader: designerStore.layerHeader});
        updPrev.push({id: headerLayer.id, prev: undefined, next: headerLayer.next});
        childIds.forEach((id: string) => {
            updPrev.push({id, pid: undefined});
            updNext.push({id, pid});
        });
        addNext.push({id: pid, layerConfig: groupItem});
        updNext.push({id: headerLayer.id, prev: pid});
        updNext.push({id: pid, prev: undefined, next: headerLayer.id});
        addItem(groupItem);
        updateLayer(updNext, false);
        designerStore.layerHeader = pid;
        updNext.push({layerHeader: pid});
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
                (layerInstances[pid] as Component).setState({lock: true});
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
        const {layerConfigs, updateLayer, delLayout} = designerStore;
        groupIds = groupIds.filter((id: string) => layerConfigs[id].type === 'group');
        //对每个分组图层进行解组
        const updPrev: IUpdLayerOperateData[] = [];
        const updNext: IUpdLayerOperateData[] = [];
        const delPrev: IDelOperateData[] = [];

        updPrev.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail});

        groupIds.forEach((groupId: string) => {
            const layer = layerConfigs[groupId];
            const prevLayer = layerConfigs[layer.prev!];
            const nextLayer = layerConfigs[layer.next!];

            prevLayer && updPrev.push({id: prevLayer.id, next: layer.next});
            nextLayer && updPrev.push({id: nextLayer.id, prev: layer.prev});
            delPrev.push({id: groupId, layerConfig: layer});
            layer.childIds && layer.childIds.forEach((childId: string) => {
                updPrev.push({id: childId, pid: groupId});
                updNext.push({id: childId, pid: undefined});
            });
            prevLayer && updNext.push({id: prevLayer.id, next: layer.next});
            nextLayer && updNext.push({id: nextLayer.id, prev: layer.prev});
            updateLayer(updNext, false);
            if (groupId === designerStore.layerHeader)
                designerStore.layerHeader = layer.next;
            if (groupId === designerStore.layerTail)
                designerStore.layerTail = layer.prev;
        });
        //删除分组图层
        delLayout(groupIds);
        updNext.push({layerHeader: designerStore.layerHeader, layerTail: designerStore.layerTail});
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
        const {targetIds} = eventOperateStore;
        if (!targetIds || targetIds.length === 0)
            return;
        //若存在分组图层，先过滤掉分组图层下的所有子图层
        const {layerConfigs, updateLayer} = designerStore;
        const groupLayerIds = targetIds.filter(id => layerConfigs[id].type === 'group');
        const toBeRemoveChildIds = LayerUtil.findAllChildLayer(groupLayerIds, false);
        //过滤掉分组图层下的所有子图层
        const finalTargetIds = targetIds.filter(id => !toBeRemoveChildIds.includes(id));
        if (finalTargetIds.length === 0) return;


        //构建历史操作记录
        const actions: IHistoryRecord[] = [];
        const prev: IUpdLayerOperateData[] = [];
        const next: IUpdLayerOperateData[] = [];

        /**
         * 从分组中移除理论上分为如下场景：
         * 1. 单个普通图层移出
         * 2. 单个分组图层移出
         * 3. 多个普通图层移出
         * 4. 多个分组图层移出
         * 5. 多个普通图层和分组图层同时移出
         *
         * 以上5种情况，均可以使用如下代码进行操作
         */
        finalTargetIds.forEach(id => {
            const pid = layerConfigs[id].pid;
            if (pid === undefined || pid === '')
                return;
            const childIds = layerConfigs[pid!].childIds;
            prev.push(...[{id: pid!, childIds: [...childIds!]}, {id, pid}]);
            const finalChildIds = childIds?.filter(_id => _id !== id);
            next.push(...[{id: pid!, childIds: finalChildIds}, {id, pid: undefined}]);
        });
        updateLayer(next);
        //记录操作日志
        actions.push({type: OperateType.UPDATE_LAYER, prev, next});
        historyOperator.put({actions});
    }

}

const historyRecordOperateProxy = new HistoryRecordOperateProxy();
export default historyRecordOperateProxy;



