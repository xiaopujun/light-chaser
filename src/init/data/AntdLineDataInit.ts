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
            data: [
                {
                    "name": "2010-01",
                    "value": 1998
                },
                {
                    "name": "2010-02",
                    "value": 1850
                },
                {
                    "name": "2010-03",
                    "value": 1720
                },
                {
                    "name": "2010-04",
                    "value": 1320
                },
            ],
            xField: 'name',
            yField: 'value',
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
            data: [
                {
                    "type": "China",
                    "name": "2000",
                    "value": 1211
                },
                {
                    "type": "China",
                    "name": "2001",
                    "value": 1339
                },
                {
                    "type": "China",
                    "name": "2002",
                    "value": 14705
                },
                {
                    "type": "China",
                    "name": "2003",
                    "value": 16602
                },
                {
                    "type": "China",
                    "name": "2004",
                    "value": 1955
                },
                {
                    "type": "United States",
                    "name": "2000",
                    "value": 10252
                },
                {
                    "type": "United States",
                    "name": "2001",
                    "value": 14058
                },
                {
                    "type": "United States",
                    "name": "2002",
                    "value": 1093
                },
                {
                    "type": "United States",
                    "name": "2003",
                    "value": 11245
                },
                {
                    "type": "United States",
                    "name": "2004",
                    "value": 1221
                },
            ],
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
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

