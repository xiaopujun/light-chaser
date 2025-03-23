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

import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import fourAngleGlowBorderImg from './four-angle-glow-border.png';
import {FourAngleGlowBorderController, FourAngleGlowProps} from "./FourAngleGlowBorderController";
import {FourAngleGlowBorderConfig} from "./FourAngleGlowBorderConfig";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


export default class FourAngleGlowBorderDefinition extends AbstractDesignerDefinition<FourAngleGlowBorderController, FourAngleGlowProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "四角辉光边框",
            compKey: "FourAngleGlowBorder",
            categorize: "ornament",
        };
    }

    getChartImg(): string | null {
        return fourAngleGlowBorderImg;
    }

    getController(): ClazzTemplate<FourAngleGlowBorderController> | null {
        return FourAngleGlowBorderController;
    }

    getInitConfig(): FourAngleGlowProps {
        return {
            base: {
                id: "",
                name: '基础色块',
                type: 'BaseColorBlock',
            },
            style: {
                color: '#34e4ff',
                width: 2,
                radius: 4,
                length: 10,
            },
            filter: {
                enable: false,
                blur: 0,
                brightness: 1,
                contrast: 1,
                opacity: 1,
                saturate: 1,
                hueRotate: 0
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: FourAngleGlowBorderConfig,
            filter:FilterConfig
        };
    }


    getEventList(): EventInfo[] {
        return [
            ...super.getEventList(),
            {
                id: "click",
                name: "点击时",
            }
        ]
    }
}