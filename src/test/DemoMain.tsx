import React from 'react';
import {observer} from "mobx-react";
import ColorPicker from "../ui/color-picker/ColorPicker";
import './DemoMain.less';

class MyComponent extends React.Component {


    componentDidMount() {

    }

    render() {
        // const {addNodes} = bpStore;
        return (
            <div style={{padding: 10}}>
                <ColorPicker label={'颜色'}/>
            </div>

        )
    }

}

export default observer(MyComponent);
