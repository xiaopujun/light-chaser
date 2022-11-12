import {cloneDeep} from 'lodash';

let baseStyle = {
    padding: '10px',
    backgroundColor: 'rgba(23,157,169,0.12)'
}
let axis = {
    grid: null,
    label: {
        style: {
            fill: 'rgb(0,255,234)'
        },
    },
    line: null,
    tickLine: null
}

//基础条形图初始化数据和配置
export const initAntdBaseBar = () => {
    return cloneDeep({
        baseInfo: {
            name: '基础条形图',
            type: 'AntdBaseBar'
        },
        baseStyle,
        chartProps: {
            data: [
                {
                    name: '1951 年',
                    value: 38,
                },
                {
                    name: '1952 年',
                    value: 52,
                },
                {
                    name: '1956 年',
                    value: 61,
                },
            ],
            xField: 'value',
            yField: 'name',
            seriesField: 'name',
            xAxis: {...axis},
            yAxis: {...axis},
            color: 'rgb(0,255,234,0.2)',
            legend: false,
            maxBarWidth: 8
        }
    });
};

//分组条形图初始化数据和配置
export const initAntdGroupBar = () => {
    return cloneDeep({
        baseInfo: {
            name: '分组条形图',
            type: 'AntdGroupBar'
        },
        baseStyle,
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
            xAxis: {...axis},
            yAxis: {...axis},
            color: ['rgb(0,255,234)', 'rgb(233,118,9)'],
            legend: false,
            maxBarWidth: 8
        }
    });
};

//百分比条形图初始化数据和配置
export const initAntdPercentBar = () => {
    return cloneDeep({
        baseInfo: {
            name: '百分比条形图',
            type: 'AntdPercentBar'
        },
        baseStyle,
        chartProps: {
            data: [
                {
                    type: 'Asia',
                    name: '1750',
                    value: 502,
                },
                {
                    type: 'Asia',
                    name: '1800',
                    value: 635,
                },
                {
                    type: 'Asia',
                    name: '1850',
                    value: 809,
                },
            ],
            xField: 'value',
            yField: 'name',
            seriesField: 'type',
            isPercent: true,
            isStack: true,
            xAxis: {...axis},
            yAxis: {...axis},
            maxBarWidth: 8
        }
    });
};

//区间条形图初始化数据和配置
export const initAntdZoneBar = () => {
    return cloneDeep({
        baseInfo: {
            name: '区间条形图',
            type: 'AntdZoneBar'
        },
        baseStyle,
        chartProps: {
            data: [
                {
                    name: '分类一',
                    value: [76, 100],
                },
                {
                    name: '分类二',
                    value: [56, 108],
                },
                {
                    name: '分类三',
                    value: [38, 129],
                },
            ],
            xField: 'value',
            yField: 'name',
            isRange: true,
            xAxis: {...axis},
            yAxis: {...axis},
            color: ['rgb(0,255,234)', '#fff'],
            seriesField: 'name',
            maxBarWidth: 8
        }
    });
};

//堆叠条形图初始化数据和配置
export const initAntdStackBar = () => {
    return cloneDeep({
        baseInfo: {
            name: '堆叠条形图',
            type: 'AntdStackBar'
        },
        baseStyle,
        chartProps: {
            data: [
                {
                    name: '1991',
                    value: 3,
                    type: 'Lon',
                },
                {
                    name: '1993',
                    value: 3.5,
                    type: 'Lon',
                },
                {
                    name: '1992',
                    value: 4,
                    type: 'Lon',
                },
            ],
            isStack: true,
            xField: 'value',
            yField: 'name',
            seriesField: 'type',
            xAxis: {...axis},
            yAxis: {...axis},
            maxBarWidth: 8
        }
    });
};
