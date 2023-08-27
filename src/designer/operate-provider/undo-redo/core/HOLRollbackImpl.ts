import AbstractRollback from "./AbstractRollback";
import {HistoryRecordType} from "../HistoryType";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class HOLRollbackImpl extends AbstractRollback {
    redo(): void {
    }

    undo(record: HistoryRecordType): void {
    }

}

const holRollbackImpl = new HOLRollbackImpl();
export default holRollbackImpl;