import {cloneDeep} from 'lodash';

//基础线图
export const initAntdBaseFoldLine = () => {
    return cloneDeep({
        elemBaseProperties: {
            paddingTop: '15px',
            paddingLeft: '15px',
            paddingBottom: '15px',
            paddingRight: '15px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
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
        elemBaseProperties: {
            paddingTop: '15px',
            paddingLeft: '15px',
            paddingBottom: '15px',
            paddingRight: '15px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
            data: [
                {
                    month: 'Jan',
                    key: 'series1',
                    value: 125,
                },
                {
                    month: 'Jan',
                    key: 'series2',
                    value: 51,
                },
                {
                    month: 'Feb',
                    key: 'series1',
                    value: 132,
                },
                {
                    month: 'Feb',
                    key: 'series2',
                    value: 91,
                },
                {
                    month: 'Mar',
                    key: 'series1',
                    value: 141,
                },
                {
                    month: 'Mar',
                    key: 'series2',
                    value: 34,
                },
                {
                    month: 'Apr',
                    key: 'series1',
                    value: 158,
                },
                {
                    month: 'Apr',
                    key: 'series2',
                    value: 47,
                },
                {
                    month: 'May',
                    key: 'series1',
                    value: 133,
                },
                {
                    month: 'May',
                    key: 'series2',
                    value: 63,
                },
                {
                    month: 'June',
                    key: 'series1',
                    value: 143,
                },
                {
                    month: 'June',
                    key: 'series2',
                    value: 58,
                },
                {
                    month: 'July',
                    key: 'series1',
                    value: 176,
                },
                {
                    month: 'July',
                    key: 'series2',
                    value: 56,
                },
                {
                    month: 'Aug',
                    key: 'series1',
                    value: 194,
                },
                {
                    month: 'Aug',
                    key: 'series2',
                    value: 77,
                },
                {
                    month: 'Sep',
                    key: 'series1',
                    value: 115,
                },
                {
                    month: 'Sep',
                    key: 'series2',
                    value: 99,
                },
                {
                    month: 'Oct',
                    key: 'series1',
                    value: 134,
                },
                {
                    month: 'Oct',
                    key: 'series2',
                    value: 106,
                },
                {
                    month: 'Nov',
                    key: 'series1',
                    value: 110,
                },
                {
                    month: 'Nov',
                    key: 'series2',
                    value: 88,
                },
                {
                    month: 'Dec',
                    key: 'series1',
                    value: 91,
                },
                {
                    month: 'Dec',
                    key: 'series2',
                    value: 56,
                },
            ],
            xField: 'month',
            yField: 'value',
            legend: false,
            seriesField: 'key',
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
        elemBaseProperties: {
            paddingTop: '15px',
            paddingLeft: '15px',
            paddingBottom: '15px',
            paddingRight: '15px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
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

