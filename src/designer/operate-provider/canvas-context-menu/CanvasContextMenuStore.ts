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

import {action, makeObservable, observable} from "mobx";

/**
 * 右键操作菜单的状态管理类。
 */
class CanvasContextMenuStore {
    constructor() {
        makeObservable(this, {
            visible: observable,
            position: observable,
            updateVisible: action,
            setPosition: action,
        })
    }

    /**
     * 右键菜单显示状态
     */
    visible = false;
    /**
     * 右键菜单位置
     */
    position: [number, number] = [0, 0];
    /**
     * 鼠标按下时间，用于优化。 右键菜单的操作体验。由于长按右键是拖拽整个画布的操作。 在长时间按住右键后。
     * 右键菜单也会显示。为了避免这种情况。 需要在鼠标抬起时。 判断鼠标按下到抬起的时间。如果时间小于200ms则不显示右键菜单。
     */
    mouseDownTime = 0;
    /**
     * 鼠标抬起时间
     */
    mouseUpTime = 0;

    updateVisible = (visible: boolean) => this.visible = visible;

    setPosition = (position: [number, number]) => this.position = position;

    setMouseDownTime = (time: number) => this.mouseDownTime = time;

    setMouseUpTime = (time: number) => this.mouseUpTime = time;

}

const contextMenuStore = new CanvasContextMenuStore();
export default contextMenuStore;