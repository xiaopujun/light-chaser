import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {IHistoryRecord, IResizeOperateData} from "../OperateType";

export class ResizeRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        if (!record) return;
        const {movableRef, setBackoff, setTargetIds} = eventOperateStore;
        const {next} = record!;
        const nextResizeData = next! as IResizeOperateData;
        //选中目标元素
        setTargetIds(nextResizeData.ids);
        setBackoff(true);
        //执行反向操作，React18推出了新的批处理和并发执行机制，导致之前17版本中部分逻辑代码的执行顺序发生了变化，因此这里需要将反向执行操作放到下一个事件循环中执行
        Promise.resolve().then(() => {
            movableRef?.request("resizable", {
                offsetWidth: nextResizeData!.width,
                offsetHeight: nextResizeData!.height,
                direction: nextResizeData!.direction,
            }, true);
        });
    }

    undo(record: IHistoryRecord): void {
        if (!record) return;
        const {movableRef, setBackoff, setTargetIds} = eventOperateStore;
        const {prev} = record!;
        const prevResizeData = prev! as IResizeOperateData;
        //选中目标元素
        setTargetIds(prevResizeData.ids);
        setBackoff(true);
        //执行反向操作,React18推出了新的批处理和并发执行机制，导致之前17版本中部分逻辑代码的执行顺序发生了变化，因此这里需要将反向执行操作放到下一个事件循环中执行
        Promise.resolve().then(() => {
            movableRef?.request("resizable", {
                offsetWidth: prevResizeData!.width,
                offsetHeight: prevResizeData!.height,
                direction: prevResizeData!.direction,
            }, true);
        });
    }

}

const resizeRollbackImpl = new ResizeRollbackImpl();
export default resizeRollbackImpl;