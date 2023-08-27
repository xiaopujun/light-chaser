import HistoryQueue from "./HistoryQueue";
import {HistoryRecordType} from "./HistoryType";

// export interface HistoryStepType {
//     /**
//      * 当前记录
//      */
//     curr: HistoryRecordType | null;
//     /**
//      * 当前记录的前一个记录
//      */
//     prev: HistoryRecordType | null;
// }

class HistoryOperator {
    private firstPut: boolean = true;
    private queue: HistoryQueue<HistoryRecordType> = new HistoryQueue<HistoryRecordType>(50);

    public put(record: HistoryRecordType): void {
        this.queue.enqueue(record);
    }

    public backoff(): HistoryRecordType | null {
        return this.queue.backoff();
    }
}

const historyOperator = new HistoryOperator();
export {historyOperator}