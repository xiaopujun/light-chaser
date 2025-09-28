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
import eventOperateStore from "../../EventOperateStore";
import {IAddOperateData, IHistoryRecord} from "../OperateType";
import rightStore from "../../../right/RightStore";
import cloneDeep from "lodash/cloneDeep";
import layerManager from "../../../manager/LayerManager.ts";

export class AddRollbackImpl extends AbstractRollback {
    redo(record: IHistoryRecord): void {
        if (!record) return;
        const {next} = record!;
        //执行正向操作添加元素
        const {addItem} = layerManager;
        (next as IAddOperateData[]).forEach((item) => {
            if ('id' in item) {
                addItem(cloneDeep(item.layerConfig!));
                if ('elemConfig' in item)
                    layerManager.elemConfigs![item.id!] = cloneDeep(item.elemConfig!);
            }
            if ('layerHeader' in item)
                layerManager.layerHeader = item.layerHeader;
            if ('layerTail' in item)
                layerManager.layerTail = item.layerTail;
        });
    }

    undo(record: IHistoryRecord): void {
        if (!record)
            return;
        const {setTargetIds, focusDesignerCanvas} = eventOperateStore;
        const {prev, next} = record!;
        //执行反向操作删除元素
        const {delItem} = layerManager;
        const delIds: string[] = [];
        next && (next! as IAddOperateData[]).forEach((item) => delIds.push(item.id!));
        delItem(delIds);
        prev && (prev as IAddOperateData[]).forEach((item) => {
            if ('layerHeader' in item!)
                layerManager.layerHeader = item.layerHeader;
            if ('layerTail' in item!)
                layerManager.layerTail = item.layerTail;
        });


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