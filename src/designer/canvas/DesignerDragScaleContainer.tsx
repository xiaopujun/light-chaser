import React, {useEffect} from "react";
import DragScaleProvider from "../../framework/drag-scale/DragScaleProvider";
import designerStore from "../store/DesignerStore";
import eventManager from "../operate-provider/core/EventManager";
import eventOperateStore from "../operate-provider/EventOperateStore";

export interface DesignerDragScaleContainerProps {
    children?: React.ReactNode;
    onDoubleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const DesignerDragScaleContainer: React.FC<DesignerDragScaleContainerProps> = (props) => {
    const {children, onDoubleClick} = props;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const {canvasConfig} = designerStore!;
    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (container && content) {
            const dragScaleProvider = new DragScaleProvider({
                container,
                content,
                posOffset: {x: 80, y: 70},
                scaleCallback: (scale, ratio, e) => {
                    const {setScale, setRatio} = eventOperateStore;
                    setScale(scale);
                    setRatio(ratio);
                    eventManager.emit('wheel', e);
                }
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
            backgroundColor: '#434343'
        }}>
            <div className={'designer-ds-content lc-drag-scale-provider'} ref={contentRef}
                 onDoubleClick={onDoubleClick}
                 style={{width: canvasConfig?.width, height: canvasConfig?.height, background: '#1c1c1c'}}>
                {children}
            </div>
        </div>
    )
}
