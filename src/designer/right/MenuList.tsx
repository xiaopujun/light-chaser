import React, {Component} from 'react';
import '../style/LcConfigMenus.less';
import {MenuInfo} from "../../types/MenuType";
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import lcDesignerContentStore from "../store/DesignerStore";

interface LcConfigMenusProps {
    onChange?: (menu: string) => void;
}

class MenuList extends Component<LcConfigMenusProps | any> {

    menuChange = (e: any) => {
        const {setActiveMenu} = rightStore;
        setActiveMenu && setActiveMenu(e.currentTarget.id);
    }

    buildMenuList = () => {
        const {activeElem: {id, type}} = lcDesignerContentStore;
        const {configObjs, setMenus}: any = rightStore;
        let menus;
        if (id === -1)
            menus = configObjs['LcBgConfig'].getMenuList();
        else
            menus = configObjs[`${type}Config`].getMenuList();
        setMenus && setMenus(menus);
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