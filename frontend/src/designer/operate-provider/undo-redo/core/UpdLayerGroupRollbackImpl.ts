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
import {IHistoryRecord} from "../OperateType";
import {ILayerItem} from "../../../DesignerType";
import cloneDeep from "lodash/cloneDeep";
import layerManager from "../../../manager/LayerManager.ts";

/**
 * 图层编组和解除编组不能简单的认为只需要调用doGrouping和doUnGrouping即可。撤销和重做的额过程中，图层对应的设置项也要完整的撤销和重做
 */
export class UpdLayerGroupRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        const {next} = record;
        if (next) {
            const updData: ILayerItem[] = [];
            (next as ILayerItem[]).forEach((item) => {
                if ('id' in item)
                    updData.push(cloneDeep(item));
                if ('layerHeader' in item)
                    layerManager.layerHeader = item.layerHeader as string;
                if ('layerTail' in item)
                    layerManager.layerTail = item.layerTail as string;
            });
            const {updateLayer} = layerManager;
            updateLayer(updData);
        }
    }

    undo(record: IHistoryRecord): void {
        const {prev} = record;
        if (prev) {
            const updData: ILayerItem[] = [];
            (prev as ILayerItem[]).forEach((item) => {
                if ('id' in item)
                    updData.push(cloneDeep(item));
                if ('layerHeader' in item)
                    layerManager.layerHeader = item.layerHeader as string;
                if ('layerTail' in item)
                    layerManager.layerTail = item.layerTail as string;

            });
            const {updateLayer} = layerManager;
            updateLayer(updData);
        }
    }

}

const updLayerGroupRollbackImpl = new UpdLayerGroupRollbackImpl();
export default updLayerGroupRollbackImpl;