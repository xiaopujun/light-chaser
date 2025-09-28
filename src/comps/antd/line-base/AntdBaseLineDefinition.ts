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

import baseLineImg from "./base-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLineController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";


class AntdBaseLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础折线图",
            compKey: "AntdBaseLine",
            categorize: "chart",
            subCategorize: "line",
        };
    }

    getChartImg(): string {
        return baseLineImg;
    }

    getInitConfig(): AntdLineProps {
        const data = [
            {"name": "1990", "value": 525},
            {"name": "1991", "value": 459},
            {"name": "1992", "value": 357},
            {"name": "1993", "value": 414},
            {"name": "1994", "value": 234},
            {"name": "1995", "value": 250},
            {"name": "1996", "value": 156}];
        return {
            base: {
                id: "",
                name: '基础折线图',
                type: 'AntdBaseLine',
            },
            style: {
                data: data,
                xField: "name",
                yField: "value",
                smooth: true,
                supportCSSTransform: true,
                color: "l(90) 0:#2f82ff 1:#cd4dff",
                point: {
                    size: 6,
                    color: "l(90) 0:#4995ff 1:#d176ff",
                    shape: "circle",
                    style: {
                        lineWidth: 0,
                        stroke: "#00d7ff"
                    }
                },
                lineStyle: {
                    lineWidth: 4
                },
                label: {
                    position: "middle",
                    style: {
                        fill: "#ffffff",
                        fontSize: 10,
                        fontWeight: 400
                    }
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
                    tickCount: 4
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
                            stroke: "#9e9e9e7d",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null,
                    tickCount: 4
                },
                animation: {
                    appear: {
                        animation: "wave-in",
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

export default AntdBaseLineDefinition;
