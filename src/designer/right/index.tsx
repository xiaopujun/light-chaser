import React, {Component} from 'react';
import '../style/LcDesignerRight.less';
import MenuList from "./MenuList";
import LcConfigContent from "./ConfigContent";

class Right extends Component {

    render() {
        return (
            <>
                <MenuList/>
                <LcConfigContent/>
            </>
        );
    }
}

export default Right;