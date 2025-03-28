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
                maxColumnWidth: 8,
                supportCSSTransform: true,
                color: ["#00dbffff"],
                columnStyle: {
                    fill: undefined,
                    radius: 0,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#afafafff",
                            fontSize: 10,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#a8a8a8ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#9898987a",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null,
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#a6a6a6ff",
                            fontSize: 10,
                        },
                    },
                },
                animation: {
                    appear: {
                        animation: "scale-in-y",
                        duration: 3000,
                    },
                },
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdBaseColumnDefinition;
