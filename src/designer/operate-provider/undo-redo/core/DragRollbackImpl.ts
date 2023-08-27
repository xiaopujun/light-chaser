import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {DragDataType, HistoryRecordType, HistoryType} from "../HistoryType";

export class DragRollbackImpl extends AbstractRollback {
    redo(): void {

    }

    undo(record: HistoryRecordType): void {
        if (!record) return;
        const {movableRef, setBackoff, setTargets} = eventOperateStore;
        const {type, prev} = record!;
        if (type === HistoryType.DRAG) {
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

}

const dragRollbackImpl = new DragRollbackImpl();
export default dragRollbackImpl;