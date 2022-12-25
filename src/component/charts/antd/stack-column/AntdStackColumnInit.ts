import BaseInit from "../../interface/BaseInit";

export default class AntdStackColumnInit implements BaseInit {
    getCompName(): string {
        return "堆叠柱状图";
    }

    getCompType(): string {
        return "AntdStackColumn";
    }

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '堆叠柱状图',
                type: 'AntdStackColumn'
            },
            baseStyle: {
                padding: '5px',
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
                        name: '1992',
                        value: 4,
                        type: 'Lon',
                    },
                ],
                isStack: true,
                xField: 'name',
                yField: 'value',
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
                maxColumnWidth: 8
            }
        };
    }

}