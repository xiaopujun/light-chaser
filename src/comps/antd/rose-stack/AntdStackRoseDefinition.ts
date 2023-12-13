import {BaseInfoType} from "../../../designer/DesignerType";
import stackRoseImg from "./stack-rose.png";
import AbstractRoseDefinition from "../../antd-common/rose/AbstractRoseDefinition";
import {AntdRoseProps} from "../../antd-common/rose/AntdCommonRoseController";

class AntdStackRoseDefinition extends AbstractRoseDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠玫瑰图",
            compKey: "AntdStackRose",
            type: "玫瑰图",
            typeKey: "rose",
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
                supportCSSTransform: true,
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
                color: ["#00b7ffff", "#8ed2ffff"],
                radius: 1,
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

export default AntdStackRoseDefinition;
