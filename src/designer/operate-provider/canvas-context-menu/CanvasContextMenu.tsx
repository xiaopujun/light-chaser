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

import {observer} from "mobx-react";
import contextMenuStore from "./CanvasContextMenuStore.ts";
import {
    doCopy,
    doDelete,
    doGrouping,
    doHide,
    doLock,
    doUnGrouping,
    doUnLock,
    layerMoveDown,
    layerMoveUp,
    layerToBottom,
    layerToTop,
    removeFromGroup
} from "../hot-key/HotKeyImpl";
import eventOperateStore from "../EventOperateStore";
import LayerUtil from "../../left/layer-list/util/LayerUtil";
import {
    ApplicationTwo,
    CopyOne,
    DeleteOne,
    Down,
    GraphicStitchingThree,
    LinkRight,
    Lock,
    PreviewClose,
    ToBottomOne,
    ToTopOne,
    Unlock,
    Up
} from "@icon-park/react";
import ContextMenu from "../../../framework/context-menu/ContextMenu.tsx";
import layerManager from "../../manager/LayerManager.ts";


const defaultDesignerMenus = [
    {
        name: '复制',
        icon: CopyOne,
        onClick: doCopy,
    },
    {
        name: '上移',
        icon: Up,
        onClick: layerMoveUp,
    },
    {
        name: '下移',
        icon: Down,
        onClick: layerMoveDown,
    },
    {
        name: '置顶',
        icon: ToTopOne,
        onClick: layerToTop,
    },
    {
        name: '置底',
        icon: ToBottomOne,
        onClick: layerToBottom,
    },
    {
        name: '删除',
        icon: DeleteOne,
        onClick: doDelete,
    },
    {
        name: '隐藏',
        icon: PreviewClose,
        onClick: doHide,
    },
];

const CanvasContextMenu = () => {

    const calculateMenus = () => {
        const menus = [...defaultDesignerMenus];
        const {targetIds} = eventOperateStore;
        if (targetIds.length === 0)
            return menus;
        const {layerConfigs} = layerManager;
        const lockState = !!layerConfigs[targetIds[0]]?.lock;
        if (lockState) {
            menus.push({
                name: '解锁',
                icon: Unlock,
                onClick: doUnLock,
            })
        } else {
            menus.push({
                name: '锁定',
                icon: Lock,
                onClick: doLock,
            })
        }
        if (targetIds.length > 1 && !LayerUtil.hasSameGroup(targetIds)) {
            menus.push({
                name: '编组',
                icon: GraphicStitchingThree,
                onClick: doGrouping,
            })
        }
        let groupIds = LayerUtil.findTopGroupLayer(targetIds, true);
        //过滤掉其中分组等于自身的图层（即非分组图层）
        groupIds = groupIds.filter((id: string) => layerConfigs[id].type === 'group');
        if (groupIds.length > 0) {
            menus.push({
                name: '解组',
                icon: ApplicationTwo,
                onClick: doUnGrouping,
            })
        }
        const noGroup = targetIds.some((id: string) => !layerConfigs[id].pid);
        if (!noGroup)
            menus.push({
                name: '移出分组',
                icon: LinkRight,
                onClick: removeFromGroup
            })
        return menus;
    }

    const {visible, position} = contextMenuStore;
    const menus = calculateMenus();

    return (
        <ContextMenu menus={menus} visible={visible} position={position}/>
    );
}

export default observer(CanvasContextMenu);