import React, {Component} from 'react';
import Scaler from "../event-operate/Scaler";
import Dragger from "../event-operate/Dragger";

interface DragScaleProviderProps {
    containerWidth?: number;
    containerHeight?: number;
    contentWidth?: number;
    contentHeight?: number;
    changeScale?: (scale: number) => void;
}

class DragScaleProvider extends Component<DragScaleProviderProps> {

    config: any = {
        contentWidth: 1920,
        contentHeight: 1080,
        x: 0,
        y: 0,
        scale: 1,
    }

    componentDidMount() {
        this.config.contentWidth = this.props.contentWidth || 1920;
        this.config.contentHeight = this.props.contentHeight || 1080;
        // 获取dom
        const container: any = document.getElementById('lc-drag-scale-container');
        const content: any = document.getElementById('lc-drag-scale-content');
        new Scaler(container, content, this.config.contentWidth, this.config.contentHeight, 0.1, 10);
        new Dragger(content);
    }

    changeScale = (scale: number) => {
        const {changeScale} = this.props;
        changeScale && changeScale(scale);
    }


    render() {
        const {contentHeight, contentWidth, containerHeight, containerWidth} = this.props;
        return (
            <div id={'lc-drag-scale-container'} style={{
                overflow: "hidden",
                height: containerHeight,
                width: containerWidth,
                backgroundColor: '#434343'
            }}>
                <div id={'lc-drag-scale-content'}
                     style={{width: contentWidth, height: contentHeight}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DragScaleProvider;