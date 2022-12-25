import BaseInit from "../../interface/BaseInit";

export default class AntdScatterInit implements BaseInit {
    getCompName(): string {
        return "散点图";
    }

    getCompType(): string {
        return "AntdScatter";
    }

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '散点图',
                type: 'AntdScatter'
            },
            baseStyle: {
                padding: '5px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                data: [
                    {x: 1, y: 4.181},
                    {x: 2, y: 4.665},
                    {x: 3, y: 5.296},
                    {x: 4, y: 5.365},
                    {x: 5, y: 5.448},
                    {x: 6, y: 5.744},
                    {x: 7, y: 5.653},
                    {x: 8, y: 5.844},
                    {x: 9, y: 6.362},
                ],
                xField: 'x',
                yField: 'y',
                sizeField: 'y',
                size: [4, 34],
                seriesField: 'y',
                pointStyle: {
                    lineWidth: 0,
                    fill: '#ff7e28',
                },
                xAxis: {
                    grid: null,
                    line: null,
                    label: {
                        style: {
                            fill: 'rgb(0,255,234)'
                        },
                    },
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: 'rgb(0,255,234)'
                        },
                    },
                },
            }
        };
    }

}

