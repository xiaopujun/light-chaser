import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {IDelOperateData, IHistoryRecord} from "../OperateType";
import designerStore from "../../../store/DesignerStore";

export class DelRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        if (!record) return;
        const {prev} = record!;
        //执行正向操作删除元素
        const {delItem} = designerStore;
        const delIds: string[] = [];
        (prev as IDelOperateData[]).forEach((item) => delIds.push(item.id));
        delItem(delIds);
        const {setTargetIds, focusDesignerCanvas} = eventOperateStore;
        //清空框选状态,避免空框选
        setTargetIds([]);
        //删除元素后重新聚焦画布
        focusDesignerCanvas();
    }

    undo(record: IHistoryRecord): void {
        if (!record) return;
        const {setTargetIds} = eventOperateStore;
        const {prev} = record!;
        let prevDelData = prev! as IDelOperateData[];
        //执行反向操作添加元素
        const {addItem, elemConfigs} = designerStore;
        const targetIds: string[] = [];
        prevDelData.forEach((item) => {
            addItem(item.data.layerConfig);
            elemConfigs![item.id] = item.data.elemConfig;
            targetIds.push(item.id!);
        });
        //选中目标元素
        setTargetIds(targetIds);
    }

}

const delRollbackImpl = new DelRollbackImpl();
export default delRollbackImpl;