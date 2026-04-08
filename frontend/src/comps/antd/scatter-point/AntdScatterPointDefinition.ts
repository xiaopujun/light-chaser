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

import scatterPoint from "./scatter-point.png";
import AbstractScatterDefinition from "../../antd-common/scatter/AbstractScatterDefinition";
import {AntdScatterProps} from "../../antd-common/scatter/AntdCommonScatterController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdScatterPointDefinition extends AbstractScatterDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd散点图",
            compKey: "AntdScatterPoint",
            categorize: "chart",
            subCategorize: "scatter",
        };
    }

    getChartImg(): string {
        return scatterPoint;
    }

    getInitConfig(): AntdScatterProps {
        const data = [
            {
                "x": 1,
                "y": 23,
                "type": "one",
            },
            {
                "x": 2,
                "y": 15,
                "type": "two",
            },
            {
                "x": 3,
                "y": 17,
                "type": "three",
            },
            {
                "x": 4,
                "y": 48,
                "type": "four",
            },
            {
                "x": 5,
                "y": 8,
                "type": "five",
            },
        ];
        return {
            base: {
                id: "",
                name: 'Antd散点图',
                type: 'AntdScatterPoint',
            },
            style: {
                data,
                xField: "x",
                yField: "y",
                colorField: "type",
                sizeField: "y",
                size: 17,
                shape: "circle",
                pointStyle: {
                    fillOpacity: 1,
                    lineWidth: 0
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#ffffff",
                            fontSize: 12
                        }
                    },
                    line: {
                        style: {
                            stroke: "#a4a4a470",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                    tickCount: 3
                },
                yAxis: {
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
                    position: "left",
                    title: null,
                    tickCount: 4
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
                supportCSSTransform: true,
                animation: {
                    appear: {
                        animation: "fade-in",
                        duration: 3000
                    }
                },
                color: [
                    "#00b7ffff",
                    "#006d98ff"
                ]
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdScatterPointDefinition;
