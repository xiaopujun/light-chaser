/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */
import React, {Component, ComponentType} from 'react';
import './MenuList.less';
import {MenuInfo} from "./MenuType";
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import {Info} from "@icon-park/react";
import {IIconProps} from "@icon-park/react/lib/runtime";

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
            return <div className="empty-tip">
                <Info theme="filled" className="empty-icon"/>
                双击组件激活...
            </div>
        return menus.map((item: MenuInfo) => {
            const Icon = item.icon as ComponentType<IIconProps>;
            return (
                <div
                    className={`menu-item ${activeMenu === item.key ? "menu-item-active" : ""}`}
                    key={item.key}
                    id={item.key}
                    onClick={this.menuChange}
                >
                    <div className="item-icon">
                        <Icon theme="filled"/>
                    </div>
                    <div className="item-content">{item.name}</div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="lc-config-menu">
                <div className="menu-list">
                    {this.buildMenuList()}
                </div>
            </div>
        );
    }
}

export default observer(MenuList);