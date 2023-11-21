import designerStore from "../../store/DesignerStore";
import {MovableItemType} from "../movable/types";
import {
    AddDataType,
    DelDataType,
    DragDataType,
    HideDataType,
    HistoryRecordType,
    HistoryType,
    LockDataType,
    OrderDataType,
    ResizeDataType,
    StyleDataType
} from "./HistoryType";
import {historyOperator} from "./HistoryOperator";
import eventOperateStore from "../EventOperateStore";
import {AbstractComponentDefinition} from "../../../framework/core/AbstractComponentDefinition";
import {toJS} from "mobx";
import rightStore from "../../right/RightStore";
import {cloneDeep} from "lodash";
import layerListStore from "../../float-configs/layer-list/LayerListStore";
import {ConfigureObjectFragments} from "../../../utils/ObjectUtil";
import DesignerLoaderFactory from "../../loader/DesignerLoaderFactory";
import IdGenerate from "../../../utils/IdGenerate";
import {Component} from "react";
import LayerUtil from "../../float-configs/layer-list/util/LayerUtil";

class HistoryRecordOperateProxy {

    public doDrag(items: MovableItemType[]): void {
        //构建历史记录数据
        const {layoutConfigs, updateLayout} = designerStore;
        const ids: string[] = [];
        let prev: DragDataType | null;
        let next: DragDataType | null;
        if (items.length === 1) { //单个组件拖动
            //构建prev数据
            const [x, y] = layoutConfigs[items[0].id!].position as [number, number];
            prev = {ids: [items[0].id!], x, y}
            //构建next数据
            const {id, position} = items[0];
            next = {ids: [id!], x: position![0], y: position![1]}
        } else { //多个组件拖动
            //构建prev数据
            const oldItems: MovableItemType[] = [];
            items.forEach((item) => ids.push(item.id!));
            ids.forEach((id) => oldItems.push(layoutConfigs[id]))
            let x = +Infinity, y = +Infinity;
            oldItems.forEach((oldItem) => {
                const {position} = oldItem;
                if (position![0] < x) x = position![0];
                if (position![1] < y) y = position![1];
            });
            prev = {ids, x, y};

            //构建next数据
            const {groupCoordinate} = eventOperateStore;
            next = {ids, x: groupCoordinate.minX!, y: groupCoordinate.minY!}
        }
        //构建历史记录节点
        const data: HistoryRecordType = {
            type: HistoryType.DRAG,
            prev: prev!,
            next: next!
        }
        //更新布局数据
        updateLayout(items, false);
        //历史记录入队
        historyOperator.put({actions: [data]});
    };

    public doResize(items: MovableItemType[], direction: [number, number]): void {
        //构建历史记录数据
        const {layoutConfigs, updateLayout} = designerStore;
        const ids: string[] = [];
        let prev: ResizeDataType | null;
        let next: ResizeDataType | null;
        if (items.length === 1) { //单个组件缩放
            //构建prev数据
            const {width = 0, height = 0} = layoutConfigs[items[0].id!];
            prev = {ids: [items[0].id!], width, height, direction}
            //构建next数据
            const {id} = items[0];
            next = {ids: [id!], width: items[0].width!, height: items[0].height!, direction}
        } else { //多个组件缩放
            //构建prev数据
            const oldItems: MovableItemType[] = [];
            items.forEach((item) => ids.push(item.id!));
            ids.forEach((id) => oldItems.push(layoutConfigs[id]))
            let minX = +Infinity, minY = +Infinity, maxX = -Infinity, maxY = -Infinity;
            oldItems.forEach((oldItem) => {
                const {position} = oldItem;
                if (position![0] < minX) minX = position![0];
                if (position![1] < minY) minY = position![1];
                if (position![0] + oldItem.width! > maxX) maxX = position![0] + oldItem.width!;
                if (position![1] + oldItem.height! > maxY) maxY = position![1] + oldItem.height!;
            });
            const width = maxX - minX;
            const height = maxY - minY;
            prev = {ids, width, height, direction};

            //构建next数据
            const {groupCoordinate} = eventOperateStore;
            next = {ids, width: groupCoordinate.groupWidth!, height: groupCoordinate.groupHeight!, direction}
        }
        //构建历史记录节点
        const data: HistoryRecordType = {type: HistoryType.RESIZE, prev: prev!, next: next!}
        //更新布局数据
        updateLayout(items, false);
        //历史记录入队
        historyOperator.put({actions: [data]});
    }

