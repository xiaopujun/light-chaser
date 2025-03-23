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

import './ContextMenu.less';

export interface IContextMenuItem {
    name: string;
    icon: any;
    onClick: (...args: unknown[]) => void;
}

export interface ContextMenuProps {
    menus: IContextMenuItem[];
    visible: boolean;
    position: [number, number];
}

export default function ContextMenu(props: ContextMenuProps) {
    const {menus, visible, position} = props;

    const calculateMenuSize = (menuCount: number) => {
        const menuHeight = 33;
        return [130, menuCount * menuHeight];
    }
    const buildMenuList = () => {
        const menuListDom = [];
        for (let i = 0; i < menus.length; i++) {
            const menuItem = menus[i];
            const Icon = menuItem.icon;
            menuListDom.push(
                <div key={i + ''} className={'menu-item'} onClick={menuItem.onClick}>
                    <label><Icon/></label>
                    <span>{menuItem.name}</span>
                </div>
            )
        }
        return menuListDom;
    }
    const calculatePosition = (offsetW: number, offsetY: number) => {
        const [x, y] = position;
        const {innerWidth, innerHeight} = window;
        let left = x;
        let top = y;
        if (x + offsetW > innerWidth)
            left = innerWidth - offsetW;
        if (y + offsetY > innerHeight)
            top = innerHeight - offsetY;
        return [left, top];
    }

    const [offsetW, offsetH] = calculateMenuSize(menus.length);
    const _position = calculatePosition(offsetW, offsetH);

    return (
        <>
            {visible &&
                <div className={'context-menu'} style={{
                    position: 'fixed',
                    top: _position[1],
                    left: _position[0]
                }}>
                    {buildMenuList()}
                </div>}
        </>
    );
}