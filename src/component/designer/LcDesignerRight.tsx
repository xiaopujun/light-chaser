import React, {Component} from 'react';
import './style/LcDesignerRight.less';
import LcConfigMenus from "./LcConfigMenus";
import LcConfigContent from "./LcConfigContent";

class LcDesignerRight extends Component<any> {

    state = {
        activeMenu: ''
    }

    changeMenu = (menu: string) => this.setState({activeMenu: menu})

    render() {
        const {activeMenu} = this.state;
        return (
            <>
                <LcConfigMenus onChange={this.changeMenu}/>
                <LcConfigContent activeMenu={activeMenu} {...this.props}/>
            </>
        );
    }
}

export default LcDesignerRight;