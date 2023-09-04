import designerStore from "../../store/DesignerStore";
import {MovableItemType} from "../../../lib/lc-movable/types";
import {
    AddDataType,
    DelDataType,
    DragDataType, HideDataType,
    HistoryRecordType,
    HistoryType, LockDataType, OrderDataType,
    ResizeDataType, StyleDataType
} from "./HistoryType";
import {historyOperator} from "./HistoryOperator";
import eventOperateStore from "../EventOperateStore";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import EditorDesignerLoader from "../../loader/EditorDesignerLoader";
import {toJS} from "mobx";
import rightStore from "../../right/RightStore";
import {idGenerate} from "../../../utils/IdGenerate";
import {cloneDeep} from "lodash";
import layerListStore from "../../float-configs/layer-list/LayerListStore";
import {ConfigureObjectFragments} from "../../../utils/ObjectUtil";

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
        historyOperator.put(data);
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
        historyOperator.put(data);
    }

    public doAdd(container: HTMLDivElement | null, layout: MovableItemType): void {
        const {elemConfigs} = designerStore;
        let componentDefine: AbstractCustomComponentDefinition = EditorDesignerLoader.getInstance().customComponentInfoMap[layout!.type + ''];
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
                    historyOperator.put(data);
                }
            }
        }
    }

    public doDelete(): void {
        const {targetIds, setTargets} = eventOperateStore;
        const {delItem, layoutConfigs, compInstances} = designerStore;
        if (!targetIds || targetIds.length === 0) return;
        const {setContentVisible, activeConfig} = rightStore;
        setContentVisible(false);
        activeConfig("80cc666f", "LcBg");

        //构建历史记录数据
        const prev: DelDataType[] = [];
        targetIds.forEach((id) => {
            const elemConfig = compInstances[id] && compInstances[id].getConfig();
            prev.push({id, data: {layoutConfig: toJS(layoutConfigs[id]), elemConfig: elemConfig}})
        })
        historyOperator.put({type: HistoryType.DEL, prev, next: null})

        //删除组件
        targetIds.length > 0 && delItem(targetIds);
        setTargets([])
    }

    public doCopy(ids: string[]): string[] {
        let newIds: string[] = [];
        const {layoutConfigs, elemConfigs, compInstances} = designerStore;
        let {maxLevel, setMaxLevel} = eventOperateStore;

        //历史记录
        const next: AddDataType[] = [];
        const newLayouts: MovableItemType[] = [];

        for (const id of ids) {
            //获取被复制元素布局
            const {[id]: layout} = layoutConfigs;
            if (layout) {
                //生成新id
                const newId = idGenerate.generateId();
                newIds.push(newId);
                //生成新布局
                const newLayout = cloneDeep(layout);
                newLayouts.push(newLayout);
                newLayout.id = newId;
                const [x = 10, y = 10] = (newLayout.position || []).map((p) => p + 10);
                newLayout.position = [x, y];
                newLayout.order = ++maxLevel;
                layoutConfigs[newId] = newLayout;
                //生成新数据
                const copiedInstance = compInstances[id];
                let newConfig = cloneDeep(copiedInstance.getConfig());
                newConfig.info.id = newId;
                elemConfigs![newId] = newConfig;

                next.push({
                    id: newId,
                    data: {
                        layoutConfig: toJS(newLayout),
                        elemConfig: toJS(newConfig)
                    }
                })
            }
        }
        historyOperator.put({type: HistoryType.ADD, prev: null, next})
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
        historyOperator.put(data);
        //更新隐藏状态
        updateLayout(items);
        const {layerInstanceMap, visible} = layerListStore;
        if (visible) {
            //更新图层列表
            items.forEach((item) => {
                layerInstanceMap[item.id!].update({hide: item.hide, selected: false})
            })
        }
    }

    public doLockUpd(items: MovableItemType[]): void {
        let prev: LockDataType[] = [];
        let next: LockDataType[] = [];
        const {layoutConfigs, updateLayout} = designerStore;
        items.forEach((item) => {
            const {id, locked} = item;
            next.push({id: id!, lock: locked!});
            const oldLockData = layoutConfigs[id!];
            prev.push({id: id!, lock: oldLockData.locked!});
        })
        const data: HistoryRecordType = {type: HistoryType.LOCK, prev, next}
        historyOperator.put(data);
        updateLayout(items);
        const {layerInstanceMap, visible} = layerListStore;
        if (visible) {
            //更新图层列表
            items.forEach((item) => {
                layerInstanceMap[item.id!].update({lock: item.locked})
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
        historyOperator.put(data);
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
        historyOperator.put(record);
    }
}

const historyRecordOperateProxy = new HistoryRecordOperateProxy();
export default historyRecordOperateProxy;



