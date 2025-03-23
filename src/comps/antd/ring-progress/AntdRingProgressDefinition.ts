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
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import AntdRingProgressController, {AntdRingProgressProps} from "./AntdRingProgressController";
import ringProgressImg from './ring-progress.png';
import {AntdCommonDefinition} from "../../antd-common/AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));
const AntdRingProgressStyleConfig = React.lazy(() => import("./AntdRingProgressConfig").then((module) => ({default: module.AntdRingProgressStyleConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));


class AntdRingProgressDefinition extends AntdCommonDefinition<AntdRingProgressController, AntdRingProgressProps> {

    getController(): ClazzTemplate<AntdRingProgressController> | null {
        return AntdRingProgressController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList().filter((menuInfo) => menuInfo.key !== "mapping");
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdRingProgressStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd迷你环图",
            compKey: "AntdRingProgress",
            categorize: "chart",
            subCategorize: "progress",
        };
    }

    getChartImg(): string | null {
        return ringProgressImg;
    }

    getInitConfig(): AntdRingProgressProps {
        return {
            base: {
                id: "",
                name: 'Antd迷你环图',
                type: 'AntdRingProgress',
            },
            style: {
                percent: 0.7,
                color: [
                    "#3cc2f8bd",
                    "#66d2ff3e"
                ],
                statistic: {
                    content: {
                        style: {
                            fill: "#fff",
                            fontSize: '24',
                            fontWeight: 900,
                            color: "#57c6ff"
                        },
                        offsetY: 7,
                        offsetX: 0
                    },
                    title: {
                        style: {
                            fontSize: '21',
                            fontWeight: 900,
                            color: "#6ad1ff"
                        },
                        content: "指标1",
                        offsetY: -11
                    }
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000
                    }
                },
                progressStyle: {}
            },
            data: {
                sourceType: 'static',
                staticData: 0.7,
            },
        };
    }
}

export default AntdRingProgressDefinition;
