import React, {Component} from 'react';
import '../style/LcDesignerRight.less';
import MenuList from "./MenuList";
import LcConfigContent from "./ConfigContent";

class Index extends Component<any> {

    changeMenu = (menu: string) => this.setState({activeMenu: menu, configVisible: true})

    configVisibleChanged = (visible: boolean) => this.setState({configVisible: visible})

    render() {
        return (
            <>
                <MenuList {...this.props} onChange={this.changeMenu}/>
                <LcConfigContent onClose={this.configVisibleChanged}{...this.props}/>
            </>
        );
    }
}

export default Index;