    public doAdd(container: HTMLDivElement | null, layout: MovableItemType): void {
        const {elemConfigs} = designerStore;
        let componentDefine: AbstractComponentDefinition = DesignerLoaderFactory.getLoader().customComponentInfoMap[layout!.type + ''];
        if (componentDefine) {
            const AbsCompImpl = componentDefine.getComponent();
            if (AbsCompImpl) {
                const config = layout.id! in elemConfigs! ? elemConfigs![layout.id!] : (function () {
                    let initConfig = componentDefine.getInitConfig();
                    initConfig.info.id = layout.id!;
                    return initConfig;
                })() as any;
                new AbsCompImpl()!.create(container!, config).then((instance: any) => {
                    const {compInstances} = designerStore;
                    compInstances[layout.id + ''] = instance;
                });
                //如果addRecordCompId存在，说明是新增组件，该组件的数据需要存储到历史记录中
                const {addRecordCompId} = eventOperateStore;
                if (addRecordCompId && addRecordCompId === layout.id) {
                    const data: HistoryRecordType = {
                        type: HistoryType.ADD,
                        prev: null,
                        next: [{
                            id: layout.id, data: {
                                layoutConfig: toJS(layout),
                                elemConfig: null
                            }
                        }]
                    }
                    historyOperator.put({actions: [data]});
                }
            }
        }
    }

    public doDelete(): void {
        let {targetIds, setTargetIds} = eventOperateStore;
        const {delItem, layoutConfigs, compInstances, updateLayout} = designerStore;
        if (!targetIds || targetIds.length === 0) return;
        const {setContentVisible, activeConfig} = rightStore;
        setContentVisible(false);
        activeConfig(null, "");

        //对被删除元素分类：1. 完全独立的组件（没有分组）2.分组的子组件（选中了分组中的子组件，但没有选中分组）3.分组图层（包括分组图层和其下所有子图层）
        //可删除数据分为：1. 可以直接删除的数据。 2. 删除后需要维护图层关系的数据
        const directDelIds: string[] = [];
        const maintenanceDelIds: string[] = [];
        targetIds.forEach((id) => {
            const layer = layoutConfigs[id];
            if (layer) {
                const {type, pid} = layer;
                if (type !== 'group' && pid && !targetIds.includes(pid))
                    maintenanceDelIds.push(id);
                else
                    directDelIds.push(id);
            }
        });

        const prev: DelDataType[] = [];
        //可直接删除的数据--构建操作记录
        directDelIds.forEach((id) => {
            const {type} = layoutConfigs[id];
            if (type === 'group') {
                prev.push({id, data: {layoutConfig: toJS(layoutConfigs[id])}})
            } else {
                const elemConfig = compInstances[id] && compInstances[id].getConfig();
                prev.push({id, data: {layoutConfig: toJS(layoutConfigs[id]), elemConfig: elemConfig}})
            }
        })
        //需要维护图层关系的数据--构建操作记录
        const updPrev: MovableItemType[] = [];
        const updNext: MovableItemType[] = [];
        maintenanceDelIds.forEach((id) => {
                const {pid} = layoutConfigs[id];
                const groupLayer = layoutConfigs[pid!];
                if (groupLayer.childIds!.length === 1 && groupLayer.childIds![0] === id) {
                    //说明该分组下只有一个图层，且本次需要删除。这种场景下，将分组图层一起删除
                    prev.push({id: pid!, data: {layoutConfig: toJS(layoutConfigs[pid!])}});
                    targetIds = [...targetIds, pid!];
                } else {
                    //否则，只需要更新分组图层的childIds字段即可
                    updPrev.push({id: pid!, childIds: toJS(groupLayer.childIds!)});
                    //删除分组图层中的目标子图层
                    const oldChildIds = cloneDeep(groupLayer.childIds)
                    const newChildIds = oldChildIds!.filter((cid) => cid !== id);
                    updateLayout([{id: pid!, childIds: newChildIds}], false)
                    updNext.push({id: pid!, childIds: toJS(groupLayer.childIds!)});
                }
                //构建子图层的操作记录
                const elemConfig = compInstances[id] && compInstances[id].getConfig();
                prev.push({id, data: {layoutConfig: toJS(layoutConfigs[id]), elemConfig: elemConfig}});
            }
        );

        const actions: HistoryRecordType[] = [{type: HistoryType.DEL, prev, next: null}];
        if (updPrev.length > 0 || updNext.length > 0)
            actions.push({type: HistoryType.UPD_LAYER_GROUP, prev: updPrev, next: updNext});

        historyOperator.put({actions});

        //删除组件
        targetIds.length > 0 && delItem(targetIds);
        setTargetIds([]);
        const {setPointerTarget} = eventOperateStore;
        const enforcementCap = document.querySelector('.lc-ruler-content');
        //删除组件后，重新聚焦鼠标指针到容器上，避免鼠标失去焦点导致其他快捷键失效。
        setPointerTarget && setPointerTarget(enforcementCap);
        console.log(toJS(designerStore.layoutConfigs))
    }

