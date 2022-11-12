import {cloneDeep} from 'lodash';

//基础线图
export const initAntdBaseFoldLine = () => {
    return cloneDeep({
        baseInfo: {
            name: '基础线图',
            type: 'AntdBaseFoldLine'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [],
            xField: 'Date',
            yField: 'scales',
            color: '#00ebff',
            xAxis: {
                grid: null,
                line: null,
                label: {style: {fill: 'rgb(0,255,234)'}},
                type: 'time'
            },
            yAxis: {
                line: null,
                grid: null,
                label: {style: {fill: 'rgb(0,255,234)'}}
            },
        }
    });
};
//阶梯线图
export const initAntdStepFoldLine = () => {
    return cloneDeep({
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
    });
};
//多重线图
export const initAntdMuchFoldLine = () => {
    return cloneDeep({
        baseInfo: {
            name: '多重线图',
            type: 'AntdMuchFoldLine'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [],
            xField: 'year',
            yField: 'gdp',
            seriesField: 'name',
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
            smooth: true,
            animation: {
                appear: {
                    animation: 'path-in',
                    duration: 5000,
                },
            },
        }
    });
};

