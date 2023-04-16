import React, {Component} from 'react';
import '../style/LcDesignerRight.less';
import MenuList from "./MenuList";
import LcConfigContent from "./ConfigContent";

class Index extends Component<any> {

    state = {
        activeMenu: undefined,
        configVisible: false
    }

    changeMenu = (menu: string) => this.setState({activeMenu: menu, configVisible: true})

    configVisibleChanged = (visible: boolean) => this.setState({configVisible: visible})

    render() {
        const {activeMenu, configVisible} = this.state;
        return (
            <>
                <MenuList {...this.props} onChange={this.changeMenu}/>
                <LcConfigContent visible={configVisible} onClose={this.configVisibleChanged}
                                 activeMenu={activeMenu} {...this.props}/>
            </>
        );
    }
}

export default Index;