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

import baseAreaImg from "./base-area.png";
import AbstractAreaDefinition from "../../antd-common/area/AbstractAreaDefinition";
import {AntdAreaProps} from "../../antd-common/area/AntdCommonAreaController";
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import React from "react";

const AntdBaseAreaStyleConfig = React.lazy(() => import("./AntdBaseAreaConfig").then((module) => ({default: module.AntdBaseAreaStyleConfig})));
const AntdBaseAreaFieldMapping = React.lazy(() => import("./AntdBaseAreaConfig").then((module) => ({default: module.AntdBaseAreaFieldMapping})));

class AntdBaseAreaDefinition extends AbstractAreaDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础面积图",
            compKey: "AntdBaseArea",
            categorize: "chart",
            subCategorize: "area"
        };
    }

    getChartImg(): string {
        return baseAreaImg;
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuToConfigContentMap = super.getMenuToConfigContentMap();
        menuToConfigContentMap!['style'] = AntdBaseAreaStyleConfig;
        menuToConfigContentMap!['mapping'] = AntdBaseAreaFieldMapping;
        return menuToConfigContentMap;
    }

    getInitConfig(): AntdAreaProps {
        const data = [
            {
                name: "Q1",
                value: 12
            },
            {
                name: "Q2",
                value: 30
            },
            {
                name: "Q3",
                value: 45
            },
            {
                name: "Q4",
                value: 60
            },
            {
                name: "Q5",
                value: 230
            },
            {
                name: "Q6",
                value: 84
            },
            {
                name: "Q7",
                value: 160
            },
            {
                name: "Q8",
                value: 76
            },
            {
                name: "Q9",
                value: 50
            },
            {
                name: "Q10",
                value: 48
            },
            {
                name: "Q11",
                value: 83
            },
            {
                name: "Q12",
                value: 75
            },
            {
                name: "Q13",
                value: 77
            },
            {
                name: "Q14",
                value: 82
            },
            {
                name: "Q15",
                value: 47
            },
            {
                name: "Q16",
                value: 86
            },
            {
                name: "Q17",
                value: 54
            },
            {
                name: "Q18",
                value: 45
            },
            {
                name: "Q19",
                value: 25
            },
            {
                name: "Q20",
                value: 22
            }
        ];;
        return {
            base: {
                id: "",
                name: '基础面积图',
                type: 'AntdBaseArea',
            },
            style: {
                data: data,
                xField: "name",
                yField: "value",
                label: {
                    position: "top",
                    offsetY: -4,
                    style: {
                        fill: "#ffffff",
                        fontSize: 14
                    },
                },
                smooth: true,
                supportCSSTransform: true,
                isStack: false,
                startOnZero: false,
                point: {
                    size: 0,
                    style: {
                        fill: "#205e9a",
                        stroke: "#ffffff",
                        lineWidth: 0
                    }
                },
                line: {
                    color: "r(0.5,0.5,1) 0.55:#00aaff 1:#004074",
                    size: 1.5
                },
                areaStyle: {
                    fillOpacity: 1,
                    fill: "l(90) 0:#016eb7 0.85:#0964a133"
                },
                xAxis: {
                    range: [0, 1],
                    grid: null,
                    label: {
                        style: {
                            fill: "#fff",
                            fontSize: 10
                        }
                    },
                    line: {
                        style: {
                            stroke: "#c7c7c76e",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    title: null,
                    position: "bottom"
                },
                yAxis: {
                    tickCount: 3,
                    grid: null,
                    label: {
                        style: {
                            fill: "#fff",
                            fontSize: 10
                        }
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    title: null
                },
                legend: {
                    position: "right-top",
                    layout: "vertical",
                    itemName: {
                        style: {
                            fill: "#00f0ffff",
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

export default AntdBaseAreaDefinition;
