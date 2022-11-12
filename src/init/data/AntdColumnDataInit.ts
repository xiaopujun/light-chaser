import {cloneDeep} from 'lodash';

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

//基础柱状图初始化数据和配置
export const initAntdBaseColumn = () => {
    return cloneDeep({
        baseInfo: {
            name: '基础柱状图',
            type: 'AntdBaseColumn '
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [
                {
                    name: '家具家电',
                    value: 38,
                },
                {
                    name: '粮油副食',
                    value: 52,
                },
            ],
            xField: 'name',
            yField: 'value',
            xAxis: {...axis},
            yAxis: {...axis},
            seriesField: 'name',
            color: 'rgb(0,255,234)',
            legend: false,
            maxColumnWidth: 8
        }
    });
};

//堆叠柱状图初始化数据和配置
export const initAntdStackColumn = () => {
    return cloneDeep({
        baseInfo: {
            name: '堆叠柱状图',
            type: 'AntdStackColumn '
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [
                {
                    name: '1991',
                    value: 3,
                    type: 'Lon',
                },
                {
                    name: '1992',
                    value: 4,
                    type: 'Lon',
                },
            ],
            isStack: true,
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
            xAxis: {...axis},
            yAxis: {...axis},
            maxColumnWidth: 8
        }
    });
};

//分组柱状图初始化数据和配置
export const initAntdGroupColumn = () => {
    return cloneDeep({
        baseInfo: {
            name: '分组柱状图',
            type: 'AntdGroupColumn '
        },
        baseStyle: {
            padding: '5px',
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
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
            dodgePadding: 4,
            xAxis: {...axis},
            yAxis: {...axis},
            color: ['rgb(0,255,234)', 'rgb(233,118,9)'],
            legend: false,
            maxColumnWidth: 8
        }
    });
};

//百分比柱状图初始化数据和配置
export const initAntdPercentColumn = () => {
    return cloneDeep({
        baseInfo: {
            name: '百分比柱状图',
            type: 'AntdPercentColumn'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
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
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
            isPercent: true,
            isStack: true,
            xAxis: {...axis},
            yAxis: {...axis},
            legend: false,
            maxColumnWidth: 8
        }
    });
};

//区间柱状图初始化数据和配置
export const initAntdZoneColumn = () => {
    return cloneDeep({
        baseInfo: {
            name: '区间柱状图',
            type: 'AntdZoneColumn'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
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
            seriesField: 'name',
            xField: 'name',
            yField: 'value',
            isRange: true,
            xAxis: {...axis},
            yAxis: {...axis},
            color: 'rgb(0,255,234)',
            maxColumnWidth: 8
        }
    });
};
