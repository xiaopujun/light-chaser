import {cloneDeep} from 'lodash';

//基础面积图初始化数据和配置
export const initAntdBaseArea = () => {
    return cloneDeep({
        baseInfo: {
            name: '基础面积图',
            type: 'AntdBaseArea '
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [],
            xField: 'timePeriod',
            yField: 'value',
            legend: false,
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
                line: null,
                label: {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                },
            },
        }
    });
};

//堆叠面积图初始化数据和配置
export const initAntdStackArea = () => {
    return cloneDeep({
        baseInfo: {
            name: '堆叠面积图',
            type: 'AntdStackArea '
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [],
            xField: 'date',
            yField: 'value',
            seriesField: 'country',
            color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
            legend: false,
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
                line: null,
                label: {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                },
            },
        }
    });
};

//百分比面积图初始化数据和配置
export const initAntdPercentArea = () => {
    return cloneDeep({
        baseInfo: {
            name: '百分比面积图',
            type: 'AntdPercentArea '
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [],
            xField: 'year',
            yField: 'value',
            seriesField: 'country',
            color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
            isPercent: true,
            legend: false,
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
                line: null,
                label: {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                },
            },
        }
    });
};

