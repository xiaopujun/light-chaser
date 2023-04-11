import React, {Component} from 'react';
import '../../style/LcConfigMenus.less';
import menuStore from "./MenuStore";
import {MenuInfo} from "./AbstractMenu";

interface LcConfigMenusProps {
    onChange?: (menu: string) => void;
}

class MenuList extends Component<LcConfigMenusProps | any> {

    constructor(props: any) {
        super(props);
        const {doInit} = menuStore;
        doInit && doInit();
    }

    menuChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e.currentTarget.id);
    }

    buildMenuList = () => {
        const {menus} = menuStore;
        return menus.map((item: MenuInfo) => {
            const Icon = item.icon;
            return (
                <div className={'menu-item'} id={item.key} onClick={this.menuChange}>
                    <div className={'item-icon'}><Icon/></div>
                    <div className={'item-content'}>{item.name}</div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className={'lc-config-menu'}>
                <div className={'menu-list'}>
                    {this.buildMenuList()}
                </div>
            </div>
        );
    }
}

export default MenuList;