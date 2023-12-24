import React from 'react';
import {observer} from "mobx-react";
import './DemoMain.less';
import {Control} from "../json-schema/SchemaTypes";
import {LCGUI} from "../json-schema/LCGUI";
import {FrameLayout} from "../ui/frame-layout/FrameLayout";


class MyComponent extends React.Component {

    render() {
        return (
            <>
                <div className="wrap">
                    <div className="item"></div>
                    <div className="item"></div>
                </div>
                <div className="wrap1">
                    <div className="item"></div>
                    <div className="item"></div>
                </div>
            </>
        )
    }

}

export default observer(MyComponent);
