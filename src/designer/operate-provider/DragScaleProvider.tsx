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
    scaler: any = null;
    dragger: any = null;

    componentDidMount() {
        this.scaler = new Scaler(this.content, 80, 70);
        this.dragger = new Dragger(this.content);
        this.scaler.init();
        this.dragger.init();
    }

    componentWillUnmount() {
        this.scaler.destroy();
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