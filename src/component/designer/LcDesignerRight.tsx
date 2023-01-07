import React, {Component} from 'react';
import './style/LcDesignerRight.less';
import LcConfigMenus from "./LcConfigMenus";
import LcConfigContent from "./LcConfigContent";

class LcDesignerRight extends Component<any> {

    state = {
        activeMenu: '',
        configVisible: false
    }

    changeMenu = (menu: string) => this.setState({activeMenu: menu, configVisible: true})

    configVisibleChanged = (visible: boolean) => this.setState({configVisible: visible})

    render() {
        const {activeMenu, configVisible} = this.state;
        return (
            <>
                <LcConfigMenus {...this.props} onChange={this.changeMenu}/>
                <LcConfigContent visible={configVisible} onClose={this.configVisibleChanged}
                                 activeMenu={activeMenu} {...this.props}/>
            </>
        );
    }
}

export default LcDesignerRight;