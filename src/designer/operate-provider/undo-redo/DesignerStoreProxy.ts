import designerStore, {DesignerStore} from "../../store/DesignerStore";
import {MovableItemType} from "../../../lib/lc-movable/types";
import {DragDataType, HistoryType, ResizeDataType} from "./HistoryType";
import {historyOperator} from "./HistoryOperator";
import eventOperateStore from "../EventOperateStore";

class DesignerStoreProxy {

    private target: DesignerStore = designerStore;

    public doDrag(items: MovableItemType[]): void {
        this.target.updateLayout(items, false);
        //构建历史记录数据
        let data: DragDataType | null = null;
        let ids: string[] = [];
        if (items.length === 1) {
            //单个元素拖拽
            const item = items[0];
            data = {
                ids: [item.id!],
                x: item.position![0],
                y: item.position![1]
            }
        } else {
            //多个元素拖拽
            items.forEach((item) => ids.push(item.id!));
            const {groupCoordinate} = eventOperateStore;
            data = {
                ids: ids,
                x: groupCoordinate.minX!,
                y: groupCoordinate.minY!
            }
        }
        historyOperator.put({type: HistoryType.DRAG, data});
    };

    public doResize(items: MovableItemType[], direction: [number, number]): void {
        this.target.updateLayout(items, false);

        //构建历史记录数据
        let data: ResizeDataType | null = null;
        if (items.length === 1) {
            //单个元素缩放
            data = {
                ids: [items[0].id!],
                width: items[0].width!,
                height: items[0].height!,
                direction: direction
            }
        } else {
            //多个元素缩放
            let ids: string[] = [];
            items.forEach((item) => ids.push(item.id!));
            const {groupCoordinate} = eventOperateStore;
            data = {
                ids: ids,
                width: groupCoordinate.groupWidth!,
                height: groupCoordinate.groupHeight!,
                direction: direction
            }
        }

        historyOperator.put({type: HistoryType.RESIZE, data});
    }
}

const designerStoreProxy = new DesignerStoreProxy();
export default designerStoreProxy;



