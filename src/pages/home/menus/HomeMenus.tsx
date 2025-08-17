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

import {useLocation, useNavigate} from "react-router-dom";
import {memo} from "react";
import {Data, NetworkDrive, System} from "@icon-park/react";
import {Menu} from "antd";
import {MenuItemType} from "antd/es/menu/interface";


const getMenus = () => {
    const baseMenus: MenuItemType[] = [
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
    const changeMenu = (menu: MenuItemType) => {
        navigate(`${menu.key}`);
    }
    const {pathname} = location;
    const currentMenu = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
    return (
        <div className={'lc-home-menus'}>
            <Menu onClick={changeMenu}
                  style={{width: 220}}
                  defaultSelectedKeys={[currentMenu]}
                  mode="inline"
                  items={getMenus()}
            />
        </div>
    );
})