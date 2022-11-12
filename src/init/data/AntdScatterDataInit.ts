import {cloneDeep} from 'lodash';

//散点图初始化数据和配置
export const initAntdScatter = () => {
    return cloneDeep({
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
    });
};

//气泡图初始化数据和配置
export const initAntdBubbles = () => {
    return cloneDeep({
        baseInfo: {
            name: '气泡图',
            type: 'AntdBubbles'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
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