    private _copyGroupLayer = (layout: MovableItemType, newIds: string[], newLayouts: MovableItemType[], maxLevel: number): MovableItemType => {
        const {layoutConfigs} = designerStore;
        //生成新id
        const newId = IdGenerate.generateId();
        newIds.push(newId);
        //生成新布局
        const newLayout = cloneDeep(layout);
        newLayouts.push(newLayout);
        newLayout.id = newId;
        newLayout.order = maxLevel;
        newLayout.childIds = [];
        layoutConfigs[newId] = newLayout;
        return newLayout;
    }

    private _copyNormalLayer = (layout: MovableItemType, newLayouts: MovableItemType[], maxLevel: number, newIds: string[]): MovableItemType => {
        const {layoutConfigs, compInstances, elemConfigs} = designerStore;
        //生成新id
        const newId = IdGenerate.generateId();
        //生成新布局
        const newLayout = cloneDeep(layout);
        newLayouts.push(newLayout);
        newLayout.id = newId;
        const [x = 10, y = 10] = (newLayout.position || []).map((p) => p + 10);
        newLayout.position = [x, y];
        newLayout.order = maxLevel;
        layoutConfigs[newId] = newLayout;
        //生成新组件配置项数据
        const copiedInstance = compInstances[layout.id!];
        let newConfig = cloneDeep(copiedInstance.getConfig());
        newConfig.info.id = newId;
        elemConfigs![newId] = newConfig;
        newIds.push(newId);
        return newLayout;
    }

