import React, {useEffect} from "react";
import DragScaleProvider from "../../framework/drag-scale/DragScaleProvider";


export interface BPDragScaleContainerContainerProps {
    children?: React.ReactNode;
}

export const BPDragScaleContainer: React.FC<BPDragScaleContainerContainerProps> = (props) => {
    const {children} = props;
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (container && content) {
            const dragScaleProvider = new DragScaleProvider({
                container,
                content,
                posOffset: {x: 70, y: 40}
            });
            return () => {
                dragScaleProvider.destroy();
            }
        }
    }, []);
    return (
        <div className={'bp-ds-container'} ref={containerRef} style={{
            overflow: "hidden",
            height: 600,
            width: 1920,
            backgroundColor: '#2d2d2d'
        }}>
            <div className={'bp-ds-content'} ref={contentRef}
                 style={{width: 500, height: 500, background: '#555555'}}>
                {children}
            </div>
        </div>
    )
}
