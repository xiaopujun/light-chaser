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

import stackBarImg from "./stack-bar.png";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBarController";
import AbstractBarDefinition from "../../antd-common/bar/AbstractBarDefinition";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdStackBarDefinition extends AbstractBarDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠条形图",
            compKey: "AntdStackBar",
            categorize: "chart",
            subCategorize: "bar",
        };
    }

    getChartImg(): string {
        return stackBarImg;
    }

    getInitConfig(): AntdBarProps {
        const data = [
            {
                year: '1991',
                value: 300,
                type: 'Lon',
            },
            {
                year: '1992',
                value: 400,
                type: 'Lon',
            },
            {
                year: '1993',
                value: 350,
                type: 'Lon',
            },
            {
                year: '1991',
                value: 300,
                type: 'Bor',
            },
            {
                year: '1992',
                value: 400,
                type: 'Bor',
            },
            {
                year: '1993',
                value: 350,
                type: 'Bor',
            },
        ];
        return {
            base: {
                id: "",
                name: 'Antd堆叠条形图',
                type: 'AntdStackBar',
            },
            style: {
                data: data,
                xField: "value",
                yField: "year",
                seriesField: "type",
                isStack: true,
                maxBarWidth: 15,
                supportCSSTransform: true,
                color: [
                    "l(180) 0:#398fff 1:#62bbff",
                    "l(180) 0:#e62dff 1:#ac40ff"
                ],
                barStyle: {
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
                    line: {
                        style: {
                            stroke: "#b9b9b980",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "right",
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
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null
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
                        animation: "scale-in-x",
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

export default AntdStackBarDefinition;
