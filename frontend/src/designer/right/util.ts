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

import {MenuInfo} from "./MenuType";
import {ColorFilter, Data, Deeplink, Optimize, SettingOne, Theme} from "@icon-park/react";

export const getDefaultMenuList = (): Array<MenuInfo> => {
    return [
        {
            icon: SettingOne,
            name: '基础',
            key: 'base',
        },
        {
            icon: Optimize,
            name: '样式',
            key: 'style',
        },
        {
            icon: Data,
            name: '数据',
            key: 'data',
        },
        {
            icon: Deeplink,
            name: '映射',
            key: 'mapping',
        },
        {
            icon: ColorFilter,
            name: '滤镜',
            key: 'filter',
        },
        // {
        //     icon: VideoCameraFilled,
        //     name: '动画',
        //     key: 'animation',
        // },
        {
            icon: Theme,
            name: '主题',
            key: 'theme',
        }
    ];
}