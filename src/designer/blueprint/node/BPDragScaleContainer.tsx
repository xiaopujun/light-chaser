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

import React, {useEffect} from "react";
import DragScaleProvider from "../../../framework/drag-scale/DragScaleProvider";
import bluePrintManager from "../manager/BluePrintManager.ts";
import {reRenderAllLine} from "../drag/BPMovable";
import CanvasUtil from "../util/CanvasUtil";


export interface BPDragScaleContainerContainerProps {
    children?: React.ReactNode;
}

export const BPDragScaleContainer: React.FC<BPDragScaleContainerContainerProps> = (props) => {
    const {children} = props;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        const {setCanvasTranslate, setCanvasScale, setBpDragContentRef} = bluePrintManager;
        const container = containerRef.current;
        const content = contentRef.current;
        setBpDragContentRef(content!);
        if (container && content) {
            const dragScaleProvider = new DragScaleProvider({
                container,
                content,
                dragCallback: (dsData) => {
                    const {position} = dsData;
                    setCanvasTranslate(position);
                    reRenderAllLine();
                },
                dragEndCallback: () => {
                    CanvasUtil.updSegmentSamplingPoint();
                },
                scaleCallback: (dsData) => {
                    const {position, scale} = dsData;
                    setCanvasScale(scale);
                    setCanvasTranslate(position);
                    reRenderAllLine();
                    CanvasUtil.updSegmentSamplingPoint();
                },
            });
            return () => {
                dragScaleProvider.destroy();
            }
        }
    }, []);
    return (
        <div className={'bp-ds-container'} id={'bp-ds-container'} ref={containerRef}
             style={{overflow: "hidden", width: '100%', height: '100%'}}>
            <div ref={contentRef} style={{width: 0, height: 0}}>{children}</div>
        </div>
    )
}
