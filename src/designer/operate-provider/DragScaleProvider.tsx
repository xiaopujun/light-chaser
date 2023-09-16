import React, {Component} from 'react';
import designerStore from "../store/DesignerStore";
import {observer} from "mobx-react";
import CanvasDragger from "./drag/CanvasDragger";

export interface DragScaleProviderProps {
    onDoubleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

class DragScaleProvider extends Component<DragScaleProviderProps> {

    //画布x坐标（画布拖拽缩放共用）
    public static x: number = 0;
    //画布y坐标（画布拖拽缩放共用）
    public static y: number = 0;
    //画布x偏移量（相对于屏幕）
    public static offsetX: number = 80;
    //画布y偏移量（相对于屏幕）
    public static offsetY: number = 70;
    //画布拖拽缩放容器dom元素引用（画布拖拽缩放共用）
    public static providerRef: HTMLDivElement | null = null;

    dragger: CanvasDragger | null = null;

    componentDidMount() {
        //初始化画布位置
        DragScaleProvider.providerRef!.style.transform = 'translate3d(' + DragScaleProvider.x + 'px, ' + DragScaleProvider.y + 'px, 0) scale(1)';
        //初始化画布拖拽器
        this.dragger = new CanvasDragger(DragScaleProvider.providerRef);
        //缩放由快捷键触发（不在此处注册）
    }

    componentWillUnmount() {
        if (this.dragger)
            this.dragger.destroy();
    }

    render() {
        const {canvasConfig} = designerStore!;
        return (
            <div style={{
                overflow: "hidden",
                height: window.innerHeight - 90,
                width: window.innerWidth - 95,
                backgroundColor: '#434343'
            }}>
                <div ref={ref => DragScaleProvider.providerRef = ref}
                     onDoubleClick={this.props.onDoubleClick}
                     className={'lc-drag-scale-provider lc-canvas-dom'}
                     style={{width: canvasConfig?.width, height: canvasConfig?.height, background: 'black'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default observer(DragScaleProvider);
