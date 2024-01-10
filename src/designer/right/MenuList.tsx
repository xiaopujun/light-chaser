import React, {Component} from 'react';
import './MenuList.less';
import {MenuInfo} from "./MenuType";
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import {InfoCircleFilled} from "@ant-design/icons";

interface LcConfigMenusProps {
    onChange?: (menu: string) => void;
}

class MenuList extends Component<LcConfigMenusProps | any> {

    menuChange = (e: React.MouseEvent) => {
        const {setActiveMenu, setContentVisible} = rightStore;
        setActiveMenu && setActiveMenu((e.currentTarget as HTMLElement).id);
        setContentVisible && setContentVisible(true);
    }

    buildMenuList = () => {
        const {menus, activeMenu} = rightStore;
        if (menus.length === 0)
            return <div
                style={{
                    writingMode: 'vertical-rl',
                    color: '#bababa',
                    letterSpacing: '8px',
                    padding: 7,
                    fontSize: 12,
                }}><InfoCircleFilled style={{fontSize: 15, position: "relative", left: 2, marginBottom: 7}}/>双击组件激活...
            </div>
        return menus.map((item: MenuInfo) => {
            const Icon = item.icon as React.ComponentType;
            return (
                <div className={`menu-item ${activeMenu === item.key ? "menu-item-active" : ""}`} key={item.key}
                     id={item.key} onClick={this.menuChange}>
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