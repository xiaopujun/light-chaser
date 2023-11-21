import HistoryQueue from "./HistoryQueue";
import {HistoriesRecordType} from "./HistoryType";

class HistoryOperator {
    private queue: HistoryQueue<HistoriesRecordType> = new HistoryQueue<HistoriesRecordType>(50);

    public put(record: HistoriesRecordType): void {
        this.queue.enqueue(record);
    }

    public backoff(): HistoriesRecordType | null {
        return this.queue.backoff();
    }

    public forward(): HistoriesRecordType | null {
        return this.queue.forward();
    }
}

const historyOperator = new HistoryOperator();
export {historyOperator}