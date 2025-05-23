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

import groupBarImg from "./group-bar.png";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBarController";
import AbstractBarDefinition from "../../antd-common/bar/AbstractBarDefinition";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdGroupBarDefinition extends AbstractBarDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd分组条形图",
            compKey: "AntdGroupBar",
            categorize: "chart",
            subCategorize: "bar",
        };
    }

    getChartImg(): string {
        return groupBarImg;
    }

    getInitConfig(): AntdBarProps {
        const data = [
            {
                label: 'Mon.',
                type: 'series1',
                value: 2800,
            },
            {
                label: 'Mon.',
                type: 'series2',
                value: 2260,
            },
            {
                label: 'Tues.',
                type: 'series1',
                value: 1800,
            },
            {
                label: 'Tues.',
                type: 'series2',
                value: 1300,
            },
            {
                label: 'Wed.',
                type: 'series1',
                value: 950,
            },
            {
                label: 'Wed.',
                type: 'series2',
                value: 900,
            }
        ];
        return {
            base: {
                id: "",
                name: "Antd分组条形图",
                type: "AntdGroupBar",
            },
            style: {
                data: data,
                isGroup: true,
                xField: "value",
                yField: "label",
                seriesField: "type",
                color: [
                    "#00a6ffff",
                    "#5dd1ffff"
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
                            stroke: "#a2a2a273",
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
                maxBarWidth: 11,
                supportCSSTransform: true,
                animation: {
                    appear: {
                        animation: "scale-in-x",
                        duration: 3000
                    }
                },
                label: {
                    position: "right",
                    style: {
                        fill: "#efefef",
                        fontSize: 10
                    }
                }
            },
            filter: {
                enable: false,
                blur: 0,
                brightness: 1,
                contrast: 1,
                opacity: 1,
                saturate: 1,
                hueRotate: 0
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdGroupBarDefinition;
