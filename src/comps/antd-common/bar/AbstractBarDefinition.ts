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

import React from "react";
import {MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import AntdCommonBarController, {AntdBarProps} from "../../antd-common/bar/AntdCommonBarController";
import {AntdCommonDefinition} from "../AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdBarCommonStyleConfig = React.lazy(() => import("./AntdBarCommonConfig").then((module) => ({default: module.AntdBarCommonStyleConfig})));
const AntdBarFieldMapping = React.lazy(() => import("./AntdBarCommonConfig").then((module) => ({default: module.AntdBarFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));

abstract class AbstractBarDefinition extends AntdCommonDefinition<AntdCommonBarController, AntdBarProps> {

    getController(): ClazzTemplate<AntdCommonBarController> | null {
        return AntdCommonBarController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdBarCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdBarFieldMapping,
            filter: FilterConfig,
        };
    }
}

export default AbstractBarDefinition;
