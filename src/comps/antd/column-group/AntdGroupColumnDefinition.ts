import groupColumnImg from "./group-column.png";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumnController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdGroupColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd分组柱状图",
            compKey: "AntdGroupColumn",
            categorize: "chart",
            subCategorize: "column",
        };
    }

    getChartImg(): string {
        return groupColumnImg;
    }

    getInitConfig(): AntdColumnProps {
        const data = [
            {
                label: 'Mon.',
                type: 'series1',
                value: 2800,
            },
            {
                label: 'Mon.',
                type: 'series2',
                value: 2260,
            },
            {
                label: 'Tues.',
                type: 'series1',
                value: 1800,
            },
            {
                label: 'Tues.',
                type: 'series2',
                value: 1300,
            },
            {
                label: 'Wed.',
                type: 'series1',
                value: 950,
            },
            {
                label: 'Wed.',
                type: 'series2',
                value: 900,
            }
        ];
        return {
            base: {
                id: "",
                name: "Antd分组柱状图",
                type: "AntdGroupColumn",
            },
            style: {
                data: data,
                isGroup: true,
                xField: "label",
                yField: "value",
                seriesField: "type",
                maxColumnWidth: 8,
                supportCSSTransform: true,
                color: ["#00c0df", "#298aff"],
                columnStyle: {
                    radius: 0,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#949494ff",
                            fontSize: 10,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#b1b1b1ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#b3b3b37d",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null,
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#a8a8a8ff",
                            fontSize: 10,
                        },
                    },
                },
                animation: {
                    appear: {
                        animation: "scale-in-y",
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

export default AntdGroupColumnDefinition;
