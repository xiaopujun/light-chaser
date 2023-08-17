import {BaseInfoType} from "../../../designer/DesignerType";
import baseColumnImg from "./base-column.png";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumn";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";

class AntdBaseColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础柱状图",
            compKey: "AntdBaseColumn",
            type: "柱状图",
            typeKey: "column",
            desc: "基于Antd Designer实现的基础柱状图组件",
        };
    }

    getChartImg(): string {
        return baseColumnImg;
    }

    getInitConfig(): AntdColumnProps {
        const data = [
            {
                name: "1951 年",
                value: 48
            },
            {
                name: "1952 年",
                value: 52
            },
            {
                name: "1956 年",
                value: 22
            }
        ]
        return {
            info: {
                id: "",
                name: '基础条形图',
                type: 'AntdBaseBar',
                desc: '基于antd实现的基础条形图',
            },
            style: {
                data: data,
                xField: "name",
                yField: "value",
                seriesField: 'name',
                maxColumnWidth: 8,
                supportCSSTransform: true,
                color: ["#00dbffff"],
                columnStyle: {
                    fill: "#00dbffff",
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

export default AntdBaseColumnDefinition;
