import {BaseInfoType} from "../../../designer/DesignerType";
import percentBarImg from "./percent-bar.png";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBar";
import AbstractBarDefinition from "../../antd-common/bar/AbstractBarDefinition";

class AntdPercentBarDefinition extends AbstractBarDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd百分比条形图",
            compKey: "AntdPercentBar",
            type: "条形图",
            typeKey: "bar",
            desc: "基于Antd Designer实现的百分比条形图组件",
        };
    }

    getChartImg(): string {
        return percentBarImg;
    }

    getInitConfig(): AntdBarProps {
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
                name: 'Antd百分比条形图',
                type: 'AntdPercentBar',
                desc: '基于Antd Designer实现的百分比条形图组件',
            },
            style: {
                data: data,
                xField: 'value',
                yField: 'year',
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
                    position: "right",
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
                maxBarWidth: 8,
                supportCSSTransform: true,
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

export default AntdPercentBarDefinition;
