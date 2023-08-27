import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {HistoryRecordType, ResizeDataType} from "../HistoryType";

export class ResizeRollbackImpl extends AbstractRollback {
    redo(): void {

    }

    undo(record: HistoryRecordType): void {
        if (!record) return;
        const {movableRef, setBackoff, setTargets} = eventOperateStore;
        const {prev} = record!;
        let prevResizeData = prev! as ResizeDataType;
        //选中目标元素
        const targets: HTMLElement[] = [];
        prevResizeData.ids.forEach((id) => targets.push(document.getElementById(id)!));
        setTargets(targets);
        setBackoff(true);
        //执行反向操作
        movableRef?.current?.request("resizable", {
            offsetWidth: prevResizeData!.width,
            offsetHeight: prevResizeData!.height,
            direction: prevResizeData!.direction,
        }, true);
    }

}

const resizeRollbackImpl = new ResizeRollbackImpl();
export default resizeRollbackImpl;