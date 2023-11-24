import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {IAddOperateData, IHistoryRecord} from "../OperateType";
import designerStore from "../../../store/DesignerStore";

export class AddRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        if (!record) return;
        const {next} = record!;
        //执行正向操作添加元素
        const {addItem} = designerStore;
        (next as IAddOperateData[]).forEach((item) => addItem(item.data.layerConfig!));
    }

    undo(record: IHistoryRecord): void {
        if (!record) return;
        const {setTargetIds} = eventOperateStore;
        const {next} = record!;
        let nextAddData = next! as IAddOperateData[];
        //执行反向操作删除元素
        const {delItem} = designerStore;
        const delIds: string[] = [];
        nextAddData.forEach((item) => delIds.push(item.id));
        delItem(delIds);
        //清空框选状态,避免空框选
        setTargetIds([]);
    }

}

const addRollbackImpl = new AddRollbackImpl();
export default addRollbackImpl;