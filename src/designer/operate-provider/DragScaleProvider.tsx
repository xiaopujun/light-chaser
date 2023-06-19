import React, {Component} from 'react';
import Dragger from "./drag/Dragger";
import coordinate from "./coordinate/Coordinate";
import {scaleConfig} from "./scale/Scaler";
import designerStore from "../store/DesignerStore";
import {observer} from "mobx-react";

interface DragScaleProviderProps {
    containerWidth?: number;
    containerHeight?: number;
    contentWidth?: number;
    contentHeight?: number;
}

class DragScaleProvider extends Component<DragScaleProviderProps> {

    content: any = null;
    dragger: any = null;

    componentDidMount() {
        //配置缩放
        this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(1)';
        scaleConfig.content = this.content;
        scaleConfig.offsetX = 80;
        scaleConfig.offsetY = 70;
        this.dragger = new Dragger(this.content);
        this.dragger.init();
    }

    componentWillUnmount() {
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
                <div ref={ref => this.content = ref}
                     style={{width: canvasConfig?.width, height: canvasConfig?.height}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default observer(DragScaleProvider);
