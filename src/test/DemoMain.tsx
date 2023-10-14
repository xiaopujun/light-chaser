import React from 'react';
import './Demo.less'
import DragScaleProvider from "../framework/drag-scale/DragScaleProvider";
import {BPHeader} from "../blueprint/header/BPHeader";
import {BPFooter} from "../blueprint/footer/BPFooter";
import {BPLeft} from "../blueprint/left/BPLeft";
import {BPRight} from "../blueprint/right/BPRight";
import {BPCanvas} from "../blueprint/BPCanvas";
import {FrameLayout} from "../ui/frame-layout/FrameLayout";


class MyComponent extends React.Component {

    container: HTMLDivElement | null = null;
    content: HTMLDivElement | null = null;

    componentDidMount() {
        new DragScaleProvider({
            container: this.container,
            content: this.content,
            posOffset: {x: 0, y: 100},
        });
    }

    render() {
        return (
            <>
                {/*<div style={{width: '100%', height: 100}}></div>*/}
                {/*<div className={'container'} ref={ref => this.container = ref}*/}
                {/*     style={{*/}
                {/*         width: 1920,*/}
                {/*         height: 700,*/}
                {/*         backgroundColor: 'black',*/}
                {/*         overflow: 'hidden',*/}
                {/*         position: 'relative'*/}
                {/*     }}>*/}
                {/*    <div className={'content'} ref={ref => this.content = ref}*/}
                {/*         style={{width: 100, height: 100, backgroundColor: '#205175'}}>内容*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<BPCanvas/>*/}
                <FrameLayout header={<BPHeader/>}
                             left={<BPLeft/>}
                             content={<BPCanvas/>}
                             footer={<BPFooter/>}
                             right={<BPRight/>}
                />
            </>

        )
    }

}

export default MyComponent;
