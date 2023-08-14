import {BaseInfoType} from "../../../designer/DesignerType";
import percentColumnImg from "./percent-column.png";
import AbstractColumnDefinition from "../../antd-common/column/AbstractColumnDefinition";
import {AntdColumnProps} from "../../antd-common/column/AntdCommonColumn";

class AntdPercentColumnDefinition extends AbstractColumnDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd百分比柱状图",
            compKey: "AntdPercentColumn",
            type: "柱状图",
            typeKey: "column",
            desc: "基于Antd Designer实现的百分比柱状图组件",
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
            info: {
                id: "",
                name: 'Antd百分比柱状图',
                type: 'AntdPercentColumn',
                desc: '基于Antd Designer实现的百分比柱状图组件',
            },
            style: {
                data: data,
                xField: 'year',
                yField: 'value',
                seriesField: 'country',
                isPercent: true,
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

export default AntdPercentColumnDefinition;
