import React, {Component} from 'react';
import '../style/LcConfigMenus.less';
import {MenuInfo} from "../../framework/types/MenuType";
import rightStore from "./RightStore";
import {observer} from "mobx-react";

interface LcConfigMenusProps {
    onChange?: (menu: string) => void;
}

class MenuList extends Component<LcConfigMenusProps | any> {

    menuChange = (e: any) => {
        const {setActiveMenu, setContentVisible} = rightStore;
        setActiveMenu && setActiveMenu(e.currentTarget.id);
        setContentVisible && setContentVisible(true);
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
        console.log('ConfigMenus render');
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