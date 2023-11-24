import AbstractRollback from "./AbstractRollback";
import {IHistoryRecord, IOrderOperateData} from "../OperateType";
import designerStore from "../../../store/DesignerStore";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class OrderRollBackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        const {next} = record;
        const {updateLayout} = designerStore;
        if (next) updateLayout(next as IOrderOperateData[]);
    }

    undo(record: IHistoryRecord): void {
        const {prev} = record;
        const {updateLayout} = designerStore;
        if (prev) updateLayout(prev as IOrderOperateData[]);
    }

}

const orderRollBackImpl = new OrderRollBackImpl();
export default orderRollBackImpl;