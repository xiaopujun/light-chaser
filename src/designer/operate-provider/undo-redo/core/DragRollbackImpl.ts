import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {DragDataType, HistoryRecordType} from "../HistoryType";

export class DragRollbackImpl extends AbstractRollback {
    redo(record: HistoryRecordType): void {
        if (!record) return;
        const {movableRef, setBackoff, setTargetIds} = eventOperateStore;
        const {next} = record!;
        let nextRecordData = next! as DragDataType;
        //选中目标元素
        setTargetIds(nextRecordData.ids);
        setBackoff(true);
        //执行反向操作
        movableRef?.current?.request("draggable", {
            x: nextRecordData!.x,
            y: nextRecordData!.y,
        }, true);

    }

    undo(record: HistoryRecordType): void {
        if (!record) return;
        const {movableRef, setBackoff, setTargetIds} = eventOperateStore;
        const {prev} = record!;
        let prevRecordData = prev! as DragDataType;
        //选中目标元素
        setTargetIds(prevRecordData.ids);
        setBackoff(true);
        //执行反向操作
        movableRef?.current?.request("draggable", {
            x: prevRecordData!.x,
            y: prevRecordData!.y,
        }, true);
    }

}

const dragRollbackImpl = new DragRollbackImpl();
export default dragRollbackImpl;