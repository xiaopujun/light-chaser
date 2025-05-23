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

import percentAreaImg from "./percent-area.png";
import AbstractAreaDefinition from "../../antd-common/area/AbstractAreaDefinition";
import {AntdAreaProps} from "../../antd-common/area/AntdCommonAreaController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdPercentAreaDefinition extends AbstractAreaDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd百分比面积图",
            compKey: "AntdPercentArea",
            categorize: "chart",
            subCategorize: "area",
        };
    }

    getChartImg(): string {
        return percentAreaImg;
    }

    getInitConfig(): AntdAreaProps {
        const data = [
            {
                "country": "Asia",
                "year": "1750",
                "value": 502
            },
            {
                "country": "Asia",
                "year": "1800",
                "value": 635
            },
            {
                "country": "Asia",
                "year": "1850",
                "value": 809
            },
            {
                "country": "Asia",
                "year": "1900",
                "value": 947
            },
            {
                "country": "Asia",
                "year": "1950",
                "value": 1402
            },
            {
                "country": "Asia",
                "year": "1999",
                "value": 3634
            },
            {
                "country": "Asia",
                "year": "2050",
                "value": 5268
            },
            {
                "country": "Africa",
                "year": "1750",
                "value": 106
            },
            {
                "country": "Africa",
                "year": "1800",
                "value": 107
            },
            {
                "country": "Africa",
                "year": "1850",
                "value": 111
            },
            {
                "country": "Africa",
                "year": "1900",
                "value": 133
            },
            {
                "country": "Africa",
                "year": "1950",
                "value": 221
            },
            {
                "country": "Africa",
                "year": "1999",
                "value": 767
            },
            {
                "country": "Africa",
                "year": "2050",
                "value": 1766
            },
            {
                "country": "Europe",
                "year": "1750",
                "value": 163
            },
            {
                "country": "Europe",
                "year": "1800",
                "value": 203
            },
            {
                "country": "Europe",
                "year": "1850",
                "value": 276
            },
            {
                "country": "Europe",
                "year": "1900",
                "value": 408
            },
            {
                "country": "Europe",
                "year": "1950",
                "value": 547
            },
            {
                "country": "Europe",
                "year": "1999",
                "value": 729
            },
            {
                "country": "Europe",
                "year": "2050",
                "value": 628
            }
        ];
        return {
            base: {
                id: "",
                name: '百分比面积图',
                type: 'AntdPercentArea',
            },
            style: {
                data: data,
                xField: "year",
                yField: "value",
                seriesField: "country",
                isPercent: true,
                smooth: true,
                supportCSSTransform: true,
                color: [
                    "l(90) 0:#016eb7 0.42:#016eb700",
                    "l(90) 0:#016eb7 0.53:#016eb700",
                    "l(90) 0:#016eb7 0.72:#016eb700"
                ],
                point: {
                    size: 0,
                    color: [
                        "#4fa3ff67",
                        "#009aff67",
                        "#006d7f67"
                    ],
                    style: {
                        stroke: "#ffffff",
                        lineWidth: 0
                    },
                    shape: "circle"
                },
                line: {
                    style: {
                        lineWidth: 2
                    },
                    color: [
                        "r(0.5,0.5,1) 0.24:#0099ff 1:#005c9936"
                    ]
                },
                areaStyle: {
                    fillOpacity: 1
                },
                xAxis: {
                    position: "bottom",
                    range: [
                        0,
                        1
                    ],
                    grid: null,
                    label: {
                        style: {
                            fill: "#ffffff",
                            fontSize: 10
                        }
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    title: null
                },
                yAxis: {
                    position: "left",
                    grid: null,
                    label: {
                        style: {
                            fill: "#ffffff",
                            fontSize: 12
                        }
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    title: null,
                    tickCount: 4
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#ffffff",
                            fontSize: 12
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
                staticData: data
            },
        };
    }
}

export default AntdPercentAreaDefinition;
