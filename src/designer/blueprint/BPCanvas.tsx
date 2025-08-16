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

import React, {Suspense, useEffect} from "react";
import Loading from "../../json-schema/ui/loading/Loading.tsx";
import LineLayer from "./line/LineLayer.tsx";
import NodeLayer from "./node/NodeLayer.tsx";
import DragScaleProvider from "../../framework/drag-scale/DragScaleProvider.tsx";
import bluePrintManager from "./manager/BluePrintManager.ts";
import BpCanvasUtil from "./util/BpCanvasUtil.ts";

const BPCanvas: React.FC = () => {

    const containerRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        const {setCanvasTranslate, setCanvasScale, setBpDragContentRef} = bluePrintManager;
        let dragScaleProvider: DragScaleProvider;
        let count = 0;
        const interval = setInterval(() => {
            const dsTarget = document.getElementById("bp-node-content") as HTMLDivElement;
            if (dsTarget && containerRef.current) {
                setBpDragContentRef(dsTarget!);
                dragScaleProvider = new DragScaleProvider({
                    eventContainer: containerRef.current!,
                    dsTarget: dsTarget,
                    dragCallback: (dsData) => {
                        const {position} = dsData;
                        setCanvasTranslate(position);
                        BpCanvasUtil.reRenderAllLine();
                    },
                    dragEndCallback: () => {

                    },
                    scaleCallback: (dsData) => {
                        const {position, scale} = dsData;
                        setCanvasScale(scale);
                        setCanvasTranslate(position);
                        BpCanvasUtil.reRenderAllLine();
                    },
                });
                clearInterval(interval);
            }
            count++;
            if (count > 100) {
                //初始化蓝图拖拽系统，尝试100次后放弃
                console.error("BPCanvas: Failed to find bp-node-content element after 10 tries.");
                clearInterval(interval);
            }
        }, 10)

        return () => {
            bluePrintManager.lineInstances = {};
            dragScaleProvider?.destroy();
        };
    }, [])
    return (
        <div className={'blue-print-canvas'} style={{overflow: "hidden", width: '100%', height: '100%'}}
             ref={containerRef}>
            <Suspense fallback={<Loading/>}>
                <LineLayer/>
                <NodeLayer/>
            </Suspense>
        </div>
    )
}
export default BPCanvas;
