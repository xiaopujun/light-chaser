import BaseInit, {BaseInfo} from "../../interface/BaseInit";

export default class AntdPercentBarInit implements BaseInit {
    getCompName(): string {
        return "百分比条形图";
    }

    getCompType(): string {
        return "AntdPercentBar";
    }

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '百分比条形图',
                type: 'AntdPercentBar'
            },
            baseStyle: {
                padding: '10px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                data: [
                    {
                        type: 'Asia',
                        name: '1750',
                        value: 502,
                    },
                    {
                        type: 'Asia',
                        name: '1800',
                        value: 635,
                    },
                    {
                        type: 'Asia',
                        name: '1850',
                        value: 809,
                    },
                ],
                xField: 'value',
                yField: 'name',
                seriesField: 'type',
                isPercent: true,
                isStack: true,
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: 'rgb(0,255,234)'
                        },
                    },
                    line: null,
                    tickLine: null
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: 'rgb(0,255,234)'
                        },
                    },
                    line: null,
                    tickLine: null
                },
                maxBarWidth: 8
            }
        };
    }

    getBaseInfo(): BaseInfo {
        return {
            name: "百分比条形图",
            value: "AntdPercentBar",
            typeInfo: {
                name: "条形图",
                type: "bar"
            },
        };
    }

}