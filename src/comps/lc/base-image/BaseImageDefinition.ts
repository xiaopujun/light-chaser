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
import BaseImageController, {BaseImageComponentProps} from "./BaseImageController";
import baseImage from './baseImage.png';
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import {BaseImageStyleConfig} from "./BaseImageConfig";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


export default class BaseImageDefinition extends AbstractDesignerDefinition<BaseImageController, BaseImageComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础图片",
            compKey: "BaseImage",
            categorize: "media",
        };
    }

    getChartImg(): string | null {
        return baseImage;
    }

    getController(): ClazzTemplate<BaseImageController> | null {
        return BaseImageController;
    }

    getInitConfig(): BaseImageComponentProps {
        return {
            base: {
                id: "",
                name: '基础图片',
                type: 'BaseImage',
            },
            style: {
                type: 'online',
                localUrl: '',
                onLineUrl: '',
                opacity: 1,
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
            style: BaseImageStyleConfig,
            filter: FilterConfig
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