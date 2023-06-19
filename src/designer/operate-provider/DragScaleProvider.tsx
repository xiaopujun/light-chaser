import React, {Component} from 'react';
import Dragger from "./drag/Dragger";
import coordinate from "./coordinate/Coordinate";
import {scaleConfig} from "./scale/Scale";

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
        const {contentHeight, contentWidth, containerHeight, containerWidth} = this.props;
        return (
            <div style={{
                overflow: "hidden",
                height: containerHeight,
                width: containerWidth,
                backgroundColor: '#434343'
            }}>
                <div ref={ref => this.content = ref}
                     style={{width: contentWidth, height: contentHeight}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DragScaleProvider;
