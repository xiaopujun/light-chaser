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

import React from "react";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import AntdGaugeController, {AntdGaugeProps} from "./AntdGaugeController";
import gaugeImg from './gauge.png';
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const AntdGaugeConfig = React.lazy(() => import("./AntdGaugeConfig"));


class AntdGaugeDefinition extends AbstractDesignerDefinition<AntdGaugeController, AntdGaugeProps> {
    getController(): ClazzTemplate<AntdGaugeController> | null {
        return AntdGaugeController;
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menus = super.getMenuToConfigContentMap();
        menus['style'] = AntdGaugeConfig;
        return menus;
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd仪表盘",
            compKey: "AntdGauge",
            categorize: "chart",
            subCategorize: "progress",
        };
    }

    getChartImg(): string | null {
        return gaugeImg;
    }

    getInitConfig(): AntdGaugeProps {
        return {
            base: {
                id: "",
                name: 'Antd仪表盘',
                type: 'AntdGauge',
            },
            style: {
                percent: 0.75,
                radius: 0.9,
                innerRadius: 0.85,
                startAngle: -3.6651914291880923,
                endAngle: 0.5235987755982988,
                range: {
                    color: [
                        "l(128) 0:#3c90ff 1:#934bff",
                        "#5d9eff00"
                    ]
                },
                indicator: {
                    pointer: {
                        style: {
                            stroke: "#37b3ff",
                            lineWidth: 2
                        }
                    },
                    pin: {
                        style: {
                            stroke: "#37b3ff",
                            fill: "#053b5d",
                            r: 2,
                            lineWidth: 2
                        }
                    }
                },
                axis: {
                    tickLine: {
                        style: {
                            stroke: "#ffffff",
                            lineWidth: 1
                        },
                        length: -4
                    },
                    subTickLine: {
                        count: 11,
                        style: {
                            stroke: "#ffffff",
                            lineWidth: 1
                        },
                        length: -2
                    },
                    label: {
                        style: {
                            fill: "#ffffff",
                            fontSize: 12,
                            textAlign: "center",
                            textBaseline: "bottom"
                        }
                    }
                },
                statistic: {
                    content: {
                        style: {
                            color: "#ffffff",
                            fontSize: "16"
                        }
                    }
                },
                animation: {
                    appear: {
                        animation: "grow-in-x",
                        duration: 3000
                    },
                    update: {
                        animation: "grow-in-x",
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
                staticData: 0.75
            },
        };
    }
}

export default AntdGaugeDefinition;
