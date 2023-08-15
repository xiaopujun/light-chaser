import {BaseInfoType} from "../../../designer/DesignerType";
import baseRoseImg from "./base-rose.png";
import AbstractRoseDefinition from "../../antd-common/rose/AbstractRoseDefinition";
import {AntdRoseProps} from "../../antd-common/rose/AntdCommonRose";

class AntdBaseRoseDefinition extends AbstractRoseDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础玫瑰图",
            compKey: "AntdBaseRose",
            type: "玫瑰图",
            typeKey: "rose",
            desc: "基于Antd Designer实现的基础玫瑰图组件",
        };
    }

    getChartImg(): string {
        return baseRoseImg;
    }

    getInitConfig(): AntdRoseProps {
        const data = [
            {type: '分类一', value: 27},
            {type: '分类二', value: 25},
            {type: '分类三', value: 18},
            {type: '分类四', value: 15},
            {type: '分类五', value: 10},
            {type: '其他', value: 5},
        ];
        return {
            info: {
                id: "",
                name: 'Antd基础玫瑰图',
                type: 'AntdBaseRose',
                desc: '基于Antd Designer实现的基础玫瑰图组件',
            },
            style: {
                data: data,
                xField: 'type',
                yField: 'value',
                seriesField: 'type',
                radius: 0.8,
                padding: [50, 0, 0, 0],
                label: {
                    style: {
                        fill: "#fff",
                    }
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#00f0ffff",
                            fontSize: 12
                        }
                    }
                },
                supportCSSTransform: true,
                animation: {
                    appear: {
                        animation: 'grow-in-xy',
                        duration: 3000,
                    },
                }
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

export default AntdBaseRoseDefinition;
