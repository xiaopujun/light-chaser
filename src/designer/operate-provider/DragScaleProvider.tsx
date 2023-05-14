import React, {Component} from 'react';
import Scaler from "./scale/Scaler";
import Dragger from "./drag/Dragger";

interface DragScaleProviderProps {
    containerWidth?: number;
    containerHeight?: number;
    contentWidth?: number;
    contentHeight?: number;
}

class DragScaleProvider extends Component<DragScaleProviderProps> {

    content: any = null;

    componentDidMount() {
        let contentWidth = this.props.contentWidth || 1920;
        let contentHeight = this.props.contentHeight || 1080;
        new Scaler(this.content, contentWidth, contentHeight).init();
        new Dragger(this.content).init();
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