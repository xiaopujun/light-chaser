import BaseInit, {BaseInfo} from "../../interface/BaseInit";

export default class AntdStackBarInit implements BaseInit {

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '堆叠条形图',
                type: 'AntdStackBar'
            },
            baseStyle: {
                padding: '10px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                data: [
                    {
                        name: '1991',
                        value: 3,
                        type: 'Lon',
                    },
                    {
                        name: '1993',
                        value: 3.5,
                        type: 'Lon',
                    },
                    {
                        name: '1992',
                        value: 4,
                        type: 'Lon',
                    },
                ],
                isStack: true,
                xField: 'value',
                yField: 'name',
                seriesField: 'type',
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
            name: "堆叠条形图",
            value: "AntdStackBar",
            typeInfo: {
                name: "条形图",
                type: "bar"
            },
        };
    }

}