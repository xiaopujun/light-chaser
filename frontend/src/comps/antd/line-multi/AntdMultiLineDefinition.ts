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

import multiLineImg from "./multi-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLineController";
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import AntdMultiLineStyleConfig, {AntdMultiLineFieldMapping} from "./AntdMultiLineConfig.tsx";

class AntdMultiLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd多折线图",
            compKey: "AntdMultiLine",
            categorize: "chart",
            subCategorize: "line",
        };
    }

    getChartImg(): string {
        return multiLineImg;
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuToConfigContentMap = super.getMenuToConfigContentMap();
        menuToConfigContentMap!['style'] = AntdMultiLineStyleConfig;
        menuToConfigContentMap!['mapping'] = AntdMultiLineFieldMapping;
        return menuToConfigContentMap;
    }

    getInitConfig(): AntdLineProps {
        const data = [
            {
                year: "2007",
                value: 1706,
                category: "sort1",
            },
            {
                year: "2007",
                value: 448,
                category: "sort2",
            },
            {
                year: "2008",
                value: 1361,
                category: "sort1",
            },
            {
                year: "2008",
                value: 779,
                category: "sort2",
            },
            {
                year: "2009",
                value: 1722,
                category: "sort1",
            },
            {
                year: "2009",
                value: 430,
                category: "sort2",
            },
            {
                year: "2010",
                value: 1626,
                category: "sort1",
            },
            {
                year: "2010",
                value: 555,
                category: "sort2",
            },
        ]

        return {
            base: {
                id: "",
                name: '多折线图',
                type: 'AntdMultiLine',
            },
            style: {
                data: data,
                xField: "year",
                yField: "value",
                seriesField: "category",
                supportCSSTransform: true,
                color: [
                    "l(0) 0:#266bff 1:#af47ff",
                    "l(0) 0:#ff9a6e 1:#ff5e00"
                ],
                point: {
                    color: [
                        "#00a8ff",
                        "#00ffc9"
                    ],
                    size: 0,
                    shape: "circle",
                    style: {
                        stroke: "#00a8ff",
                        lineWidth: 0
                    }
                },
                lineStyle: {
                    lineWidth: 4
                },
                xAxis: {
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
                    position: "bottom",
                    title: null
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#ffffff",
                            fontSize: 12
                        }
                    },
                    line: {
                        style: {
                            stroke: "#adadad75",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null
                },
                smooth: true,
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
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
                },
                label: {
                    position: "middle",
                    style: {
                        fontSize: 8,
                        fill: "#ffffff"
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

export default AntdMultiLineDefinition;
