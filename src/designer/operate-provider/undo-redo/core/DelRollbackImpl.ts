import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {DelDataType, HistoryRecordType} from "../HistoryType";
import designerStore from "../../../store/DesignerStore";

export class DelRollbackImpl extends AbstractRollback {
    redo(record: HistoryRecordType): void {
        if (!record) return;
        const {prev} = record!;
        //执行正向操作删除元素
        const {delItem} = designerStore;
        const delIds: string[] = [];
        (prev as DelDataType[]).forEach((item) => delIds.push(item.id));
        delItem(delIds);
        const {setTargetIds} = eventOperateStore;
        //清空框选状态,避免空框选
        setTargetIds([]);
    }

    undo(record: HistoryRecordType): void {
        if (!record) return;
        const {setTargetIds} = eventOperateStore;
        const {prev} = record!;
        let prevDelData = prev! as DelDataType[];
        //执行反向操作添加元素
        const {addItem, elemConfigs} = designerStore;
        const targetIds: string[] = [];
        prevDelData.forEach((item) => {
            addItem(item.data.layoutConfig);
            elemConfigs![item.id] = item.data.elemConfig;
            targetIds.push(item.id!);
        });
        //选中目标元素
        setTargetIds(targetIds);
    }

}

const delRollbackImpl = new DelRollbackImpl();
export default delRollbackImpl;