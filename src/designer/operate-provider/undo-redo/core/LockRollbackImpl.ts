import AbstractRollback from "./AbstractRollback";
import {IHistoryRecord, ILockOperateData} from "../OperateType";
import designerStore from "../../../store/DesignerStore";
import layerListStore from "../../../float-configs/layer-list/LayerListStore";
import {Component} from "react";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class LockRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        const {next} = record;
        const {updateLayout} = designerStore;
        if (next)
            updateLayout(next as ILockOperateData[]);
        const {visible, layerInstances} = layerListStore;
        if (visible) {
            //图层列表若显示，则需要更新图层列表的组件状态
            (next as ILockOperateData[])?.forEach((item) => {
                const {id, lock} = item;
                (layerInstances[id] as Component).setState({lock});
            })
        }
    }

    undo(record: IHistoryRecord): void {
        const {prev} = record;
        const {updateLayout} = designerStore;
        if (prev)
            updateLayout(prev as ILockOperateData[]);
        const {visible, layerInstances} = layerListStore;
        if (visible) {
            //图层列表若显示，则需要更新图层列表的组件状态
            (prev as ILockOperateData[])?.forEach((item) => {
                const {id, lock} = item;
                (layerInstances[id] as Component).setState({lock});
            })
        }
    }

}

const lockRollbackImpl = new LockRollbackImpl();
export default lockRollbackImpl;