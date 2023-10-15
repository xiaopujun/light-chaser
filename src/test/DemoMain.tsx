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
                {/*<div className={'drag-container'}>*/}
                {/*    <ul>*/}
                {/*        <li draggable={true}>1</li>*/}
                {/*        <li draggable={true}>2</li>*/}
                {/*        <li draggable={true}>3</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                {/*<div className={'canvas-container'}>*/}
                {/*    <div className={'elem'} style={{width: 100, height: 100}}></div>*/}
                {/*</div>*/}

                {/*<div id="container" style={{width: 600, height: 600, backgroundColor: '#464646', position: "relative"}}>*/}
                {/*    <div id="content"*/}
                {/*         style={{*/}
                {/*             width: 600,*/}
                {/*             height: 600,*/}
                {/*             backgroundColor: '#808080',*/}
                {/*             position: 'absolute',*/}
                {/*             transform: 'translate3d(100px, 100px, 0px) scale(1)'*/}
                {/*         }}>*/}
                {/*        <div className="item"*/}
                {/*             style={{*/}
                {/*                 backgroundColor: '#923434',*/}
                {/*                 width: 100,*/}
                {/*                 height: 100,*/}
                {/*                 transform: 'translate3d(50px, 50px, 0px) scale(1)'*/}
                {/*             }}>*/}
                {/*            item1*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </>

        )
    }

}

export default MyComponent;
