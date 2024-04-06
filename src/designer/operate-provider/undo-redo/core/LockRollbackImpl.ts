import AbstractRollback from "./AbstractRollback";
import {IHistoryRecord, ILockOperateData} from "../OperateType";
import layerManager from "../../../manager/LayerManager.ts";
import {Component} from "react";
import layerListStore from "../../../left/layer-list/LayerListStore";
import designerLeftStore from "../../../left/DesignerLeftStore";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class LockRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        const {next} = record;
        const {updateLayer} = layerManager;
        if (next)
            updateLayer(next as ILockOperateData[]);
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
            //图层列表若显示，则需要更新图层列表的组件状态
            (next as ILockOperateData[])?.forEach((item) => {
                const {id, lock} = item;
                (layerInstances[id] as Component).setState({lock});
            })
        }
    }

    undo(record: IHistoryRecord): void {
        const {prev} = record;
        const {updateLayer} = layerManager;
        if (prev)
            updateLayer(prev as ILockOperateData[]);
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
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