    /**
     * 被复制的图层可以同时包含普通图层、分组图层和分组图层的子图层。
     * 1.普通图层和没有包含分组图层的子图层，则直接复制。
     * 2.对于分组图层和其下的子图层，复制时需要创建复制前后的映射关系，复制完毕后根据映射关系恢复新图层之前的层级关系。
     * @param ids
     */
    public doCopy(ids: string[]): string[] {
        let newIds: string[] = [];
        const {layoutConfigs, elemConfigs} = designerStore;
        let {maxLevel, setMaxLevel} = eventOperateStore;
        //next用于保存操作记录的下一个状态
        const next: AddDataType[] = [];
        const newLayouts: MovableItemType[] = [];

        //区分图层类型， 普通图层和独立的子图层一类（可直接复制），分组图层及其下子图层一类（复制后重新建立关系）。
        const groupIds: string[] = [];
        const normalIds: string[] = [];
        ids.forEach((id) => {
            const {type, pid} = layoutConfigs[id];
            if ((type !== 'group' && !pid) || (pid && !ids.includes(pid)))
                normalIds.push(id);
            else
                groupIds.push(id);
        });

        //复制normalIds
        for (const id of normalIds) {
            //获取被复制元素布局
            const {[id]: layout} = layoutConfigs;
            if (layout) {
                maxLevel++;
                const newLayout = this._copyNormalLayer(layout, newLayouts, maxLevel, newIds);
                //如果本图层是属于单独选中的分组图层的子图层（有pid，但pid对应的图层未被选中），则需要将新复制出来的图层id加入到pid对应图层的childIds中
                if (newLayout.pid)
                    layoutConfigs[newLayout.pid].childIds!.push(newLayout.id!);
            }
        }

        /**
         * 复制分组图层及其下子图层
         */
        const groupIdOldToNew = new Map<string, string>(); //分组图层映射关系
        const childIdNewToOld = new Map<string, string>(); //子图层映射关系
        //复制分组图层下的子图层
        const onlyChildIds = groupIds.filter((id) => layoutConfigs[id].type !== 'group');
        for (const id of onlyChildIds) {
            //获取被复制元素布局
            const {[id]: layout} = layoutConfigs;
            if (layout) {
                maxLevel++;
                const newLayout = this._copyNormalLayer(layout, newLayouts, maxLevel, newIds);
                childIdNewToOld.set(newLayout.id!, id);
            }
        }

        //复制type=group的图层
        const onlyGroupIds = groupIds.filter((id) => layoutConfigs[id].type === 'group');
        for (const id of onlyGroupIds) {
            //获取被复制元素布局
            const {[id]: layout} = layoutConfigs;
            if (layout) {
                maxLevel++;
                const newLayout = this._copyGroupLayer(layout, newIds, newLayouts, maxLevel);
                groupIdOldToNew.set(id, newLayout.id!);
            }
        }

        //根据映射，重新建立分组图层和子图层的关系
        childIdNewToOld.forEach((oldId, newId) => {
            const newLayerItem = layoutConfigs[newId];
            //设置新子图层的pid
            newLayerItem.pid = groupIdOldToNew.get(layoutConfigs[oldId].pid!);
            //设置新分组图层的childIds
            layoutConfigs[newLayerItem.pid!].childIds!.push(newId);
        });


        //设置分组复制的操作记录信息
        newIds.forEach((id) => {
            const newLayout = layoutConfigs[id];
            const newConfig = elemConfigs![id];
            if (newLayout.type === 'group') {
                next.push({
                    id: id,
                    data: {
                        layoutConfig: toJS(newLayout),
                    }
                })
            } else {
                next.push({
                    id: id,
                    data: {
                        layoutConfig: toJS(newLayout),
                        elemConfig: toJS(newConfig)
                    }
                })
            }
        })

        historyOperator.put({actions: [{type: HistoryType.ADD, prev: null, next}]})
        setMaxLevel(maxLevel);
        //多个组件同时复制时，需要计算多选框的新位置
        if (newLayouts.length > 1) {
            const {groupCoordinate, setGroupCoordinate} = eventOperateStore;
            setGroupCoordinate({minX: groupCoordinate.minX! + 10, minY: groupCoordinate.minY! + 10})
        }
        return newIds;
    };

