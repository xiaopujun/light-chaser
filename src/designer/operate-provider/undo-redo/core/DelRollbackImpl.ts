import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {DelDataType, HistoryRecordType} from "../HistoryType";
import designerStore from "../../../store/DesignerStore";

export class DelRollbackImpl extends AbstractRollback {
    redo(): void {

    }

    undo(record: HistoryRecordType): void {
        if (!record) return;
        const {setTargets} = eventOperateStore;
        const {prev} = record!;
        let prevDelData = prev! as DelDataType[];
        //执行反向操作添加元素
        const {addItem, elemConfigs} = designerStore;
        const targets: HTMLElement[] = [];
        prevDelData.forEach((item) => {
            addItem(item.data.layoutConfig)
            elemConfigs![item.id] = item.data.elemConfig;
            targets.push(document.getElementById(item.id)!);
        });
        //选中目标元素
        setTargets(targets);
    }

}

const delRollbackImpl = new DelRollbackImpl();
export default delRollbackImpl;