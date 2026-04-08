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

import React, {ChangeEvent, MouseEvent} from "react";
import layerListStore from "../LayerListStore";
import contextMenuStore from "../../../operate-provider/canvas-context-menu/CanvasContextMenuStore.ts";
import layerManager from "../../../manager/LayerManager.ts";
import rightStore from "../../../right/RightStore.ts";

export interface LayerProps {
    compId?: string;
    name?: string;
    lock?: boolean;
    hide?: boolean;
    selected?: boolean;
    inputMode?: boolean;
    children?: React.ReactNode;
}

export abstract class BaseLayer extends React.PureComponent<LayerProps, LayerProps & { showContent?: boolean }> {

    layerName: string = '';

    constructor(props: LayerProps) {
        super(props);
        this.state = {...props};
        this.layerName = props.name || '';
    }

    /**
     * 由于图层列表的操作事件阻止了冒泡，因此通过本方法单独判断是否需要关闭图层列表上打开的右键菜单
     */
    closeContextMenu = () => {
        const {visible, updateVisible} = contextMenuStore;
        if (visible)
            updateVisible(false);
    }

    toggleLock = (event: MouseEvent) => {
        event.stopPropagation();
        const {lockChange} = layerListStore;
        lockChange && lockChange(this.state.compId!, !this.state.lock);
        this.closeContextMenu();
    }

    toggleHide = (event: MouseEvent) => {
        event.stopPropagation();
        const {hideChange} = layerListStore;
        hideChange && hideChange(this.state.compId!, !this.state.hide);
        this.closeContextMenu();
    }

    onSelected = (event: MouseEvent<HTMLDivElement>) => {
        const {hide, compId} = this.state;
        if (hide) return;
        event.stopPropagation();
        const {selectedChange} = layerListStore;
        selectedChange && selectedChange(compId!, event);
        this.closeContextMenu();
    }

    openInput = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const {inputMode} = this.state;
        if (!inputMode)
            this.setState({inputMode: true});
        this.closeContextMenu();
    }

    activeComponentConfig = () => {
        const {compId} = this.state;
        const {activeElem, activeConfig} = rightStore;
        const {layerConfigs} = layerManager!;
        const layer = layerConfigs[compId!];
        if (compId === activeElem.id)
            return;
        activeConfig(compId!, layer.type!);
    }

    closeInput = () => {
        const {inputMode, compId, name} = this.state;
        if (inputMode && name !== this.layerName) {
            const {updateLayer, compController} = layerManager;
            updateLayer([{id: compId!, name: this.layerName}], false);
            const compInstance = compController[compId!];
            compInstance && compInstance.update({base: {name: this.layerName}}, {reRender: false});
            this.setState({inputMode: false, name: this.layerName});
        } else {
            this.setState({inputMode: false});
        }
    }

    changeLayerName = (event: ChangeEvent<HTMLInputElement>) => {
        this.layerName = event.target.value;
    }
}