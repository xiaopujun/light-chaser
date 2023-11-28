import AbstractRollback from "./AbstractRollback";
import {IHistoryRecord, IOrderOperateData} from "../OperateType";
import designerStore from "../../../store/DesignerStore";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class OrderRollBackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        const {next} = record;
        const {updateLayer} = designerStore;
        if (next) updateLayer(next as IOrderOperateData[]);
    }

    undo(record: IHistoryRecord): void {
        const {prev} = record;
        const {updateLayer} = designerStore;
        if (prev) updateLayer(prev as IOrderOperateData[]);
    }

}

const orderRollBackImpl = new OrderRollBackImpl();
export default orderRollBackImpl;