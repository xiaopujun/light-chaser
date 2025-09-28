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
import {IHistoryRecord, IOrderOperateData} from "../OperateType";
import layerManager from "../../../manager/LayerManager.ts";

/**
 * hide, lock, order的撤销与回滚操作实现
 */
export class OrderRollBackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        const {next} = record;
        const {updateLayer} = layerManager;
        if (next) updateLayer(next as IOrderOperateData[]);
    }

    undo(record: IHistoryRecord): void {
        const {prev} = record;
        const {updateLayer} = layerManager;
        if (prev) updateLayer(prev as IOrderOperateData[]);
    }

}

const orderRollBackImpl = new OrderRollBackImpl();
export default orderRollBackImpl;