import HistoryQueue from "./HistoryQueue";
import {IHistoriesRecord} from "./OperateType";

class HistoryOperator {
    private queue: HistoryQueue<IHistoriesRecord> = new HistoryQueue<IHistoriesRecord>(50);

    public put(record: IHistoriesRecord): void {
        this.queue.enqueue(record);
    }

    public backoff(): IHistoriesRecord | null {
        return this.queue.backoff();
    }

    public forward(): IHistoriesRecord | null {
        return this.queue.forward();
    }
}

const historyOperator = new HistoryOperator();
export {historyOperator}