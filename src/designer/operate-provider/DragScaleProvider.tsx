import React, {Component} from 'react';
import {scaleConfig} from "./scale/Scaler";
import designerStore from "../store/DesignerStore";
import {observer} from "mobx-react";
import CanvasDragger from "./drag/CanvasDragger";

class DragScaleProvider extends Component {

    content: any = null;
    dragger: CanvasDragger | null = null;

    componentDidMount() {
        //配置缩放
        this.content.style.transform = 'translate3d(' + CanvasDragger.position.x + 'px, ' + CanvasDragger.position.y + 'px, 0) scale(1)';
        scaleConfig.content = this.content;
        scaleConfig.offsetX = 80;
        scaleConfig.offsetY = 70;
        this.dragger = new CanvasDragger(this.content);
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
                <div ref={ref => this.content = ref} className={'lc-content-scale'}
                     style={{width: canvasConfig?.width, height: canvasConfig?.height}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default observer(DragScaleProvider);
