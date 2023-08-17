import {BaseInfoType} from "../../../designer/DesignerType";
import rangeColumnImg from "./range-column.png";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumn";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";

class AntdRangeColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd区间柱状图",
            compKey: "AntdRangeColumn",
            type: "柱状图",
            typeKey: "column",
            desc: "基于Antd Designer实现的区间柱状图组件",
        };
    }

    getChartImg(): string {
        return rangeColumnImg;
    }

    getInitConfig(): AntdColumnProps {
        const data = [
            {type: '分类一', values: [76, 100]},
            {type: '分类二', values: [56, 108]},
            {type: '分类三', values: [38, 129]},
        ];
        return {
            info: {
                id: "",
                name: 'Antd区间柱状图',
                type: 'AntdRangeColumn',
                desc: '基于Antd Designer实现的区间柱状图组件',
            },
            style: {
                data: data,
                xField: 'type',
                yField: 'values',
                seriesField: 'type',
                isRange: true,
                maxColumnWidth: 8,
                supportCSSTransform: true,
                color: ["#00dbffff"],
                columnStyle: {
                    fill: "#00c0df",
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#00FFEAFF"
                        }
                    },
                    line: {
                        style: {
                            stroke: "#00dbffff",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#00FFEAFF"
                        }
                    },
                    line: {
                        style: {
                            stroke: "#00dbffff",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null
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
                animation: {
                    appear: {
                        animation: 'scale-in-y',
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

export default AntdRangeColumnDefinition;
