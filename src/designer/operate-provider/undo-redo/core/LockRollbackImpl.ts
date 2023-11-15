import AbstractRollback from "./AbstractRollback";
import {HistoryRecordType, LockDataType} from "../HistoryType";
import designerStore from "../../../store/DesignerStore";
import layerListStore from "../../../float-configs/layer-list/LayerListStore";
import {Component} from "react";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class LockRollbackImpl extends AbstractRollback {
    redo(record: HistoryRecordType): void {
        const {next} = record;
        const {updateLayout} = designerStore;
        if (next)
            updateLayout(next as LockDataType[]);
        const {visible, layerInstances} = layerListStore;
        if (visible) {
            //图层列表若显示，则需要更新图层列表的组件状态
            (next as LockDataType[])?.forEach((item) => {
                const {id, lock} = item;
                (layerInstances[id] as Component).setState({lock});
            })
        }
    }

    undo(record: HistoryRecordType): void {
        const {prev} = record;
        const {updateLayout} = designerStore;
        if (prev)
            updateLayout(prev as LockDataType[]);
        const {visible, layerInstances} = layerListStore;
        if (visible) {
            //图层列表若显示，则需要更新图层列表的组件状态
            (prev as LockDataType[])?.forEach((item) => {
                const {id, lock} = item;
                (layerInstances[id] as Component).setState({lock});
            })
        }
    }

}

const lockRollbackImpl = new LockRollbackImpl();
export default lockRollbackImpl;