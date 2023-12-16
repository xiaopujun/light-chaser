import {BaseInfoType} from "../../../designer/DesignerType";
import stackColumnImg from "./stack-column.png";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumnController";

class AntdStackColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠柱状图",
            compKey: "AntdStackColumn",
            type: "柱状图",
            typeKey: "column",
        };
    }

    getChartImg(): string {
        return stackColumnImg;
    }

    getInitConfig(): AntdColumnProps {
        const data = [
            {
                year: '1991',
                value: 3,
                type: 'Lon',
            },
            {
                year: '1992',
                value: 4,
                type: 'Lon',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Lon',
            },
            {
                year: '1991',
                value: 3,
                type: 'Bor',
            },
            {
                year: '1992',
                value: 4,
                type: 'Bor',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Bor',
            },
        ];
        return {
            base: {
                id: "",
                name: 'Antd堆叠柱状图',
                type: 'AntdStackColumn',
            },
            style: {
                data: data,

                xField: "year",
                yField: "value",
                seriesField: "type",
                isStack: true,
                maxColumnWidth: 8,
                supportCSSTransform: true,
                color: ["#00c0df", "#298aff"],
                columnStyle: {},
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#c7c7c7ff",
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
                            fill: "#b7b7b7ff",
                        },
                    },
                    line: {
                        style: {
                            stroke: "#9e9e9e75",
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
                            fill: "#aaaaaaff",
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
                dataSource: 'static',
                staticData: {
                    data: data
                },
            },
        };
    }
}

export default AntdStackColumnDefinition;
