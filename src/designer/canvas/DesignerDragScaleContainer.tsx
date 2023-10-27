import React, {useEffect} from "react";
import DragScaleProvider from "../../framework/drag-scale/DragScaleProvider";
import designerStore from "../store/DesignerStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {observer} from "mobx-react";

export interface DesignerDragScaleContainerProps {
    children?: React.ReactNode;
    onDoubleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const DesignerDragScaleContainer: React.FC<DesignerDragScaleContainerProps> = observer((props) => {
    console.log('重新渲染画布')
    const {children, onDoubleClick} = props;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const {canvasConfig} = designerStore!;
    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (container && content) {
            const {setDsContentRef} = eventOperateStore;
            setDsContentRef(content)
            const dragScaleProvider = new DragScaleProvider({
                container,
                content,
                posOffset: {x: 80, y: 70},
                scaleCallback: (dsData) => {
                    const {scale, ratio} = dsData;
                    const {setScale, setRatio, rulerRef} = eventOperateStore;
                    setScale(scale);
                    setRatio(ratio);
                    rulerRef?.ruleWheel(scale);
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
        <div className={'designer-ds-container'} ref={containerRef} style={{
            overflow: "hidden",
            height: window.innerHeight - 90,
            width: window.innerWidth - 95,
            backgroundColor: '#434343',
            position: 'relative'
        }}>
            <div className={'designer-ds-content lc-drag-scale-provider'} ref={contentRef}
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
})
