import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {IAddOperateData, IHistoryRecord} from "../OperateType";
import designerStore from "../../../store/DesignerStore";
import rightStore from "../../../right/RightStore";

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
        const {setTargetIds, focusDesignerCanvas} = eventOperateStore;
        const {next} = record!;
        let nextAddData = next! as IAddOperateData[];
        //执行反向操作删除元素
        const {delItem} = designerStore;
        const delIds: string[] = [];
        nextAddData.forEach((item) => delIds.push(item.id));
        delItem(delIds);
        //清空框选状态,避免空框选
        setTargetIds([]);
        //如果右侧属性面板展示的设置项对应的组件，正是当前被删除的组件，则卸载属性面板
        const {setContentVisible, activeConfig, activeElem} = rightStore;
        if (delIds.includes(activeElem.id!)) {
            setContentVisible(false);
            activeConfig(null, "");
        }
        //删除元素后重新聚焦画布
        focusDesignerCanvas();
    }

}

const addRollbackImpl = new AddRollbackImpl();
export default addRollbackImpl;