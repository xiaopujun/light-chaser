import {BaseInfoType} from "../../../designer/DesignerType";
import stackColumnImg from "./stack-column.png";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumn";

class AntdStackColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠柱状图",
            compKey: "AntdStackColumn",
            type: "柱状图",
            typeKey: "column",
            desc: "基于Antd Designer实现的堆叠柱状图组件",
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
            info: {
                id: "",
                name: 'Antd堆叠柱状图',
                type: 'AntdStackColumn',
                desc: '基于Antd Designer实现的堆叠柱状图组件',
            },
            style: {
                data: data,
                xField: 'year',
                yField: 'value',
                seriesField: 'type',
                isStack: true,
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
                // color: ['#00d7ff', '#0080b6'],
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
                maxColumnWidth: 8,
                supportCSSTransform: true,
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

export default AntdStackColumnDefinition;
