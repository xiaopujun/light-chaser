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

import stackColumnImg from "./stack-column.png";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumnController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdStackColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠柱状图",
            compKey: "AntdStackColumn",
            categorize: "chart",
            subCategorize: "column",
        };
    }

    getChartImg(): string {
        return stackColumnImg;
    }

    getInitConfig(): AntdColumnProps {
        const data = [
            {
                year: '1991',
                value: 3,
                type: 'Lon',
            },
            {
                year: '1992',
                value: 4,
                type: 'Lon',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Lon',
            },
            {
                year: '1991',
                value: 3,
                type: 'Bor',
            },
            {
                year: '1992',
                value: 4,
                type: 'Bor',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Bor',
            },
        ];
        return {
            base: {
                id: "",
                name: 'Antd堆叠柱状图',
                type: 'AntdStackColumn',
            },
            style: {
                data: data,
                xField: "year",
                yField: "value",
                seriesField: "type",
                isStack: true,
                maxColumnWidth: 16,
                supportCSSTransform: true,
                color: [
                    "#9000ff",
                    "#298aff"
                ],
                columnStyle: {
                    radius: 6
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
                            fontSize: 14
                        }
                    },
                    line: {
                        style: {
                            stroke: "#9e9e9e75",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null,
                    tickCount: 3
                },
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
                        animation: "scale-in-y",
                        duration: 3000
                    }
                },
                label: {
                    position: "middle",
                    style: {
                        fill: "#ffffff",
                        fontSize: 10
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

export default AntdStackColumnDefinition;
