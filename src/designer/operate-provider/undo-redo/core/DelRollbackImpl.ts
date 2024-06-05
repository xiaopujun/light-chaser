import AbstractRollback from "./AbstractRollback";
import eventOperateStore from "../../EventOperateStore";
import {IDelOperateData, IHistoryRecord} from "../OperateType";
import layerManager from "../../../manager/LayerManager.ts";
import {cloneDeep} from "lodash";
import {toJS} from "mobx";

export class DelRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        if (!record) return;
        const {prev, next} = record!;
        const layerData: IDelOperateData[] = [];
        (prev as IDelOperateData[]).forEach((item) => {
            if ('id' in item)
                layerData.push(item);
        });

        //执行正向操作删除元素
        const {delItem} = layerManager;
        const delIds: string[] = [];
        layerData.forEach((item) => delIds.push(item.id!));
        delItem(delIds);
        //恢复下一个状态的头尾指针指向
        next && (next as IDelOperateData[]).forEach((item) => {
            if ('layerHeader' in item)
                layerManager.layerHeader = item.layerHeader;
            if ('layerTail' in item)
                layerManager.layerTail = item.layerTail;
        });

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
        //区分开图层数据和指针数据
        const layerData: IDelOperateData[] = [];
        const pointerData: IDelOperateData[] = [];
        (prev as IDelOperateData[]).forEach((item) => {
            if ('id' in item)
                layerData.push(item);
            else
                pointerData.push(item);
        });

        //执行反向操作添加元素
        const {addItem, elemConfigs} = layerManager;
        const targetIds: string[] = [];
        layerData.forEach((item) => {
            addItem(cloneDeep(item.layerConfig!));
            elemConfigs![item.id!] = item.elemConfig;
            targetIds.push(item.id!);
        });

        //恢复上一个状态的头尾指针指向
        pointerData.forEach((item) => {
            if ('layerHeader' in item)
                layerManager.layerHeader = item.layerHeader;
            if ('layerTail' in item)
                layerManager.layerTail = item.layerTail;
        });

        //选中目标元素，React18推出了新的批处理和并发执行机制，导致之前17版本中部分逻辑代码的执行顺序发生了变化，因此这里需要将反向执行操作放到下一个事件循环中执行
        Promise.resolve().then(() => setTargetIds(targetIds));
        console.log('del undo', toJS(layerManager.layerConfigs), layerManager.layerHeader, layerManager.layerTail);
    }

}

const delRollbackImpl = new DelRollbackImpl();
export default delRollbackImpl;