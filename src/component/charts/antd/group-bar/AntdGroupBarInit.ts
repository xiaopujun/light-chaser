import BaseInit from "../../interface/BaseInit";

export default class AntdGroupBarInit implements BaseInit {
    getCompName(): string {
        return "分组条形图";
    }

    getCompType(): string {
        return "AntdGroupBar";
    }

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '分组条形图',
                type: 'AntdGroupBar'
            },
            baseStyle: {
                padding: '10px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                data: [
                    {
                        name: 'Mon.',
                        type: 'series1',
                        value: 2800,
                    },
                    {
                        name: 'Mon.',
                        type: 'series2',
                        value: 2260,
                    },
                    {
                        name: 'Tues.',
                        type: 'series1',
                        value: 1800,
                    },
                ],
                isGroup: true,
                xField: 'value',
                yField: 'name',
                seriesField: 'type',
                dodgePadding: 4,
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
                color: ['rgb(0,255,234)', 'rgb(233,118,9)'],
                legend: false,
                maxBarWidth: 8
            }
        };
    }

}