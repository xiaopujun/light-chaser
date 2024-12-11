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
                data: data,
                xField: "type",
                yField: "value",
                isGroup: true,
                seriesField: "user",
                padding: [60, 0, 0, 0],
                radius: 0.8,
                innerRadius: 0,
                startAngle: 0,
                endAngle: 2 * Math.PI,
                label: {
                    offset: 14,
                    style: {
                        fill: "#aaaaaaff",
                    },
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#a8a8a8ff",
                            fontSize: 12,
                        },
                    },
                },
                supportCSSTransform: true,
                animation: {
                    appear: {
                        animation: "grow-in-xy",
                        duration: 3000,
                    },
                },
                color: ["#00b7ffff", "#81dbffff"],
                sectorStyle: {
                    lineWidth: 0,
                },
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdGroupRoseDefinition;
