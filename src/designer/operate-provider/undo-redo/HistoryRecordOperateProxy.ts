import designerStore from "../../store/DesignerStore";
import {
    IAddOperateData,
    IDelOperateData,
    IDragOperateData,
    IHideOperateData,
    IHistoryRecord,
    ILockOperateData,
    IOrderOperateData,
    IResizeOperateData,
    IUpdStyleOperateData,
    OperateType
} from "./OperateType";
import {historyOperator} from "./HistoryOperator";
import eventOperateStore from "../EventOperateStore";
import {AbstractDefinition} from "../../../framework/core/AbstractDefinition";
import {toJS} from "mobx";
import rightStore from "../../right/RightStore";
import {cloneDeep} from "lodash";
import layerListStore from "../../float-configs/layer-list/LayerListStore";
import {ConfigureObjectFragments} from "../../../utils/ObjectUtil";
import DesignerLoaderFactory from "../../loader/DesignerLoaderFactory";
import IdGenerate from "../../../utils/IdGenerate";
import {Component} from "react";
import LayerUtil from "../../float-configs/layer-list/util/LayerUtil";
import {ILayerItem} from "../../DesignerType";

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
    };

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

    public doAdd(container: HTMLDivElement | null, layout: ILayerItem): void {
        const {elemConfigs, compController} = designerStore;
        let componentDefine: AbstractDefinition = DesignerLoaderFactory.getLoader().definitionMap[layout!.type + ''];
        if (componentDefine) {
            const AbsCompImpl = componentDefine.getComponent();
            if (AbsCompImpl) {
                let config;
                if (layout.id! in compController!) {
                    //重新编组后，被编组组件会重新渲染，需从之前的实例中获取原有数据
                    config = compController![layout.id!].getConfig();
                } else if (layout.id! in elemConfigs!) {
                    config = elemConfigs![layout.id!];
                } else {
                    config = componentDefine.getInitConfig();
                    config.base.id = layout.id!;
                }
                new AbsCompImpl()!.create(container!, config).then((instance: any) => {
                    const {compController} = designerStore;
                    compController[layout.id + ''] = instance;
                });
                //如果addRecordCompId存在，说明是手动（拖拽、双击）新增组件，该组件的数据需要存储到历史记录中
                const {addRecordCompId, setAddRecordCompId} = eventOperateStore;
                if (addRecordCompId && addRecordCompId === layout.id) {
                    const data: IHistoryRecord = {
                        type: OperateType.ADD,
                        prev: null,
                        next: [{
                            id: layout.id, data: {
                                layerConfig: toJS(layout),
                                elemConfig: null
                            }
                        }]
                    }
                    historyOperator.put({actions: [data]});
                    setAddRecordCompId(null);
                }
            }
        }
    }

    public doDelete(): void {
        let {targetIds, setTargetIds} = eventOperateStore;
        const {delItem, layerConfigs, compController, updateLayer} = designerStore;
        if (!targetIds || targetIds.length === 0) return;
        const {setContentVisible, activeConfig, activeElem} = rightStore;
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

        const prev: IDelOperateData[] = [];
        //可直接删除的数据--构建操作记录
        directDelIds.forEach((id) => {
            const {type} = layerConfigs[id];
            if (type === 'group') {
                prev.push({id, data: {layerConfig: toJS(layerConfigs[id])}})
            } else {
                const elemConfig = compController[id] && compController[id].getConfig();
                prev.push({id, data: {layerConfig: toJS(layerConfigs[id]), elemConfig: elemConfig}})
            }
        })
        //需要维护图层关系的数据--构建操作记录
        const updPrev: ILayerItem[] = [];
        const updNext: ILayerItem[] = [];
        maintenanceDelIds.forEach((id) => {
                const {pid} = layerConfigs[id];
                const groupLayer = layerConfigs[pid!];
                if (groupLayer.childIds!.length === 1 && groupLayer.childIds![0] === id) {
                    //说明该分组下只有一个图层，且本次需要删除。这种场景下，将分组图层一起删除
                    prev.push({id: pid!, data: {layerConfig: toJS(layerConfigs[pid!])}});
                    targetIds = [...targetIds, pid!];
                } else {
                    //否则，只需要更新分组图层的childIds字段即可
                    updPrev.push({id: pid!, childIds: toJS(groupLayer.childIds!)});
                    //删除分组图层中的目标子图层
                    const oldChildIds = cloneDeep(groupLayer.childIds)
                    const newChildIds = oldChildIds!.filter((cid) => cid !== id);
                    updateLayer([{id: pid!, childIds: newChildIds}], false)
                    updNext.push({id: pid!, childIds: toJS(groupLayer.childIds!)});
                }
                //构建子图层的操作记录
                const elemConfig = compController[id] && compController[id].getConfig();
                prev.push({id, data: {layerConfig: toJS(layerConfigs[id]), elemConfig: elemConfig}});
            }
        );

        const actions: IHistoryRecord[] = [{type: OperateType.DEL, prev, next: null}];
        if (updPrev.length > 0 || updNext.length > 0)
            actions.push({type: OperateType.UPD_LAYER_GROUP, prev: updPrev, next: updNext});

        historyOperator.put({actions});

        //删除组件
        targetIds.length > 0 && delItem(targetIds);
        setTargetIds([]);
        const {focusDesignerCanvas} = eventOperateStore;
        //删除组件后，重新聚焦鼠标指针到容器上，避免鼠标失去焦点导致其他快捷键失效。
        focusDesignerCanvas();
    }

    private _copyLayer = (oldLayer: ILayerItem, newIds: string[], newLayers: ILayerItem[], maxLevel: number): ILayerItem => {
        const {layerConfigs, compController, elemConfigs} = designerStore;
        const newLayer = cloneDeep(oldLayer);
        newLayer.id = IdGenerate.generateId();
        newLayer.order = maxLevel;
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
            let newConfig = cloneDeep(oldCompController.getConfig());
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
        let newIds: string[] = [];
        const {layerConfigs, elemConfigs} = designerStore;
        let {maxLevel, setMaxLevel} = eventOperateStore;
        //next用于保存操作记录的下一个状态
        const next: IAddOperateData[] = [];
        const newLayouts: ILayerItem[] = [];
        const layerIdMapOldToNew: Record<string, string> = {};

        ids.forEach((oldLayerId) => {
            const oldLayer = layerConfigs[oldLayerId];
            if (!oldLayer) return;
            const newLayer = this._copyLayer(oldLayer, newIds, newLayouts, maxLevel);
            layerIdMapOldToNew[oldLayerId] = newLayer.id!;
            maxLevel++;
        });

        //根据oldLayer推断每个一被复制图层后的新图层的层级关系
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
                    const newChildIds = oldLayer.childIds!.map((childId) => layerIdMapOldToNew[childId]);
                    newLayer.childIds = newChildIds;
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
            if (newLayout.type === 'group') {
                next.push({
                    id: id,
                    data: {
                        layerConfig: toJS(newLayout),
                    }
                })
            } else {
                next.push({
                    id: id,
                    data: {
                        layerConfig: toJS(newLayout),
                        elemConfig: toJS(newConfig)
                    }
                })
            }
        })

        historyOperator.put({actions: [{type: OperateType.ADD, prev: null, next}]})
        setMaxLevel(maxLevel);
        //多个组件同时复制时，需要计算多选框的新位置
        if (newLayouts.length > 1) {
            const {groupCoordinate, setGroupCoordinate} = eventOperateStore;
            setGroupCoordinate({minX: groupCoordinate.minX! + 10, minY: groupCoordinate.minY! + 10})
        }
        return newIds;
    };

    public doHideUpd(items: ILayerItem[]): void {
        let prev: IHideOperateData[] = [];
        let next: IHideOperateData[] = [];
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
        const {layerInstances, visible} = layerListStore;
        if (visible) {
            //更新图层列表
            items.forEach((item) => {
                (layerInstances[item.id!] as Component)?.setState({hide: item.hide, selected: false})
            })
        }
    }

    public doLockUpd(items: ILayerItem[]): void {
        let prev: ILockOperateData[] = [];
        let next: ILockOperateData[] = [];
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
        const {layerInstances, visible} = layerListStore;
        if (visible) {
            //更新图层列表
            items.forEach((item) => {
                (layerInstances[item.id!] as Component)?.setState({lock: item.lock})
            })
        }
    }

    public doOrderUpd(items: ILayerItem[]): void {
        let prev: IOrderOperateData[] = [];
        let next: IOrderOperateData[] = [];
        const {layerConfigs, updateLayer} = designerStore;
        items.forEach((item) => {
            const {id, order} = item;
            next.push({id: id!, order: order!});
            const oldOrderData = layerConfigs[id!];
            prev.push({id: id!, order: oldOrderData.order!});
        })
        const data: IHistoryRecord = {type: OperateType.ORDER, prev, next}
        historyOperator.put({actions: [data]});
        updateLayer(items);
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
        const {targetIds, maxLevel, setMaxLevel, setTargetIds} = eventOperateStore;
        if (!targetIds || targetIds.length <= 1) return;
        if (LayerUtil.hasSameGroup(targetIds)) return;
        //查找当前选中的图层的所有父级图层
        const layerIdSet = LayerUtil.findTopGroupLayer(targetIds, true);
        //新建编组
        const {addItem, updateLayer, layerConfigs} = designerStore;
        const order = maxLevel + 1;
        const pid = IdGenerate.generateId();
        const childIds = Array.from(layerIdSet);
        //计算分组的锁定状态
        let allLock = layerConfigs[childIds[0]].lock;
        for (let i = 1; i < childIds.length; i++) {
            if (allLock !== layerConfigs[childIds[i]].lock) {
                allLock = false;
                break;
            }
        }

        //构建操作记录
        const actions: IHistoryRecord[] = [];

        //构建分组数据
        const groupItem: ILayerItem = {
            id: pid,
            type: 'group',
            name: '新建分组',
            hide: false,
            lock: allLock,
            childIds,
            order,
        };

        //操作记录-新增分组图层
        actions.push({type: OperateType.ADD, prev: null, next: [{id: pid, data: {layerConfig: groupItem}}]});

        //操作记录-更新子图层的pid
        const childPrev: ILayerItem[] = [];
        const childNext: ILayerItem[] = [];

        //设置子图层的pid
        const updateItems: ILayerItem[] = [];
        childIds.forEach((id: string) => {
            childPrev.push({id, pid: undefined});
            updateItems.push({id, pid});
            childNext.push({id, pid});
        });
        updateLayer(updateItems, false);
        //添加分组并渲染
        addItem(groupItem);
        setMaxLevel(order);
        setTargetIds([]);
        actions.push({type: OperateType.UPD_LAYER_GROUP, prev: childPrev, next: childNext});
        historyOperator.put({actions});
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
        //找出当前选中的图层中，最顶层的分组图层
        let groupIds = LayerUtil.findTopGroupLayer(targetIds, true);
        //过滤掉其中分组等于自身的图层（即非分组图层）
        const {layerConfigs, updateLayer, delLayout} = designerStore;
        groupIds = groupIds.filter((id: string) => layerConfigs[id].type === 'group');
        //对每个分组图层进行解组
        const actions: IHistoryRecord[] = [];
        const childPrev: ILayerItem[] = [];
        const childNext: ILayerItem[] = [];
        const groupPrev: IDelOperateData[] = [];
        groupIds.forEach((groupId: string) => {
            let item = layerConfigs[groupId];
            //记录被删除的分组图层
            groupPrev.push({id: groupId, data: {layerConfig: item}});
            let childIds = item.childIds;
            const updateItems: ILayerItem[] = [];
            childIds && childIds.forEach((childId: string) => {
                childPrev.push({id: childId, pid: groupId});
                //更新每个分组图层的子图层的pid为null
                updateItems.push({id: childId, pid: undefined});
                childNext.push({id: childId, pid: undefined});
            });
            updateLayer(updateItems, false);
            groupPrev.push({id: groupId, data: {layerConfig: item}});
        });
        actions.push({type: OperateType.UPD_LAYER_GROUP, prev: childPrev, next: childNext});
        //操作记录--被删除的分组图层
        actions.push({type: OperateType.DEL, prev: groupPrev, next: null});
        //执行操作记录入队
        historyOperator.put({actions});
        //2.删除分组图层
        delLayout(groupIds);
        //清空组件选中状态
        setTargetIds([]);
        //处理右侧设置项，如果为当前选中的分组图层，则卸载该设置项（因为分组图层已经被删除）
        const {activeElem, activeConfig, setContentVisible} = rightStore;
        if (activeElem && groupIds.includes(activeElem.id!)) {
            setContentVisible(false);
            activeConfig(null, "");
        }
    }

}

const historyRecordOperateProxy = new HistoryRecordOperateProxy();
export default historyRecordOperateProxy;



