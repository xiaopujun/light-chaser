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
import baseIframeImg from './base-iframe.png';
import {BaseIframeController} from "./BaseIframeController";
import {BaseIframeComponentProps} from "./BaseIframeComponent";
import {BaseIframeStyleConfig} from "./BaseIframeConfig";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


export default class BaseIframeDefinition extends AbstractDesignerDefinition<BaseIframeController, BaseIframeComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础iframe",
            compKey: "BaseIframe",
            categorize: "web",
        };
    }

    getChartImg(): string | null {
        return baseIframeImg;
    }

    getController(): ClazzTemplate<BaseIframeController> | null {
        return BaseIframeController;
    }

    getInitConfig(): BaseIframeComponentProps {
        return {
            base: {
                id: "",
                name: '基础iframe',
                type: 'BaseIframe',
            },
            style: {
                src: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((menu) => menu.key !== 'data' && menu.key !== 'theme');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: BaseIframeStyleConfig,
            filter: FilterConfig
        };
    }

    getEventList(): EventInfo[] {
        return [
            ...super.getEventList(),
            {
                id: "load",
                name: "iframe加载完成时",
            }
        ]
    }
}