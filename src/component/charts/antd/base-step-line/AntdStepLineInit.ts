import BaseInit from "../../interface/BaseInit";

export default class AntdStepLineInit implements BaseInit {
    getCompName(): string {
        return "阶梯线图";
    }

    getCompType(): string {
        return "AntdStepLine";
    }

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '阶梯线图',
                type: 'AntdStepFoldLine'
            },
            baseStyle: {
                padding: '5px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                data: [
                    {
                        name: 'Jan',
                        type: 'series1',
                        value: 125,
                    },
                    {
                        name: 'Jan',
                        type: 'series2',
                        value: 51,
                    },
                    {
                        name: 'Feb',
                        type: 'series1',
                        value: 132,
                    },
                ],
                xField: 'name',
                yField: 'value',
                legend: false,
                seriesField: 'type',
                stepType: 'hvh',
                xAxis: {
                    grid: null,
                    line: null,
                    label: {style: {fill: 'rgb(0,255,234)'}},
                },
                yAxis: {
                    line: null,
                    grid: null,
                    label: {style: {fill: 'rgb(0,255,234)'}}
                },
            }
        };
    }

}
