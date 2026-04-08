/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import AbstractRollback from "./AbstractRollback";
import {IHideOperateData, IHistoryRecord} from "../OperateType";
import {Component} from "react";
import layerListStore from "../../../left/layer-list/LayerListStore";
import designerLeftStore from "../../../left/DesignerLeftStore";
import layerManager from "../../../manager/LayerManager.ts";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class HideRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        if (!record) return;
        const {next} = record;
        const {updateLayer, compController} = layerManager;
        if (next)
            updateLayer(next as IHideOperateData[]);
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
            //图层列表若显示，则需要更新图层列表的组件状态
            (next as IHideOperateData[])?.forEach((item) => {
                const {id, hide} = item;
                (layerInstances[id] as Component).setState({hide});
                compController[id].setVisible(!hide)
            })
        }
    }

    undo(record: IHistoryRecord): void {
        if (!record) return;
        const {prev} = record;
        const {updateLayer, compController} = layerManager;
        if (prev)
            updateLayer(prev as IHideOperateData[]);
        const {layerInstances} = layerListStore;
        const {menu} = designerLeftStore;
        if (menu === 'layer-list') {
            //图层列表若显示，则需要更新图层列表的组件状态
            (prev as IHideOperateData[])?.forEach((item) => {
                const {id, hide} = item;
                (layerInstances[id] as Component).setState({hide});
                compController[id].setVisible(!hide)
            })
        }
    }

}

const hideRollbackImpl = new HideRollbackImpl();
export default hideRollbackImpl;