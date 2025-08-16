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

import {ScaleCore} from "../../designer/operate-provider/scale/ScaleCore";
import {IPoint} from "../../designer/blueprint/manager/BluePrintManager.ts";

export interface DragScaleData {
    scale: number;
    ratio: number;
    position: IPoint;
}

export interface DragScaleProviderParams {
    container: HTMLDivElement | null;
    content: HTMLDivElement | null;
    position?: IPoint;
    dragCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    dragStartCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    dragEndCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    scaleCallback?: (dsData: DragScaleData, e: WheelEvent) => void;
}

/**
 * 拖拽缩放容器，独立提供拖拽与缩放功能。
 * 1.拖拽画布统一操作方式为长按鼠标右键
 * 2.缩放画布统一操作方式alt+鼠标滚轮
 * 上述两种操作的相关事件均在此组件内部完成（除缩放逻辑外，缩放逻辑调用外部方法获取scale比例）
 *
 * 主编辑器、蓝图编辑器均使用该类提供拖拽缩放功能
 */
export interface DragScaleData {
    scale: number;
    ratio: number;
    position: IPoint;
}

export interface DragScaleProviderConfig {
    eventContainer: HTMLDivElement;
    dsTarget: HTMLDivElement;
    content?: HTMLDivElement | null;
    position?: IPoint;
    dragCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    dragStartCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    dragEndCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    scaleCallback?: (dsData: DragScaleData, e: WheelEvent) => void;
}

/**
 * 拖拽缩放容器，独立提供拖拽与缩放功能。
 * 1.拖拽画布统一操作方式为长按鼠标右键
 * 2.缩放画布统一操作方式alt+鼠标滚轮
 * 上述两种操作的相关事件均在此组件内部完成（除缩放逻辑外，缩放逻辑调用外部方法获取scale比例）
 *
 * 主编辑器、蓝图编辑器均使用该类提供拖拽缩放功能
 */
export default class DragScaleProvider {
    private config: DragScaleProviderConfig;
    public scaleCore: ScaleCore = new ScaleCore();

    constructor(config: DragScaleProviderConfig) {
        this.config = config;
        if (!this.config.position)
            this.config.position = {x: 0, y: 0};
        //注册拖拽
        this.registerDrag();
        //注册缩放
        this.registerScale();
    }

    /************************事件、变量销毁************************/
    public destroy() {
        const container = this.config.eventContainer;
        if (container) {
            container?.removeEventListener('pointerdown', this.pointerDown);
            container?.removeEventListener('pointerup', this.pointerUp);
            container?.removeEventListener('wheel', this.doWheel);
            container?.removeEventListener('contextmenu', this.contextMenu);
        }
    }

    /************************注册拖拽事件************************/
    private registerDrag() {
        const {eventContainer, dsTarget, position = {x: 0, y: 0}} = this.config;
        //初始化被拖拽对象位置
        dsTarget.style.transform = 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0) scale(' + this.scaleCore.scale + ')';
        //阻止系统右键菜单显示
        eventContainer.addEventListener("contextmenu", this.contextMenu)
        //监听拖拽开始
        this.onDragStart();
        //监听拖拽结束
        this.onDragEnd();
    }

    private contextMenu = (e: MouseEvent): void => e.preventDefault();

    private onDragStart = (): void => this.config.eventContainer.addEventListener('pointerdown', this.pointerDown);

    private onDragMove = (e: PointerEvent): void => {
        if (e.buttons === 2) {
            this.config.position!.x += e.movementX;
            this.config.position!.y += e.movementY;
            this.config.dsTarget.style.transform = 'translate3d(' + this.config.position!.x + 'px, ' + this.config.position!.y + 'px, 0) scale(' + this.scaleCore.scale + ')';
            if (this.config.dragCallback) {
                const {scale, ratio} = this.scaleCore;
                this.config.dragCallback({scale, ratio, position: this.config.position ?? {x: 0, y: 0}}, e);
            }
        }
    }

    private onDragEnd = (): void => this.config.eventContainer.addEventListener('pointerup', this.pointerUp);

    private pointerDown = (e: PointerEvent): void => {
        if (e.button === 2) {
            //设置鼠标捕获，当鼠标移出视口外时，仍然能够监听到鼠标移动事件
            this.config.eventContainer.setPointerCapture(e.pointerId);
            //监听拖拽移动
            this.config.eventContainer.addEventListener('pointermove', this.onDragMove);
            if (this.config.dragStartCallback) {
                const {scale, ratio} = this.scaleCore;
                this.config.dragStartCallback({scale, ratio, position: this.config.position ?? {x: 0, y: 0}}, e);
            }
        }
    }

    private pointerUp = (e: PointerEvent): void => {
        if (e.button === 2) {
            this.config.eventContainer.releasePointerCapture(e.pointerId);
            //取消拖拽移动监听
            this.config.eventContainer.removeEventListener('pointermove', this.onDragMove);
            if (this.config.dragEndCallback) {
                const {scale, ratio} = this.scaleCore;
                this.config.dragEndCallback({scale, ratio, position: this.config.position ?? {x: 0, y: 0}}, e);
            }
        }
    }


    /************************注册缩放事件************************/
    private registerScale = (): void => this.config.eventContainer.addEventListener('wheel', this.doWheel);

    private doWheel = (e: WheelEvent): void => {
        if (e.altKey && e.buttons !== 2) {
            //计算缩放比例
            this.scaleCore.compute(e.deltaY > 0 ? 0 : 1);
            const {x: offSetX, y: offSetY} = this.config.eventContainer.getBoundingClientRect();
            //执行缩放
            const {width = '0px', height = '0px'} = this.config.dsTarget?.style ?? {};
            this.config.position!.x = this.config.position!.x - ((this.scaleCore.ratio - 1) * (e.clientX - offSetX - this.config.position!.x - parseFloat(width ?? '0') * 0.5));
            this.config.position!.y = this.config.position!.y - ((this.scaleCore.ratio - 1) * (e.clientY - offSetY - this.config.position!.y - parseFloat(height ?? '0') * 0.5));
            this.config.dsTarget.style.transform = 'translate3d(' + this.config.position!.x + 'px, ' + this.config.position!.y + 'px, 0) scale(' + this.scaleCore.scale + ')';
            //执行回调
            if (this.config.scaleCallback) {
                const {scale, ratio} = this.scaleCore;
                this.config.scaleCallback({scale, ratio, position: this.config.position ?? {x: 0, y: 0}}, e);
            }
        }
    }

}



