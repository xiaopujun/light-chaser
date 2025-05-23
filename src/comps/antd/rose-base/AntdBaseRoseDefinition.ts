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

import baseRoseImg from "./base-rose.png";
import AbstractRoseDefinition from "../../antd-common/rose/AbstractRoseDefinition";
import {AntdRoseProps} from "../../antd-common/rose/AntdCommonRoseController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdBaseRoseDefinition extends AbstractRoseDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础玫瑰图",
            compKey: "AntdBaseRose",
            categorize: "chart",
            subCategorize: "rose",
        };
    }

    getChartImg(): string {
        return baseRoseImg;
    }

    getInitConfig(): AntdRoseProps {
        const data = [
            {type: 'sort1', value: 27},
            {type: 'sort2', value: 25},
            {type: 'sort3', value: 18},
            {type: 'sort4', value: 15}
        ];
        return {
            base: {
                id: "",
                name: 'Antd基础玫瑰图',
                type: 'AntdBaseRose',
            },
            style: {
                data,
                xField: "type",
                yField: "value",
                seriesField: "type",
                radius: 1,
                innerRadius: 0,
                padding: [
                    50,
                    0,
                    0,
                    0
                ],
                supportCSSTransform: true,
                sectorStyle: {
                    stroke: "#fff",
                    lineWidth: 0
                },
                label: {
                    style: {
                        fill: "#ffffff",
                        fontSize: 16
                    },
                    autoRotate: true
                },
                legend: {
                    position: "left",
                    layout: "vertical",
                    itemName: {
                        style: {
                            fill: "#ffffff",
                            fontSize: 14
                        }
                    },
                    itemSpacing: 0
                },
                animation: {
                    appear: {
                        animation: "grow-in-xy",
                        duration: 3000
                    }
                },
                color: [
                    "#0091ffff",
                    "#68beffff",
                    "#b4e0ffff",
                    "#408ec9ff"
                ]
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdBaseRoseDefinition;
