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

import rangeBarImg from "./range-bar.png";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBarController";
import AbstractBarDefinition from "../../antd-common/bar/AbstractBarDefinition";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdRangeBarDefinition extends AbstractBarDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd区间条形图",
            compKey: "AntdRangeBar",
            categorize: "chart",
            subCategorize: "bar",
        };
    }

    getChartImg(): string {
        return rangeBarImg;
    }

    getInitConfig(): AntdBarProps {
        const data = [
            {type: 'sort1', values: [36, 130]},
            {type: 'sort2', values: [60, 95]},
            {type: 'sort3', values: [50, 110]},
            {type: 'sort4', values: [20, 135]},
        ];
        return {
            base: {
                id: "",
                name: 'Antd区间条形图',
                type: 'AntdRangeBar',
            },
            style: {
                data: data,
                xField: "values",
                yField: "type",
                seriesField: "type",
                isRange: true,
                color: ["#2ea4ffff", "#7cdaffff", "#6cc2ffff"],
                barStyle: {
                    radius: 0,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#9c9c9cff",
                            fontSize: 11,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#b9b9b975",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "right",
                    title: null,
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#9c9c9cff",
                            fontSize: 11,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#9e9e9eff",
                            fontSize: 12,
                        },
                    },
                },
                maxBarWidth: 8,
                supportCSSTransform: true,
                animation: {
                    appear: {
                        animation: "scale-in-x",
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

export default AntdRangeBarDefinition;
