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

import React, {memo, useEffect} from "react";
import DragScaleProvider from "../../framework/drag-scale/DragScaleProvider";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {observer} from "mobx-react";
import ScaleAction from "../../framework/core/ScaleAction.ts";
import canvasManager from "../header/items/canvas/CanvasManager.ts";

export interface DesignerDragScaleContainerProps {
    children?: React.ReactNode;
    onDoubleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DesignerDragScaleContainer = memo(observer((props: DesignerDragScaleContainerProps) => {
    const {children, onDoubleClick} = props;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const {canvasConfig} = canvasManager!;
    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (container && content) {
            const {setDsContentRef} = eventOperateStore;
            setDsContentRef(content)
            const dragScaleProvider = new DragScaleProvider({
                container,
                content,
                scaleCallback: (dsData) => {
                    const {scale, ratio} = dsData;
                    const {setScale, setRatio, rulerRef} = eventOperateStore;
                    setScale(scale);
                    setRatio(ratio);
                    rulerRef?.ruleWheel();
                    ScaleAction.doScale(dsData.scale, dsData.scale);
                },
                dragCallback: () => {
                    const {rulerRef} = eventOperateStore;
                    rulerRef?.ruleDrag();
                },
            });
            return () => {
                dragScaleProvider.destroy();
            }
        }
    }, []);
    return (
        <div className={'designer-ds-container'} ref={containerRef}
             style={{
                 overflow: "hidden",
                 height: window.innerHeight - 110,
                 width: window.innerWidth - 115,
                 backgroundColor: '#434343',
                 position: 'relative'
             }}>
            <div className={'designer-ds-content lc-drag-scale-provider'}
                 id={'designer-ds-content'}
                 ref={contentRef}
                 onDoubleClick={onDoubleClick}
                 style={{
                     width: canvasConfig?.width,
                     height: canvasConfig?.height,
                     background: '#1c1c1c',
                     position: 'absolute',
                 }}>
                {children}
            </div>
        </div>
    )
}))

export default DesignerDragScaleContainer;