    public doHideUpd(items: MovableItemType[]): void {
        let prev: HideDataType[] = [];
        let next: HideDataType[] = [];
        const {layoutConfigs, updateLayout} = designerStore;
        items.forEach((item) => {
            const {id, hide} = item;
            next.push({id: id!, hide: hide!});
            const oldHideData = layoutConfigs[id!];
            prev.push({id: id!, hide: oldHideData.hide!});
        })
        const data: HistoryRecordType = {type: HistoryType.HIDE, prev, next}
        historyOperator.put({actions: [data]});
        //更新隐藏状态
        updateLayout(items);
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

    public doLockUpd(items: MovableItemType[]): void {
        let prev: LockDataType[] = [];
        let next: LockDataType[] = [];
        const {layoutConfigs, updateLayout} = designerStore;
        items.forEach((item) => {
            const {id, lock} = item;
            next.push({id: id!, lock: lock!});
            const oldLockData = layoutConfigs[id!];
            prev.push({id: id!, lock: oldLockData.lock!});
        })
        const data: HistoryRecordType = {type: HistoryType.LOCK, prev, next}
        historyOperator.put({actions: [data]});
        updateLayout(items);
        const {layerInstances, visible} = layerListStore;
        if (visible) {
            //更新图层列表
            items.forEach((item) => {
                (layerInstances[item.id!] as Component)?.setState({lock: item.lock})
            })
        }
    }

    public doOrderUpd(items: MovableItemType[]): void {
        let prev: OrderDataType[] = [];
        let next: OrderDataType[] = [];
        const {layoutConfigs, updateLayout} = designerStore;
        items.forEach((item) => {
            const {id, order} = item;
            next.push({id: id!, order: order!});
            const oldOrderData = layoutConfigs[id!];
            prev.push({id: id!, order: oldOrderData.order!});
        })
        const data: HistoryRecordType = {type: HistoryType.ORDER, prev, next}
        historyOperator.put({actions: [data]});
        updateLayout(items);
    }

    /**
     * 记录组件配置更新
     * @param newData
     * @param oldData
     */
    public doStyleUpd(newData: ConfigureObjectFragments, oldData: ConfigureObjectFragments): void {
        const {activeElem: {id}} = rightStore;
        const record: HistoryRecordType = {
            type: HistoryType.STYLE,
            prev: {id, data: oldData} as StyleDataType,
            next: {id, data: newData} as StyleDataType
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
        const {addItem, updateLayout, layoutConfigs} = designerStore;
        const order = maxLevel + 1;
        const pid = IdGenerate.generateId();
        const childIds = Array.from(layerIdSet);
        //计算分组的锁定状态
        let allLock = layoutConfigs[childIds[0]].lock;
        for (let i = 1; i < childIds.length; i++) {
            if (allLock !== layoutConfigs[childIds[i]].lock) {
                allLock = false;
                break;
            }
        }

        //构建操作记录
        const actions: HistoryRecordType[] = [];

        //构建分组数据
        const groupItem: MovableItemType = {
            id: pid,
            type: 'group',
            name: '新建分组',
            hide: false,
            lock: allLock,
            childIds,
            order,
        };

        //操作记录-新增分组图层
        actions.push({type: HistoryType.ADD, prev: null, next: [{id: pid, data: {layoutConfig: groupItem}}]});

        addItem(groupItem);
        setMaxLevel(order);

        //操作记录-更新子图层的pid
        const childPrev: MovableItemType[] = [];
        const childNext: MovableItemType[] = [];

        //设置子图层的pid
        const updateItems: MovableItemType[] = [];
        childIds.forEach((id: string) => {
            childPrev.push({id, pid: undefined});
            updateItems.push({id, pid});
            childNext.push({id, pid});
        });
        updateLayout(updateItems, false);
        setTargetIds([]);
        actions.push({type: HistoryType.UPD_LAYER_GROUP, prev: childPrev, next: childNext});
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
        const {layoutConfigs, updateLayout, delLayout} = designerStore;
        groupIds = groupIds.filter((id: string) => layoutConfigs[id].type === 'group');
        //对每个分组图层进行解组
        const actions: HistoryRecordType[] = [];
        const childPrev: MovableItemType[] = [];
        const childNext: MovableItemType[] = [];
        const groupPrev: DelDataType[] = [];
        groupIds.forEach((groupId: string) => {
            let item = layoutConfigs[groupId];
            //记录被删除的分组图层
            groupPrev.push(item);
            let childIds = item.childIds;
            const updateItems: MovableItemType[] = [];
            childIds && childIds.forEach((childId: string) => {
                childPrev.push({id: childId, pid: groupId});
                //更新每个分组图层的子图层的pid为null
                updateItems.push({id: childId, pid: undefined});
                childNext.push({id: childId, pid: undefined});
            });
            updateLayout(updateItems, false);
            groupPrev.push({id: groupId, data: {layoutConfig: item}});
        });
        actions.push({type: HistoryType.UPD_LAYER_GROUP, prev: childPrev, next: childNext});
        //操作记录--被删除的分组图层
        actions.push({type: HistoryType.DEL, prev: groupPrev, next: null});
        //执行操作记录入队
        historyOperator.put({actions});
        //2.删除分组图层
        delLayout(groupIds);
        setTargetIds([]);
    }
}

const historyRecordOperateProxy = new HistoryRecordOperateProxy();
export default historyRecordOperateProxy;



