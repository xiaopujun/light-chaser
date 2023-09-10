import {BaseInfoType} from "../../../designer/DesignerType";
import multiLineImg from "./multi-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLine";

class AntdMultiLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd多折线图",
            compKey: "AntdMultiLine",
            type: "折线图",
            typeKey: "line",
            desc: "基于Antd Designer实现的多折线图组件",
        };
    }

    getChartImg(): string {
        return multiLineImg;
    }

    getInitConfig(): AntdLineProps {
        const data = [
            {
                year: "2007",
                value: 1706,
                category: "sort1",
            },
            {
                year: "2007",
                value: 448,
                category: "sort2",
            },
            {
                year: "2008",
                value: 1361,
                category: "sort1",
            },
            {
                year: "2008",
                value: 779,
                category: "sort2",
            },
            {
                year: "2009",
                value: 1722,
                category: "sort1",
            },
            {
                year: "2009",
                value: 430,
                category: "sort2",
            },
            {
                year: "2010",
                value: 1626,
                category: "sort1",
            },
            {
                year: "2010",
                value: 555,
                category: "sort2",
            },
        ]

        return {
            info: {
                id: "",
                name: '多折线图',
                type: 'AntdMultiLine',
                desc: '基于antd实现的多折线图',
            },
            style: {
                data: data,
                xField: "year",
                yField: "value",
                seriesField: "category",
                supportCSSTransform: true,
                color: ["#00a8ff", "#00ffc9"],
                lineStyle: {},
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#969696ff",
                            fontSize: 11,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null,
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#a0a0a0ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#adadad75",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                smooth: false,
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#a0a0a0ff",
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
                point: {
                    size: 3,
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

export default AntdMultiLineDefinition;
