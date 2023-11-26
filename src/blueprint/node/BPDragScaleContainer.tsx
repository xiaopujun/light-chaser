import React, {useEffect} from "react";
import DragScaleProvider from "../../framework/drag-scale/DragScaleProvider";
import bpStore from "../store/BPStore";
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
        const {canvasOffset, setCanvasTranslate, setCanvasScale, setBpDragContentRef} = bpStore;
        const container = containerRef.current;
        const content = contentRef.current;
        setBpDragContentRef(content!);
        if (container && content) {
            const dragScaleProvider = new DragScaleProvider({
                container,
                content,
                posOffset: canvasOffset,
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
