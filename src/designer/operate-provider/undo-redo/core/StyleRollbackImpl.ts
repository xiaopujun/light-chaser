import AbstractRollback from "./AbstractRollback";
import {HistoryRecordType} from "../HistoryType";

export class StyleRollbackImpl extends AbstractRollback {
    redo(): void {
    }

    undo(record: HistoryRecordType): void {
    }

}

const styleRollbackImpl = new StyleRollbackImpl();
export default styleRollbackImpl;