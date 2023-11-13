import {Component} from 'react';
import MenuList from "./MenuList";
import ConfigContent from "./ConfigContent";
import rightStore from "./RightStore";
import {observer} from "mobx-react";

class Right extends Component {

    render() {
        const {visible} = rightStore;
        return (
            <>
                <MenuList/>
                {visible && <ConfigContent/>}
            </>
        );
    }
}

export default observer(Right);