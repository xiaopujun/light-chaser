import {BaseInfoType} from "../../../designer/DesignerType";
import stackRoseImg from "./stack-rose.png";
import AbstractRoseDefinition from "../../antd-common/rose/AbstractRoseDefinition";
import {AntdRoseProps} from "../../antd-common/rose/AntdCommonRose";

class AntdStackRoseDefinition extends AbstractRoseDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠玫瑰图",
            compKey: "AntdStackRose",
            type: "玫瑰图",
            typeKey: "rose",
            desc: "基于Antd Designer实现的堆叠玫瑰图组件",
        };
    }

    getChartImg(): string {
        return stackRoseImg;
    }

    getInitConfig(): AntdRoseProps {
        const data = [
            {
                type: '分类一',
                value: 27,
                user: '用户一',
            },
            {
                type: '分类二',
                value: 25,
                user: '用户一',
            },
            {
                type: '分类三',
                value: 18,
                user: '用户一',
            },
            {
                type: '分类四',
                value: 15,
                user: '用户一',
            },
            {
                type: '分类五',
                value: 10,
                user: '用户一',
            },
            {
                type: '其它',
                value: 5,
                user: '用户一',
            },
            {
                type: '分类一',
                value: 7,
                user: '用户二',
            },
            {
                type: '分类二',
                value: 5,
                user: '用户二',
            },
            {
                type: '分类三',
                value: 38,
                user: '用户二',
            },
            {
                type: '分类四',
                value: 5,
                user: '用户二',
            },
            {
                type: '分类五',
                value: 20,
                user: '用户二',
            },
            {
                type: '其它',
                value: 15,
                user: '用户二',
            },
        ];
        return {
            info: {
                id: "",
                name: 'Antd堆叠玫瑰图',
                type: 'AntdStackRose',
                desc: '基于Antd Designer实现的堆叠玫瑰图组件',
            },
            style: {
                data: data,
                xField: 'type',
                yField: 'value',
                isStack: true,
                seriesField: 'user',
                label: {
                    offset: -15,
                    style: {
                        fill: "#fff",
                    }
                },
                legend: {
                    position: "right-top",
                    layout: "vertical",
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

export default AntdStackRoseDefinition;
