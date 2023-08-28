import AbstractRollback from "./AbstractRollback";
import {HistoryRecordType, OrderDataType} from "../HistoryType";
import designerStore from "../../../store/DesignerStore";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class OrderRollBackImpl extends AbstractRollback {
    redo(): void {
    }

    undo(record: HistoryRecordType): void {
        const {prev} = record;
        const {updateLayout} = designerStore;
        if (prev) updateLayout(prev as OrderDataType[]);
    }

}

const orderRollBackImpl = new OrderRollBackImpl();
export default orderRollBackImpl;