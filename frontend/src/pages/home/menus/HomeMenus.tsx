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

import './HomeMenus.less'
import {useLocation, useNavigate} from "react-router-dom";
import {memo} from "react";
import {Brain, DashboardOne, Data, NetworkDrive, System} from "@icon-park/react";
import {Menu, type MenuProps} from "antd";
import {MenuItemType} from "antd/es/menu/interface";


const getMenus = () => {
    const baseMenus: MenuItemType[] = [
        {
            key: 'console',
            icon: <DashboardOne size={16}/>,
            label: '控制台'
        },
        {
            key: 'projects',
            icon: <NetworkDrive size={16}/>,
            label: '项目列表'
        },
        {
            key: 'datasource',
            icon: <Data size={16}/>,
            label: '数据库管理'
        },
        {
            key: 'ai-model',
            icon: <Brain size={16}/>,
            label: 'AI 模型'
        },
        {
            key: 'more',
            icon: <System size={16}/>,
            label: '更多'
        },
    ]
    return baseMenus;
}

export const HomeMenus = memo(() => {

    const navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;
    const currentMenu = pathname === '/home'
        ? 'console'
        : pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);

    const navigateWithTransition = (target: string) => {
        if (target === currentMenu) return;
        window.dispatchEvent(new CustomEvent('lc-home-route-leave'));
        window.setTimeout(() => navigate(target), 140);
    };

    const changeMenu: MenuProps['onClick'] = (menu) => {
        navigateWithTransition(`${menu.key}`);
    };

    return (
        <div className={'lc-home-menus'}>
            <div className="menus-container">
                <Menu onClick={changeMenu}
                      style={{width: '100%'}}
                      defaultSelectedKeys={[currentMenu]}
                      selectedKeys={[currentMenu]}
                      mode="inline"
                      items={getMenus()}
                />
            </div>
            <div className="home-edition">
                <div className="home-edition-label">Open Source Edition</div>
                <div className="home-edition-value">LIGHT CHASER</div>
                <div className="home-edition-note">Visual design workspace</div>
            </div>
        </div>
    );
})
