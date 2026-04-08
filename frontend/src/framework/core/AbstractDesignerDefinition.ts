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

import {AbstractDefinition, MenuToConfigMappingType} from "./AbstractDefinition.ts";
import AbstractController from "./AbstractController.ts";
import AbstractDesignerController from "./AbstractDesignerController.ts";
import {MenuInfo} from "../../designer/right/MenuType.ts";
import {ColorFilter, Data, Optimize, SettingOne, Theme} from "@icon-park/react";
import {lazy} from "react";

const AnimationConfig = lazy(() => import("../../comps/common-component/animation-config/AnimationConfig.tsx"));
const ThemeConfig = lazy(() => import("../../comps/common-component/theme-config/ThemeConfig.tsx"));
const BaseInfo = lazy(() => import("../../comps/common-component/base-info/BaseInfo.tsx"));
const DataConfig = lazy(() => import("../../comps/common-component/data-config/DataConfig.tsx"));
const FilterConfig = lazy(() => import("../../comps/common-component/filter-config/FilterConfig.tsx"));


export default abstract class AbstractDesignerDefinition<C extends AbstractController = AbstractDesignerController, P = any> extends AbstractDefinition<C, P> {

    getMenuList(): Array<MenuInfo> {
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

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            filter: FilterConfig
        };
    }
}