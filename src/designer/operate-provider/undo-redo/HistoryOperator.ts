import HistoryQueue from "./HistoryQueue";
import {HistoryRecordType} from "./HistoryType";

class HistoryOperator {
    private queue: HistoryQueue<HistoryRecordType> = new HistoryQueue<HistoryRecordType>(50);

    public put(record: HistoryRecordType): void {
        this.queue.enqueue(record);
    }

    public backoff(): HistoryRecordType | null {
        return this.queue.backoff();
    }

    public forward(): HistoryRecordType | null {
        return this.queue.forward();
    }
}

const historyOperator = new HistoryOperator();
export {historyOperator}