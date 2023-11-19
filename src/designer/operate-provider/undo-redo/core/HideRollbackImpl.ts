import AbstractRollback from "./AbstractRollback";
import {HideDataType, HistoryRecordType} from "../HistoryType";
import designerStore from "../../../store/DesignerStore";
import layerListStore from "../../../float-configs/layer-list/LayerListStore";
import {Component} from "react";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class HideRollbackImpl extends AbstractRollback {
    redo(record: HistoryRecordType): void {
        if (!record) return;
        const {next} = record;
        const {updateLayout} = designerStore;
        if (next)
            updateLayout(next as HideDataType[]);
        const {visible, layerInstances} = layerListStore;
        if (visible) {
            //图层列表若显示，则需要更新图层列表的组件状态
            (next as HideDataType[])?.forEach((item) => {
                const {id, hide} = item;
                (layerInstances[id] as Component).setState({hide});
            })
        }
    }

    undo(record: HistoryRecordType): void {
        if (!record) return;
        const {prev} = record;
        const {updateLayout} = designerStore;
        if (prev)
            updateLayout(prev as HideDataType[]);
        const {visible, layerInstances} = layerListStore;
        if (visible) {
            //图层列表若显示，则需要更新图层列表的组件状态
            (prev as HideDataType[])?.forEach((item) => {
                const {id, hide} = item;
                (layerInstances[id] as Component).setState({hide});
            })
        }
    }

}

const hideRollbackImpl = new HideRollbackImpl();
export default hideRollbackImpl;