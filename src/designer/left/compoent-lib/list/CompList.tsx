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
import {ChangeEvent, Component} from 'react';
import './CompList.less';
import {observer} from "mobx-react";
import eventOperateStore from "../../../operate-provider/EventOperateStore";
import {ILayerItem} from "../../../DesignerType";
import IdGenerate from "../../../../utils/IdGenerate";
import componentListStore from "../ComponentListStore";
import {AbstractDefinition, BaseInfoType} from "../../../../framework/core/AbstractDefinition";
import historyRecordOperateProxy from "../../../operate-provider/undo-redo/HistoryRecordOperateProxy";
import {Input} from "antd";
import {DesignerLoader} from "../../../loader/DesignerLoader.ts";

class CompList extends Component {

    private currentDragType: string | null = null;
    private currentDragName: string | null = null;
    private dragging = false;
    private dragPreviewEl: HTMLDivElement | null = null;
    private onMouseUpBound: ((e: MouseEvent) => void) | null = null;
    private onMouseMoveBound: ((e: MouseEvent) => void) | null = null;
    private previousBodyCursor: string = '';

    constructor(props: any) {
        super(props);
        const {doInit} = componentListStore;
        doInit && doInit();
    }

    componentWillUnmount() {
        this.teardownDragging();
    }

    desktopPointerDown = (compKey: string, compName: string, event: React.MouseEvent<HTMLDivElement>) => {
        this.currentDragType = compKey;
        this.currentDragName = compName;
        this.dragging = true;
        this.setupPreview(event.clientX, event.clientY);
        if (!this.onMouseUpBound) {
            this.onMouseUpBound = this.desktopMouseUp;
            window.addEventListener('mouseup', this.onMouseUpBound);
        }
        if (!this.onMouseMoveBound) {
            this.onMouseMoveBound = this.desktopMouseMove;
            window.addEventListener('mousemove', this.onMouseMoveBound);
        }
    }

    desktopMouseMove = (event: MouseEvent) => {
        if (!this.dragging || !this.dragPreviewEl) return;
        this.dragPreviewEl.style.left = `${event.clientX + 12}px`;
        this.dragPreviewEl.style.top = `${event.clientY + 12}px`;
    }

    desktopMouseUp = (event: MouseEvent) => {
        const type = this.currentDragType;
        this.currentDragType = null;
        this.currentDragName = null;
        this.dragging = false;
        this.teardownDragging();
        if (!type) return;
        const {scale, dsContentRef} = eventOperateStore;
        const contentPos = dsContentRef?.getBoundingClientRect();
        if (!contentPos) return;
        const withinX = event.clientX >= contentPos.left && event.clientX <= contentPos.right;
        const withinY = event.clientY >= contentPos.top && event.clientY <= contentPos.bottom;
        if (!withinX || !withinY) return;
        const x = (event.clientX - contentPos.left) / scale;
        const y = (event.clientY - contentPos.top) / scale;
        this.addItem(type, [x, y]);
    }

    setupPreview = (x: number, y: number) => {
        if (!this.dragPreviewEl) {
            this.dragPreviewEl = document.createElement('div');
            this.dragPreviewEl.className = 'component-drag-preview';
            this.dragPreviewEl.innerText = this.currentDragName || '';
            document.body.appendChild(this.dragPreviewEl);
        }
        this.dragPreviewEl.style.left = `${x + 12}px`;
        this.dragPreviewEl.style.top = `${y + 12}px`;
        this.previousBodyCursor = document.body.style.cursor;
        document.body.style.cursor = 'grabbing';
    }

    teardownDragging = () => {
        if (this.onMouseUpBound) {
            window.removeEventListener('mouseup', this.onMouseUpBound);
            this.onMouseUpBound = null;
        }
        if (this.onMouseMoveBound) {
            window.removeEventListener('mousemove', this.onMouseMoveBound);
            this.onMouseMoveBound = null;
        }
        if (this.dragPreviewEl && this.dragPreviewEl.parentNode) {
            this.dragPreviewEl.parentNode.removeChild(this.dragPreviewEl);
            this.dragPreviewEl = null;
        }
        document.body.style.cursor = this.previousBodyCursor || '';
    }

    addItem = (compKey: string, position = [0, 0]) => {
        const {setAddRecordCompId} = eventOperateStore;
        const {definitionMap} = DesignerLoader;
        const {compName, width = 320, height = 200} = definitionMap[compKey].getBaseInfo();
        const movableItem: ILayerItem = {
            name: compName,
            type: compKey,
            x: Math.round(position![0]),
            y: Math.round(position![1]),
            id: IdGenerate.generateId(),
            lock: false,
            hide: false,
            width,
            height,
        }
        //标识本次操作为手动添加组件，与回滚撤销区分开
        setAddRecordCompId(movableItem.id!)
        historyRecordOperateProxy.doAdd(movableItem);
    }

    getChartDom = () => {
        const chartDom = [];
        const {search, categories, subCategories} = componentListStore;
        let {compInfoArr} = componentListStore;
        if (categories !== "all") {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.categorize === categories;
            })
        }
        if (subCategories !== "all") {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.subCategorize === subCategories;
            })
        }
        if (search !== '') {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.compName.indexOf(search) >= 0;
            })
        }
        for (let i = 0; i < compInfoArr.length; i++) {
            const compInfo: BaseInfoType = compInfoArr[i];
            const {compName, compKey} = compInfo;
            const definition: AbstractDefinition = DesignerLoader.definitionMap[compKey];
            const chartImg = definition.getChartImg();
            chartDom.push(
                <div
                    key={i + ''}
                    className={'list-item droppable-element'}
                        draggable={false}
                        onMouseDown={(e) => this.desktopPointerDown(compKey, compName, e)}
                    onDoubleClick={() => this.addItem(compKey)}
                    data-type={compKey}
                >
                    <div style={{pointerEvents: 'none'}}>
                        <div className={'item-header'}>
                            <div className={'item-name'}>{compName}</div>
                        </div>
                        <div className={'item-content'}>
                            <img src={chartImg!} alt={compName}/>
                        </div>
                    </div>
                </div>
            )
        }
        return chartDom;
    }

    searchChart = (e: ChangeEvent<HTMLInputElement>) => {
        const {setSearch} = componentListStore;
        setSearch && setSearch((e.target as HTMLInputElement).value);
    }

    render() {
        return (
            <div className={'comp-list-container'}>
                <div className={'list-search'}>
                    <Input
                        placeholder="搜索组件"
                        onChange={this.searchChart}
                        className="component-search-input"
                    />
                </div>
                <div className={'list-items'} id={'component-drag-container'}>
                    {this.getChartDom()}
                </div>
            </div>
        );
    }
}

export default observer(CompList);
