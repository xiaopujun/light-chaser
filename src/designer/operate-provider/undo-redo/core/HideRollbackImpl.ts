import AbstractRollback from "./AbstractRollback";
import {IHideOperateData, IHistoryRecord} from "../OperateType";
import layerManager from "../../../manager/LayerManager.ts";
import {Component} from "react";
import layerListStore from "../../../left/layer-list/LayerListStore";
import designerLeftStore from "../../../left/DesignerLeftStore";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class HideRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        if (!record) return;
        const {next} = record;
        const {updateLayer} = layerManager;
        if (next)
            updateLayer(next as IHideOperateData[]);
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
            //图层列表若显示，则需要更新图层列表的组件状态
            (next as IHideOperateData[])?.forEach((item) => {
                const {id, hide} = item;
                (layerInstances[id] as Component).setState({hide});
            })
        }
    }

    undo(record: IHistoryRecord): void {
        if (!record) return;
        const {prev} = record;
        const {updateLayer} = layerManager;
        if (prev)
            updateLayer(prev as IHideOperateData[]);
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
            //图层列表若显示，则需要更新图层列表的组件状态
            (prev as IHideOperateData[])?.forEach((item) => {
                const {id, hide} = item;
                (layerInstances[id] as Component).setState({hide});
            })
        }
    }

}

const hideRollbackImpl = new HideRollbackImpl();
export default hideRollbackImpl;