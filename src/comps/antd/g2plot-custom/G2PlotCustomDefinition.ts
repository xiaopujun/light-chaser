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
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import pieImg from './g2-plot-custom.png';
import G2PlotCustomController, {G2PlotCustomProps} from "./G2PlotCustomController.ts";
import {AntdCommonDefinition} from "../../antd-common/AntdCommonDefinition";
import {Data, Optimize, SettingOne} from "@icon-park/react";

const G2PlotCustomConfig = React.lazy(() => import("./G2PlotCustomConfig.tsx"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

class G2PlotCustomDefinition extends AntdCommonDefinition<G2PlotCustomController, G2PlotCustomProps> {

    getController(): ClazzTemplate<G2PlotCustomController> | null {
        return G2PlotCustomController;
    }

    getMenuList(): Array<MenuInfo> {
        return [
            {
                icon: SettingOne,
                name: '基础',
                key: 'base',
            },
            {
                icon: Optimize,
                name: '自定义',
                key: 'custom',
            },
            {
                icon: Data,
                name: '数据',
                key: 'data',
            }
        ];
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            data: DataConfig,
            custom: G2PlotCustomConfig,
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "G2Plot自定义图表",
            compKey: "G2PlotCustom",
            categorize: "other",
        };
    }

    getChartImg(): string | null {
        return pieImg;
    }

    getInitConfig(): G2PlotCustomProps {

        return {
            base: {
                id: "",
                name: 'G2Plot自定义图表',
                type: 'G2PlotCustom',
            },
            style: {
                customCode: "function renderG2Plot(container, G2Plot, data) {\n" +
                    "    const g2plot = new G2Plot.BidirectionalBar(container, {\n" +
                    "        data: data,\n" +
                    "        layout: 'vertical',\n" +
                    "        xField: 'country',\n" +
                    "        yField: ['2016年耕地总面积', '2016年转基因种植面积'],\n" +
                    "        legend: false,\n" +
                    "        appendPadding: [20, 0],\n" +
                    "        barStyle: {\n" +
                    "            lineWidth: 4\n" +
                    "        },\n" +
                    "        yAxis: {\n" +
                    "            '2016年耕地总面积': {\n" +
                    "                grid: null,\n" +
                    "                label: {\n" +
                    "                    style: {\n" +
                    "                        fill: \"#fff\",\n" +
                    "                        fontSize: 10,\n" +
                    "                    },\n" +
                    "                },\n" +
                    "\n" +
                    "            },\n" +
                    "            '2016年转基因种植面积': {\n" +
                    "                grid: null,\n" +
                    "                label: {\n" +
                    "                    style: {\n" +
                    "                        fill: \"#fff\",\n" +
                    "                        fontSize: 10,\n" +
                    "                    },\n" +
                    "                },\n" +
                    "            },\n" +
                    "        },\n" +
                    "        xAxis: {\n" +
                    "            grid: null,\n" +
                    "            label: {\n" +
                    "                style: {\n" +
                    "                    fill: \"#fff\",\n" +
                    "                    fontSize: 10,\n" +
                    "                },\n" +
                    "            },\n" +
                    "            line: {\n" +
                    "                style: {\n" +
                    "                    stroke: \"#6f6f6f91\",\n" +
                    "                    lineWidth: 1,\n" +
                    "                },\n" +
                    "            },\n" +
                    "            tickLine: null,\n" +
                    "            subTickLine: null,\n" +
                    "            title: null,\n" +
                    "        },\n" +
                    "        label: {\n" +
                    "            position: 'top',\n" +
                    "            style: {\n" +
                    "                fill: '#fff'\n" +
                    "            }\n" +
                    "        },\n" +
                    "    });\n" +
                    "    g2plot.render();\n" +
                    "    return g2plot;\n" +
                    "}",
            },
            data: {
                sourceType: 'static',
                staticData: [
                    {country: '乌拉圭', '2016年耕地总面积': 13.4, '2016年转基因种植面积': 12.3},
                    {country: '巴拉圭', '2016年耕地总面积': 14.4, '2016年转基因种植面积': 6.3},
                    {country: '南非', '2016年耕地总面积': 18.4, '2016年转基因种植面积': 8.3},
                    {country: '巴基斯坦', '2016年耕地总面积': 34.4, '2016年转基因种植面积': 13.8},
                    {country: '阿根廷', '2016年耕地总面积': 44.4, '2016年转基因种植面积': 19.5},
                    {country: '巴西', '2016年耕地总面积': 24.4, '2016年转基因种植面积': 18.8},
                    {country: '加拿大', '2016年耕地总面积': 54.4, '2016年转基因种植面积': 24.7},
                    {country: '中国', '2016年耕地总面积': 104.4, '2016年转基因种植面积': 5.3},
                    {country: '美国', '2016年耕地总面积': 165.2, '2016年转基因种植面积': 72.9},
                ],
            },
        };
    }
}

export default G2PlotCustomDefinition;
