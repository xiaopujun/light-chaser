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
                data: data,
                xField: "type",
                yField: "value",
                seriesField: "type",
                radius: 0.8,
                padding: [50, 0, 0, 0],
                supportCSSTransform: true,
                sectorStyle: {
                    stroke: "#fff",
                    lineWidth: 0,
                },
                label: {
                    style: {
                        fill: "#b5b5b5ff",
                        fontSize: 13,
                    },
                    autoRotate: true,
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#a6a6a6ff",
                            fontSize: 12,
                        },
                    },
                },
                animation: {
                    appear: {
                        animation: "grow-in-xy",
                        duration: 3000,
                    },
                },
                color: ["#0091ffff", "#68beffff", "#b4e0ffff", "#408ec9ff"],
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdBaseRoseDefinition;
