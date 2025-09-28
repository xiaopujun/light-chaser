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

import stepLineImg from "./step-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLineController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";


class AntdStepLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd阶梯折线图",
            compKey: "AntdStepLine",
            categorize: "chart",
            subCategorize: "line",
        };
    }

    getChartImg(): string {
        return stepLineImg;
    }


    getInitConfig(): AntdLineProps {
        const data = [
            {year: '1991', value: 3},
            {year: '1992', value: 4},
            {year: '1993', value: 3.5},
            {year: '1994', value: 5},
            {year: '1995', value: 4.9},
            {year: '1996', value: 6},
            {year: '1997', value: 7},
            {year: '1998', value: 9},
            {year: '1999', value: 13},
            {year: '1999', value: 8},
        ];
        return {
            base: {
                id: "",
                name: '多折线图',
                type: 'AntdStepLine',
            },
            style: {
                data: data,
                xField: "year",
                yField: "value",
                stepType: "vh",
                color: "l(90) 0:#2e88ff 1:#b95eff",
                smooth: true,
                supportCSSTransform: true,
                point: {
                    size: 0,
                    color: "#00d7ff",
                    shape: "bowtie",
                    style: {
                        lineWidth: 0,
                        stroke: "#00d7ff"
                    }
                },
                lineStyle: {
                    lineWidth: 5
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
                    title: null,
                    tickCount: 5
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
                            stroke: "#9a9a9a8c",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
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
                },
                label: {
                    position: "top",
                    style: {
                        fill: "#ffffff",
                        fontSize: 10
                    },
                    offsetY: -11,
                    offsetX: -6
                }
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdStepLineDefinition;
