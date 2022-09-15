import {cloneDeep} from 'lodash';

//散点图初始化数据和配置
export const initAntdScatter = () => {
    return cloneDeep({
        elemBaseProperties: {
            padding:'5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
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
                {x: 10, y: 6.38},
                {x: 11, y: 6.311},
                {x: 12, y: 6.457},
                {x: 13, y: 6.479},
                {x: 14, y: 6.59},
                {x: 15, y: 6.74},
                {x: 16, y: 6.58},
                {x: 17, y: 6.852},
                {x: 18, y: 6.531},
                {x: 19, y: 6.682},
                {x: 20, y: 7.013},
                {x: 21, y: 6.82},
                {x: 22, y: 6.647},
                {x: 23, y: 6.951},
                {x: 24, y: 7.121},
                {x: 25, y: 7.143},
                {x: 26, y: 6.914},
                {x: 27, y: 6.941},
                {x: 28, y: 7.226},
                {x: 29, y: 6.898},
                {x: 30, y: 7.392},
                {x: 31, y: 6.938},
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
    });
};

//气泡图初始化数据和配置
export const initAntdBubbles = () => {
    return cloneDeep({
        elemBaseProperties: {
            padding:'5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
            appendPadding: 30,
            data: [],
            xField: 'change in female rate',
            yField: 'change in male rate',
            sizeField: 'change in male rate',
            colorField: 'continent',
            color: ['#ff0000', '#82cab2', '#193442', '#d18768', '#7e827a'],
            size: [4, 30],
            shape: 'circle',
            pointStyle: {
                fillOpacity: 0.8,
                stroke: '#bbb',
            },
            xAxis: {
                min: -25,
                max: 5,
                grid: null,
                line: null,
                label: {style: {fill: 'rgb(0,255,234)'}}
            },
            yAxis: {
                line: null,
                grid: null,
                label: {style: {fill: 'rgb(0,255,234)'}}
            },
        }
    });
};

