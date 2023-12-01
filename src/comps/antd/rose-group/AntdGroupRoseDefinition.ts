import {BaseInfoType} from "../../../designer/DesignerType";
import groupRoseImg from "./group-rose.png";
import AbstractRoseDefinition from "../../antd-common/rose/AbstractRoseDefinition";
import {AntdRoseProps} from "../../antd-common/rose/AntdCommonRose";

class AntdGroupRoseDefinition extends AbstractRoseDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd分组玫瑰图",
            compKey: "AntdGroupRose",
            type: "玫瑰图",
            typeKey: "rose",
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
                dataSource: 'static',
                staticData: {
                    data: data
                },
            },
        };
    }
}

export default AntdGroupRoseDefinition;
