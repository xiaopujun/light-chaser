import React from 'react';
import './Demo.less'
import {BPCanvas} from "../blueprint/BPCanvas";
import {FrameLayout} from "../ui/frame-layout/FrameLayout";
import {BPHeader} from "../blueprint/header/BPHeader";
import {BPLeft} from "../blueprint/left/BPLeft";
import {BPFooter} from "../blueprint/footer/BPFooter";
import {BPRight} from "../blueprint/right/BPRight";


class MyComponent extends React.Component {


    render() {
        return (
            <FrameLayout header={<BPHeader/>}
                         footer={<BPFooter/>}
                         left={<BPLeft/>}
                         right={<BPRight/>}
                         content={<BPCanvas/>}/>
        )
    }

}

export default MyComponent;
