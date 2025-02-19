import rangeColumnImg from "./range-column.png";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumnController";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdRangeColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd区间柱状图",
            compKey: "AntdRangeColumn",
            categorize: "chart",
            subCategorize: "column",
        };
    }

    getChartImg(): string {
        return rangeColumnImg;
    }

    getInitConfig(): AntdColumnProps {
        const data = [
            {type: 'sort1', values: [76, 100]},
            {type: 'sort2', values: [56, 108]},
            {type: 'sort3', values: [38, 129]},
            {type: 'sort4', values: [38, 129]},
        ];
        return {
            base: {
                id: "",
                name: 'Antd区间柱状图',
                type: 'AntdRangeColumn',
            },
            style: {
                data: data,
                xField: "type",
                yField: "values",
                seriesField: "type",
                isRange: true,
                maxColumnWidth: 8,
                supportCSSTransform: true,
                color: ["#00dbffff"],
                columnStyle: {
                    radius: 0,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#a6a6a6ff",
                            fontSize: 11,
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
                            fill: "#d0d0d0ff",
                            fontSize: 11,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#9e9e9e91",
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
                            fill: "#969696ff",
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

export default AntdRangeColumnDefinition;
