import HistoryQueue from "./HistoryQueue";
import {IHistoryRecords} from "./OperateType";

class HistoryOperator {
    private queue: HistoryQueue<IHistoryRecords> = new HistoryQueue<IHistoryRecords>(50);

    public put(record: IHistoryRecords): void {
        this.queue.enqueue(record);
    }

    public backoff(): IHistoryRecords | null {
        return this.queue.backoff();
    }

    public forward(): IHistoryRecords | null {
        return this.queue.forward();
    }
}

const historyOperator = new HistoryOperator();
export {historyOperator}