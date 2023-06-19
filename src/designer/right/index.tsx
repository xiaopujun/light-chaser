import React, {Component} from 'react';
import MenuList from "./MenuList";
import ConfigContent from "./ConfigContent";
import rightStore from "./RightStore";
import {observer} from "mobx-react";

class Right extends Component {

    render() {
        const {contentVisible} = rightStore;
        return (
            <>
                <MenuList/>
                {contentVisible && <ConfigContent/>}
            </>
        );
    }
}

export default observer(Right);