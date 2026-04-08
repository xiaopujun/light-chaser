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

import groupRoseImg from "./group-rose.png";
import AbstractRoseDefinition from "../../antd-common/rose/AbstractRoseDefinition";
import {AntdRoseProps} from "../../antd-common/rose/AntdCommonRoseController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdGroupRoseDefinition extends AbstractRoseDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd分组玫瑰图",
            compKey: "AntdGroupRose",
            categorize: "chart",
            subCategorize: "rose",
        };
    }

    getChartImg(): string {
        return groupRoseImg;
    }

    getInitConfig(): AntdRoseProps {
        const data = [
            {
                "type": "sort1",
                "value": 27,
                "user": "user1"
            },
            {
                "type": "sort2",
                "value": 25,
                "user": "user2"
            },
            {
                "type": "sort3",
                "value": 18,
                "user": "user1"
            },
            {
                "type": "sort4",
                "value": 15,
                "user": "user2"
            },
            {
                "type": "sort5",
                "value": 18,
                "user": "user1"
            },
            {
                "type": "sort6",
                "value": 20,
                "user": "user2"
            }
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
                isGroup: true,
                seriesField: "user",
                padding: [
                    60,
                    0,
                    0,
                    0
                ],
                radius: 1,
                innerRadius: 0.13,
                startAngle: 0,
                endAngle: 6.283185307179586,
                label: {
                    offset: 16,
                    style: {
                        fill: "#ffffff"
                    },
                    autoRotate: false
                },
                legend: {
                    position: "top-left",
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
                        animation: "grow-in-xy",
                        duration: 3000
                    }
                },
                color: [
                    "#00b7ffff",
                    "#81dbffff"
                ],
                sectorStyle: {
                    lineWidth: 0
                }
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdGroupRoseDefinition;
