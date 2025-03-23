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

import stackRoseImg from "./stack-rose.png";
import AbstractRoseDefinition from "../../antd-common/rose/AbstractRoseDefinition";
import {AntdRoseProps} from "../../antd-common/rose/AntdCommonRoseController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdStackRoseDefinition extends AbstractRoseDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠玫瑰图",
            compKey: "AntdStackRose",
            categorize: "chart",
            subCategorize: "rose",
        };
    }

    getChartImg(): string {
        return stackRoseImg;
    }

    getInitConfig(): AntdRoseProps {
        const data = [
            {
                type: 'sort1',
                value: 27,
                user: 'user1',
            },
            {
                type: 'sort2',
                value: 25,
                user: 'user1',
            },
            {
                type: 'sort3',
                value: 18,
                user: 'user1',
            },
            {
                type: 'sort4',
                value: 15,
                user: 'user1',
            },
            {
                type: 'sort5',
                value: 10,
                user: 'user1',
            },
            {
                type: 'sort1',
                value: 7,
                user: 'user2',
            },
            {
                type: 'sort2',
                value: 5,
                user: 'user2',
            },
            {
                type: 'sort3',
                value: 28,
                user: 'user2',
            },
            {
                type: 'sort4',
                value: 15,
                user: 'user2',
            },
            {
                type: 'sort5',
                value: 20,
                user: 'user2',
            },
        ];
        return {
            base: {
                id: "",
                name: 'Antd堆叠玫瑰图',
                type: 'AntdStackRose',
            },
            style: {
                data: data,
                xField: "type",
                yField: "value",
                isStack: true,
                seriesField: "user",
                color: ["#00b7ffff", "#8ed2ffff"],
                radius: 1,
                innerRadius: 0,
                supportCSSTransform: true,
                sectorStyle: {
                    stroke: "#fff",
                    lineWidth: 0,
                },
                label: {
                    offset: -12,
                    style: {
                        fill: "#ffffffff",
                        fontSize: 9,
                        fontWeight: 700,
                    },
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#b9b9b9ff",
                            fontSize: 12,
                        },
                    },
                },
                animation: {
                    appear: {
                        animation: "wave-in",
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

export default AntdStackRoseDefinition;
