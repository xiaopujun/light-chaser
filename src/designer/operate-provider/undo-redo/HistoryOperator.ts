import HistoryQueue from "./HistoryQueue";
import {DragDataType, HistoryRecordType, HistoryType, ResizeDataType, StyleDataType} from "./HistoryType";
import designerStore from "../../store/DesignerStore";

export interface HistoryStepType {
    /**
     * 当前记录
     */
    curr: HistoryRecordType | null;
    /**
     * 当前记录的前一个记录
     */
    prev: HistoryRecordType | null;
}

class HistoryOperator {
    private firstPut: boolean = true;
    private queue: HistoryQueue<HistoryRecordType> = new HistoryQueue<HistoryRecordType>(50);

    public put(record: HistoryRecordType): void {
        if (this.firstPut) {
            //算出当前操作类型的初始状态，put进队列
            let firstRecord: HistoryRecordType | null = null;
            const {initLayoutConfigs} = designerStore;
            if (record.type === HistoryType.DRAG) {
                let firstRecordData: DragDataType | null = null;
                const ids = (record.data as DragDataType).ids;
                let x: number = +Infinity, y: number = +Infinity
                ids.forEach((id) => {
                    const initData = initLayoutConfigs[id];
                    x = Math.min(x, initData.position![0]);
                    y = Math.min(y, initData.position![1]);
                });
                firstRecordData = {ids, x, y};
                firstRecord = {
                    type: HistoryType.DRAG,
                    data: firstRecordData
                }
                //插入计算出来的初始状态作为第一条记录
                this.queue.enqueue(firstRecord);
            } else if (record.type === HistoryType.RESIZE) {
                let firstRecordData: ResizeDataType | null = null;
                const ids = (record.data as DragDataType).ids;
                let minX: number = +Infinity, minY: number = +Infinity,
                    maxX: number = -Infinity, maxY: number = -Infinity;
                ids.forEach((id) => {
                    const initData = initLayoutConfigs[id];
                    minX = Math.min(minX, initData.position![0]);
                    minY = Math.min(minY, initData.position![1]);
                    maxX = Math.max(maxX, initData.position![0] + initData.width!);
                    maxY = Math.max(maxY, initData.position![1] + initData.height!);
                });
                firstRecordData = {
                    ids,
                    width: maxX - minX,
                    height: maxY - minY,
                    direction: (record.data as ResizeDataType).direction
                };
                firstRecord = {
                    type: HistoryType.RESIZE,
                    data: firstRecordData
                }
                //插入计算出来的初始状态作为第一条记录
                this.queue.enqueue(firstRecord);
            } else if (record.type === HistoryType.STYLE) {
                const {elemConfigs} = designerStore;
                let firstRecordData: StyleDataType[] = [];
                (record.data as StyleDataType[]).forEach((item) => {
                    firstRecordData.push(elemConfigs![item.id!])
                })
                firstRecord = {
                    type: HistoryType.STYLE,
                    data: firstRecordData
                }
                //插入计算出来的初始状态作为第一条记录
                this.queue.enqueue(firstRecord);
            }
            //插入手动操作的记录
            this.queue.enqueue(record);
            this.firstPut = false;
        } else {
            //正常入队
            this.queue.enqueue(record);
        }
    }

    public backoff(): HistoryStepType | null {
        let size = this.queue.getSize();
        if (size === 0) return null;
        return {
            curr: this.queue.getBackPointElem(),
            prev: this.queue.backoff()
        }
    }
}

const historyOperator = new HistoryOperator();
export {historyOperator}