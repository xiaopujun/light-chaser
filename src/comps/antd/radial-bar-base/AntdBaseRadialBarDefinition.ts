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
import baseRadialBarImg from './base-radial-bar.png';
import AntdBaseRadialBarController, {AntdRadialBarProps} from "./AntdBaseRadialBarController.ts";
import {AntdCommonDefinition} from "../../antd-common/AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdRadialBarConfig = React.lazy(() => import("./AntdBaseRadialBarStyleConfig.tsx"));
const AntdRadialBarFieldMapping = React.lazy(() => import("./AntdBaseRadialBarStyleConfig.tsx").then((module) => ({default: module.AntdRadialBarFieldMapping})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

class AntdBaseRadialBarDefinition extends AntdCommonDefinition<AntdBaseRadialBarController, AntdRadialBarProps> {

    getController(): ClazzTemplate<AntdBaseRadialBarController> | null {
        return AntdBaseRadialBarController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdRadialBarConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdRadialBarFieldMapping
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础玉珏图",
            compKey: "AntdBaseRadialBar",
            categorize: "chart",
            subCategorize: 'radial'
        };
    }

    getChartImg(): string | null {
        return baseRadialBarImg;
    }

    getInitConfig(): AntdRadialBarProps {
        const data = [
            {name: 'X6', star: 297},
            {name: 'G', star: 506},
            {name: 'AVA', star: 805},
            {name: 'G2Plot', star: 1478},
            {name: 'L7', star: 2029},
            {name: 'G6', star: 7100},
            {name: 'F2', star: 7346},
            {name: 'G2', star: 10178},
        ];
        return {
            base: {
                id: "",
                name: 'Antd基础玉珏图',
                type: 'AntdBaseRadialBar',
            },
            style: {
                data,
                xField: "name",
                yField: "star",
                maxAngle: 270,
                startAngle: -1.5707963267948966,
                endAngle: 4.71238898038469,
                radius: 1,
                innerRadius: 0.1,
                colorField: "name",
                type: "",
                supportCSSTransform: true,
                maxBarWidth: 11,
                color: [
                    "l(90) 0:#3ea2ff 1:#007bff",
                    "l(90) 0:#a362ff 1:#c375ff"
                ],
                barStyle: {
                    lineCap: "round"
                },
                xAxis: {
                    label: {
                        style: {
                            fill: "#ffffff",
                            fontSize: 14
                        }
                    }
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000
                    }
                }
            },
            data: {
                sourceType: 'static',
                staticData: data,
            },
        };
    }
}

export default AntdBaseRadialBarDefinition;
