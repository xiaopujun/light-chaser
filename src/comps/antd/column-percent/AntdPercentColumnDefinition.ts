import percentColumnImg from "./percent-column.png";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumnController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdPercentColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd百分比柱状图",
            compKey: "AntdPercentColumn",
            categorize: "chart",
            subCategorize: "column",
        };
    }

    getChartImg(): string {
        return percentColumnImg;
    }

    getInitConfig(): AntdColumnProps {
        const data = [
            {
                country: 'Asia',
                year: '1750',
                value: 502,
            },
            {
                country: 'Asia',
                year: '1800',
                value: 635,
            },
            {
                country: 'Asia',
                year: '1850',
                value: 809,
            },
            {
                country: 'Africa',
                year: '1750',
                value: 106,
            },
            {
                country: 'Africa',
                year: '1800',
                value: 107,
            },
            {
                country: 'Africa',
                year: '1850',
                value: 111,
            },
            {
                country: 'Europe',
                year: '1750',
                value: 163,
            },
            {
                country: 'Europe',
                year: '1800',
                value: 203,
            },
            {
                country: 'Europe',
                year: '1850',
                value: 276,
            }
        ];
        return {
            base: {
                id: "",
                name: 'Antd百分比柱状图',
                type: 'AntdPercentColumn',
            },
            style: {
                data: data,
                xField: "year",
                yField: "value",
                seriesField: "country",
                isPercent: true,
                isStack: true,
                maxColumnWidth: 8,
                supportCSSTransform: true,
                color: ["#59bfff", "#298aff", "#004294"],
                columnStyle: {},
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#a2a2a2ff",
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
                            fill: "#b3b3b3ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#92929278",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#00f0ffff",
                            fontSize: 12,
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

export default AntdPercentColumnDefinition;
