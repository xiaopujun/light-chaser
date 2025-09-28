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
import pieImg from './pie.png';
import AntdPieController, {AntdPieProps} from "./AntdPieController";
import {AntdCommonDefinition} from "../../antd-common/AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdPieConfig = React.lazy(() => import("./AntdPieStyleConfig"));
const AntdPieFieldMapping = React.lazy(() => import("./AntdPieStyleConfig").then((module) => ({default: module.AntdPieFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

class AntdPieDefinition extends AntdCommonDefinition<AntdPieController, AntdPieProps> {

    getController(): ClazzTemplate<AntdPieController> | null {
        return AntdPieController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdPieConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdPieFieldMapping
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd饼图",
            compKey: "AntdPie",
            categorize: "chart",
            subCategorize: "pie",
        };
    }

    getChartImg(): string | null {
        return pieImg;
    }

    getInitConfig(): AntdPieProps {
        const data = [
            {type: 'sort1', value: 30},
            {type: 'sort2', value: 25},
            {type: 'sort3', value: 20},
            {type: 'sort4', value: 25}
        ];
        return {
            base: {
                id: "",
                name: 'Antd饼图',
                type: 'AntdPie',
            },
            style: {
                data: data,
                supportCSSTransform: true,
                angleField: "value",
                colorField: "type",
                radius: 0.7,
                innerRadius: 0.6,
                startAngle: 0,
                endAngle: 6.283185307179586,
                pieStyle: {
                    stroke: "#fff",
                    lineWidth: 0,
                },
                label: {
                    type: "outer",
                    offset: 27,
                    content: "{name} {percentage}",
                    autoRotate: true,
                    rotate: 0,
                    style: {
                        textAlign: "center",
                        fontSize: 12,
                        fontWeight: 400,
                        fill: "#ffffff",
                        stroke: "#f10d0d"
                    },
                    labelLine: false
                },
                legend: {
                    position: "right",
                    layout: "vertical",
                    itemName: {
                        style: {
                            fill: "#ffffff",
                            fontSize: 14
                        }
                    }
                },
                interactions: [
                    {
                        type: "element-selected"
                    },
                    {
                        type: "element-active"
                    }
                ],
                statistic: {
                    title: {
                        style: {
                            fontSize: '12',
                            color: "#ffffff",
                            fontWeight: 300
                        },
                        content: "总计",
                        offsetY: -6
                    },
                    content: {
                        style: {
                            fontSize: "16px",
                            color: "#ffffff",
                            fontWeight: 400
                        },
                        content: "100",
                        offsetY: 2,
                        offsetX: -2
                    }
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000
                    }
                },
                color: [
                    "l(90) 0:#4ca9ff 1:#0082d9",
                    "l(90) 0:#8f4dff 1:#f0b3fc",
                    "l(90) 0:#ff5e62 1:#ff9966",
                    "l(90) 0:#28f7ac 1:#348ac7"
                ]
            },
            data: {
                sourceType: 'static',
                staticData: data,
            },
        };
    }
}

export default AntdPieDefinition;
