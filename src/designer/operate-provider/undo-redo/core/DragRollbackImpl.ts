import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {DragDataType, HistoryRecordType} from "../HistoryType";

export class DragRollbackImpl extends AbstractRollback {
    redo(record: HistoryRecordType): void {
        if (!record) return;
        const {movableRef, setBackoff, setTargets} = eventOperateStore;
        const {next} = record!;
        let nextRecordData = next! as DragDataType;
        //选中目标元素
        const targets: HTMLElement[] = [];
        nextRecordData.ids.forEach((id) => targets.push(document.getElementById(id)!));
        setTargets(targets);
        setBackoff(true);
        //执行反向操作
        movableRef?.current?.request("draggable", {
            x: nextRecordData!.x,
            y: nextRecordData!.y,
        }, true);

    }

    undo(record: HistoryRecordType): void {
        if (!record) return;
        const {movableRef, setBackoff, setTargets} = eventOperateStore;
        const {prev} = record!;
        let prevRecordData = prev! as DragDataType;
        //选中目标元素
        const targets: HTMLElement[] = [];
        prevRecordData.ids.forEach((id) => targets.push(document.getElementById(id)!));
        setTargets(targets);
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