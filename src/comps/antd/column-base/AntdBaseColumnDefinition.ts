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

import baseColumnImg from "./base-column.png";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumnController";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdBaseColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础柱状图",
            compKey: "AntdBaseColumn",
            categorize: "chart",
            subCategorize: "column",
        };
    }

    getChartImg(): string {
        return baseColumnImg;
    }

    getInitConfig(): AntdColumnProps {
        const data = [
            {
                name: "1951 年",
                value: 48
            },
            {
                name: "1952 年",
                value: 52
            },
            {
                name: "1956 年",
                value: 22
            }
        ]
        return {
            base: {
                id: "",
                name: 'Antd基础柱状图',
                type: 'AntdBaseColumn',
            },
            style: {
                data: data,
                xField: "name",
                yField: "value",
                seriesField: "name",
                maxColumnWidth: 18,
                supportCSSTransform: true,
                color: [
                    "l(90) 0:#71aaff 1:#008cff"
                ],
                columnStyle: {
                    radius: 5
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
                            stroke: "#ffffffa3",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null,
                    tickCount: 4
                },
                legend: {
                    position: "top-right",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#f9f5f5",
                            fontSize: 12
                        }
                    },
                    itemSpacing: 3,
                    marker: {
                        spacing: 7
                    }
                },
                animation: {
                    appear: {
                        animation: "scale-in-y",
                        duration: 3000
                    }
                },
                label: {
                    position: "top",
                    style: {
                        fill: "#ffffff"
                    },
                    offsetY: 9
                }
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdBaseColumnDefinition;
