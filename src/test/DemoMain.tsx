import React from 'react';
import {observer} from "mobx-react";
import './DemoMain.less';
import {Control} from "../json-schema/SchemaTypes";
import {LCGUI} from "../json-schema/LCGUI";
import {FrameLayout} from "../ui/frame-layout/FrameLayout";


class MyComponent extends React.Component {

    render() {
        return (
            <FrameLayout header={'2222'} footer={'23'} left={<div style={{width: 150}}>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>2ss2</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>2dd2</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
                <div>22dd</div>
                <div>22</div>
                <div>22</div>
                <div>22</div>
            </div>} right={'right'} content={'content'}/>
        )
    }

}

export default observer(MyComponent);
