import {IHistoryRecord} from "../OperateType";

/**
 * 撤销回滚抽象接口定义
 */
export default abstract class AbstractRollback {
    /**
     * 撤销
     */
    public abstract undo(record: IHistoryRecord): void;

    /**
     * 重做
     */
    public abstract redo(record: IHistoryRecord): void;
}