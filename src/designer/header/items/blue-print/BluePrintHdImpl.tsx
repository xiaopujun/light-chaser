import React from "react";
import {FrameLayout} from "../../../../ui/frame-layout/FrameLayout";
import {BPHeader} from "../../../../blueprint/header/BPHeader";
import {BPFooter} from "../../../../blueprint/footer/BPFooter";
import {BPLeft} from "../../../../blueprint/left/BPLeft";
import {BPRight} from "../../../../blueprint/right/BPRight";
import {BPCanvas} from "../../../../blueprint/BPCanvas";
import ReactDOM from "react-dom";

export const BluePrintHdImpl: React.FC = () => {
    return ReactDOM.createPortal(<div style={{position: 'relative', top: -window.innerHeight, zIndex: 2}}>
        <FrameLayout header={<BPHeader/>}
                     footer={<BPFooter/>}
                     left={<BPLeft/>}
                     right={<BPRight/>}
                     content={<BPCanvas/>}/>
    </div>, document.body)
}
