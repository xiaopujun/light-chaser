import React, {Component} from 'react';
import '../style/LcConfigMenus.less';
import {MenuInfo} from "../../types/MenuType";
import rightStore from "./RightStore";
import {observer} from "mobx-react";

interface LcConfigMenusProps {
    onChange?: (menu: string) => void;
}

class MenuList extends Component<LcConfigMenusProps | any> {

    constructor(props: any) {
        super(props);
    }

    menuChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e.currentTarget.id);
    }

    buildMenuList = () => {
        const {menus} = rightStore;
        return menus.map((item: MenuInfo) => {
            const Icon: any = item.icon;
            return (
                <div className={'menu-item'} key={item.key} id={item.key} onClick={this.menuChange}>
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

export default observer(MenuList);