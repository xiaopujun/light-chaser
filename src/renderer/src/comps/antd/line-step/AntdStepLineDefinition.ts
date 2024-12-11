import stepLineImg from "./step-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLineController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";


class AntdStepLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd阶梯折线图",
            compKey: "AntdStepLine",
            categorize: "chart",
            subCategorize: "line",
        };
    }

    getChartImg(): string {
        return stepLineImg;
    }


    getInitConfig(): AntdLineProps {
        const data = [
            {year: '1991', value: 3},
            {year: '1992', value: 4},
            {year: '1993', value: 3.5},
            {year: '1994', value: 5},
            {year: '1995', value: 4.9},
            {year: '1996', value: 6},
            {year: '1997', value: 7},
            {year: '1998', value: 9},
            {year: '1999', value: 13},
            {year: '1999', value: 8},
        ];
        return {
            base: {
                id: "",
                name: '多折线图',
                type: 'AntdStepLine',
            },
            style: {
                data: data,
                xField: "year",
                yField: "value",
                stepType: "vh",
                color: "#00d7ff",
                smooth: true,
                supportCSSTransform: true,
                point: {
                    size: 3,
                    color: "#00d7ff",
                    shape: "bowtie",
                    style: {
                        lineWidth: 0,
                        stroke: "#00d7ff"
                    }
                },
                lineStyle: {
                    stroke: undefined,
                    lineWidth: 1,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#989898ff",
                            fontSize: 10,
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
                            fill: "#a6a6a6ff",
                        },
                    },
                    line: {
                        style: {
                            stroke: "#9a9a9a8c",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                legend: {
                    position: "right-top",
                    layout: "vertical",
                    itemName: {
                        style: {
                            fill: "#00f0ffff",
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

export default AntdStepLineDefinition;
