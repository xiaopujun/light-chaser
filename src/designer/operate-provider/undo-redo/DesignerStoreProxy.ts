import designerStore, {DesignerStore} from "../../store/DesignerStore";
import {MovableItemType} from "../../../lib/lc-movable/types";
import {DragDataType, HistoryRecordType, HistoryType, ResizeDataType} from "./HistoryType";
import {historyOperator} from "./HistoryOperator";
import eventOperateStore from "../EventOperateStore";

class DesignerStoreProxy {

    private target: DesignerStore = designerStore;

    public doDrag(items: MovableItemType[]): void {
        //构建历史记录数据
        const {layoutConfigs} = designerStore;
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
        this.target.updateLayout(items, false);
        //历史记录入队
        historyOperator.put(data);
    };

    public doResize(items: MovableItemType[], direction: [number, number]): void {
        //构建历史记录数据
        const {layoutConfigs} = designerStore;
        const ids: string[] = [];
        let prev: ResizeDataType | null;
        let next: ResizeDataType | null;
        if (items.length === 1) { //单个组件缩放
            //构建prev数据
            const {width = 0, height = 0} = layoutConfigs[items[0].id!];
            prev = {ids: [items[0].id!], width, height, direction}
            //构建next数据
            const {id} = items[0];
            next = {ids: [id!], width, height, direction}
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
        this.target.updateLayout(items, false);
        //历史记录入队
        historyOperator.put(data);
    }
}

const designerStoreProxy = new DesignerStoreProxy();
export default designerStoreProxy;



