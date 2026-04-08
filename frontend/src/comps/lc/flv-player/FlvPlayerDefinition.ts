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
import FlvPlayerImg from './flv-player.png';
import {FlvPlayerController} from "./FlvPlayerController.ts";
import {FlvPlayerComponentProps} from "./FlvPlayerComponent.tsx";
import {FlvPlayerConfig} from "./FlvPlayerConfig.tsx";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";
import {lazy} from "react";

const BaseInfo = lazy(() => import("../../common-component/base-info/BaseInfo"));
const AnimationConfig = lazy(() => import("../../common-component/animation-config/AnimationConfig.tsx"));
const FilterConfig = lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


export default class FlvPlayerDefinition extends AbstractDesignerDefinition<FlvPlayerController, FlvPlayerComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "FLV视频流",
            compKey: "FlvPlayer",
            categorize: "media",
        };
    }

    getChartImg(): string | null {
        return FlvPlayerImg;
    }

    getController(): ClazzTemplate<FlvPlayerController> | null {
        return FlvPlayerController;
    }

    getInitConfig(): FlvPlayerComponentProps {
        return {
            base: {
                id: "",
                name: 'FLV视频流',
                type: 'FlvPlayer',
            },
            style: {
                url: ''
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
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: FlvPlayerConfig,
            animation: AnimationConfig,
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