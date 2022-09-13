import {cloneDeep} from 'lodash';

let elemBaseProperties = {
    paddingTop: '10px',
    paddingLeft: '10px',
    paddingBottom: '10px',
    paddingRight: '10px',
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
        elemBaseProperties,
        chartProperties: {
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
                {
                    name: '1957 年',
                    value: 145,
                },
                {
                    name: '1958 年',
                    value: 48,
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
        elemBaseProperties,
        chartProperties: {
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
                {
                    name: 'Tues.',
                    type: 'series2',
                    value: 1300,
                },
                {
                    name: 'Wed.',
                    type: 'series1',
                    value: 950,
                },
                {
                    name: 'Wed.',
                    type: 'series2',
                    value: 900,
                },
                {
                    name: 'Thur.',
                    type: 'series1',
                    value: 500,
                },
                {
                    name: 'Thur.',
                    type: 'series2',
                    value: 390,
                },
                {
                    name: 'Fri.',
                    type: 'series1',
                    value: 170,
                },
                {
                    name: 'Fri.',
                    type: 'series2',
                    value: 100,
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
        elemBaseProperties,
        chartProperties: {
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
                {
                    type: 'Asia',
                    name: '1900',
                    value: 947,
                },
                {
                    type: 'Asia',
                    name: '1950',
                    value: 1402,
                },
                {
                    type: 'Asia',
                    name: '1999',
                    value: 3634,
                },
                {
                    type: 'Asia',
                    name: '2050',
                    value: 5268,
                },
                {
                    type: 'Africa',
                    name: '1750',
                    value: 106,
                },
                {
                    type: 'Africa',
                    name: '1800',
                    value: 107,
                },
                {
                    type: 'Africa',
                    name: '1850',
                    value: 111,
                },
                {
                    type: 'Africa',
                    name: '1900',
                    value: 133,
                },
                {
                    type: 'Africa',
                    name: '1950',
                    value: 221,
                },
                {
                    type: 'Africa',
                    name: '1999',
                    value: 767,
                },
                {
                    type: 'Africa',
                    name: '2050',
                    value: 1766,
                },
                {
                    type: 'Europe',
                    name: '1750',
                    value: 163,
                },
                {
                    type: 'Europe',
                    name: '1800',
                    value: 203,
                },
                {
                    type: 'Europe',
                    name: '1850',
                    value: 276,
                },
                {
                    type: 'Europe',
                    name: '1900',
                    value: 408,
                },
                {
                    type: 'Europe',
                    name: '1950',
                    value: 547,
                },
                {
                    type: 'Europe',
                    name: '1999',
                    value: 729,
                },
                {
                    type: 'Europe',
                    name: '2050',
                    value: 628,
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
        elemBaseProperties,
        chartProperties: {
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
                {
                    name: '分类四',
                    value: [58, 155],
                },
                {
                    name: '分类五',
                    value: [45, 120],
                },
                {
                    name: '分类六',
                    value: [23, 99],
                },
                {
                    name: '分类七',
                    value: [18, 56],
                },
                {
                    name: '分类八',
                    value: [18, 34],
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
        elemBaseProperties,
        chartProperties: {
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
                {
                    name: '1994',
                    value: 5,
                    type: 'Lon',
                },
                {
                    name: '1995',
                    value: 4.9,
                    type: 'Lon',
                },
                {
                    name: '1996',
                    value: 6,
                    type: 'Lon',
                },
                {
                    name: '1997',
                    value: 7,
                    type: 'Lon',
                },
                {
                    name: '1998',
                    value: 9,
                    type: 'Lon',
                },
                {
                    name: '1999',
                    value: 13,
                    type: 'Lon',
                },
                {
                    name: '1991',
                    value: 3,
                    type: 'Bor',
                },
                {
                    name: '1992',
                    value: 4,
                    type: 'Bor',
                },
                {
                    name: '1993',
                    value: 3.5,
                    type: 'Bor',
                },
                {
                    name: '1994',
                    value: 5,
                    type: 'Bor',
                },
                {
                    name: '1995',
                    value: 4.9,
                    type: 'Bor',
                },
                {
                    name: '1996',
                    value: 6,
                    type: 'Bor',
                },
                {
                    name: '1997',
                    value: 7,
                    type: 'Bor',
                },
                {
                    name: '1998',
                    value: 9,
                    type: 'Bor',
                },
                {
                    name: '1999',
                    value: 13,
                    type: 'Bor',
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
