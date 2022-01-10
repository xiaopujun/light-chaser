import * as _ from 'lodash';

//基础条形图初始化数据和配置
export const initAntdBaseBar = () => {
    return _.cloneDeep({
        elemBasePeoperties: {},
        chartProperties: {
            data: [
                {
                    year: '1951 年',
                    value: 38,
                },
                {
                    year: '1952 年',
                    value: 52,
                },
                {
                    year: '1956 年',
                    value: 61,
                },
                {
                    year: '1957 年',
                    value: 145,
                },
                {
                    year: '1958 年',
                    value: 48,
                },
            ],
            xField: 'value',
            yField: 'year',
            xAxis: {
                grid: {
                    line: {
                        style: {
                            stroke: 'rgba(0,255,192,0.59)',
                            lineWidth: 2,
                            lineDash: [4, 5],
                            strokeOpacity: 0.7,
                            shadowColor: 'black',
                            shadowBlur: 10,
                            shadowOffsetX: 5,
                            shadowOffsetY: 5,
                            cursor: 'pointer'
                        }
                    }
                },
                label: {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                },
            },
            yAxis: {
                grid: null,
                line: null,
                tickLine: null,
                label: {style: {fill: 'rgb(0,255,234)'}}
            },
            color: 'rgb(0,255,234)',
        }
    });
};

//分组条形图初始化数据和配置
export const antdGroupBar = {
    elemBasePeoperties: {},
    chartProperties: {
        data: [
            {
                label: 'Mon.',
                type: 'series1',
                value: 2800,
            },
            {
                label: 'Mon.',
                type: 'series2',
                value: 2260,
            },
            {
                label: 'Tues.',
                type: 'series1',
                value: 1800,
            },
            {
                label: 'Tues.',
                type: 'series2',
                value: 1300,
            },
            {
                label: 'Wed.',
                type: 'series1',
                value: 950,
            },
            {
                label: 'Wed.',
                type: 'series2',
                value: 900,
            },
            {
                label: 'Thur.',
                type: 'series1',
                value: 500,
            },
            {
                label: 'Thur.',
                type: 'series2',
                value: 390,
            },
            {
                label: 'Fri.',
                type: 'series1',
                value: 170,
            },
            {
                label: 'Fri.',
                type: 'series2',
                value: 100,
            },
        ],
        isGroup: true,
        xField: 'value',
        yField: 'label',
        xAxis: {
            grid: {
                line: {
                    style: {
                        stroke: 'rgba(0,255,192,0.59)',
                        lineWidth: 2,
                        lineDash: [4, 5],
                        strokeOpacity: 0.7,
                        shadowColor: 'black',
                        shadowBlur: 10,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        cursor: 'pointer'
                    }
                }
            },
            label: {
                style: {
                    fill: 'rgb(0,255,234)'
                },
            },
        },
        yAxis: {
            grid: null,
            line: null,
            tickLine: null,
            label: {style: {fill: 'rgb(0,255,234)'}}
        },
        seriesField: 'type',
        marginRatio: 0,
        legend: {visible: false},
        color: ['#00ffac', '#46a1ad'],
    }
};
//百分比条形图初始化数据和配置
export const antdPercentBar = {
    elemBasePeoperties: {},
    chartProperties: {
        data: [
            {
                country: 'Asia',
                year: '1750',
                value: 502,
            },
            {
                country: 'Asia',
                year: '1800',
                value: 635,
            },
            {
                country: 'Asia',
                year: '1850',
                value: 809,
            },
            {
                country: 'Asia',
                year: '1900',
                value: 947,
            },
            {
                country: 'Asia',
                year: '1950',
                value: 1402,
            },
            {
                country: 'Asia',
                year: '1999',
                value: 3634,
            },
            {
                country: 'Asia',
                year: '2050',
                value: 5268,
            },
            {
                country: 'Africa',
                year: '1750',
                value: 106,
            },
            {
                country: 'Africa',
                year: '1800',
                value: 107,
            },
            {
                country: 'Africa',
                year: '1850',
                value: 111,
            },
            {
                country: 'Africa',
                year: '1900',
                value: 133,
            },
            {
                country: 'Africa',
                year: '1950',
                value: 221,
            },
            {
                country: 'Africa',
                year: '1999',
                value: 767,
            },
            {
                country: 'Africa',
                year: '2050',
                value: 1766,
            },
            {
                country: 'Europe',
                year: '1750',
                value: 163,
            },
            {
                country: 'Europe',
                year: '1800',
                value: 203,
            },
            {
                country: 'Europe',
                year: '1850',
                value: 276,
            },
            {
                country: 'Europe',
                year: '1900',
                value: 408,
            },
            {
                country: 'Europe',
                year: '1950',
                value: 547,
            },
            {
                country: 'Europe',
                year: '1999',
                value: 729,
            },
            {
                country: 'Europe',
                year: '2050',
                value: 628,
            },
        ],
        xField: 'value',
        yField: 'year',
        seriesField: 'country',
        isPercent: true,
        isStack: true,
        xAxis: {
            grid: {
                line: {
                    style: {
                        stroke: 'rgba(0,255,192,0.59)',
                        lineWidth: 2,
                        lineDash: [4, 5],
                        strokeOpacity: 0.7,
                        shadowColor: 'black',
                        shadowBlur: 10,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        cursor: 'pointer'
                    }
                }
            },
            label: {
                style: {
                    fill: 'rgb(0,255,234)'
                },
            },
        },
        yAxis: {
            grid: null,
            line: null,
            tickLine: null,
            label: {style: {fill: 'rgb(0,255,234)'}}
        },
    }
};
//区间条形图初始化数据和配置
export const antdZoneBar = {
    elemBasePeoperties: {},
    chartProperties: {
        data: [
            {
                type: '分类一',
                values: [76, 100],
            },
            {
                type: '分类二',
                values: [56, 108],
            },
            {
                type: '分类三',
                values: [38, 129],
            },
            {
                type: '分类四',
                values: [58, 155],
            },
            {
                type: '分类五',
                values: [45, 120],
            },
            {
                type: '分类六',
                values: [23, 99],
            },
            {
                type: '分类七',
                values: [18, 56],
            },
            {
                type: '分类八',
                values: [18, 34],
            },
        ],
        xField: 'values',
        yField: 'type',
        isRange: true,
        xAxis: {
            grid: {
                line: {
                    style: {
                        stroke: 'rgba(0,255,192,0.59)',
                        lineWidth: 2,
                        lineDash: [4, 5],
                        strokeOpacity: 0.7,
                        shadowColor: 'black',
                        shadowBlur: 10,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        cursor: 'pointer'
                    }
                }
            },
            label: {
                style: {
                    fill: 'rgb(0,255,234)'
                },
            },
        },
        yAxis: {
            grid: null,
            line: null,
            tickLine: null,
            label: {style: {fill: 'rgb(0,255,234)'}}
        },
        color: 'rgb(0,255,234)',
    }
};
//堆叠条形图初始化数据和配置
export const antdStackBar = {
    elemBasePeoperties: {},
    chartProperties: {
        data: [
            {
                year: '1991',
                value: 3,
                type: 'Lon',
            },
            {
                year: '1992',
                value: 4,
                type: 'Lon',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Lon',
            },
            {
                year: '1994',
                value: 5,
                type: 'Lon',
            },
            {
                year: '1995',
                value: 4.9,
                type: 'Lon',
            },
            {
                year: '1996',
                value: 6,
                type: 'Lon',
            },
            {
                year: '1997',
                value: 7,
                type: 'Lon',
            },
            {
                year: '1998',
                value: 9,
                type: 'Lon',
            },
            {
                year: '1999',
                value: 13,
                type: 'Lon',
            },
            {
                year: '1991',
                value: 3,
                type: 'Bor',
            },
            {
                year: '1992',
                value: 4,
                type: 'Bor',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Bor',
            },
            {
                year: '1994',
                value: 5,
                type: 'Bor',
            },
            {
                year: '1995',
                value: 4.9,
                type: 'Bor',
            },
            {
                year: '1996',
                value: 6,
                type: 'Bor',
            },
            {
                year: '1997',
                value: 7,
                type: 'Bor',
            },
            {
                year: '1998',
                value: 9,
                type: 'Bor',
            },
            {
                year: '1999',
                value: 13,
                type: 'Bor',
            },
        ],
        isStack: true,
        xField: 'value',
        yField: 'year',
        seriesField: 'type',
        xAxis: {
            grid: {
                line: {
                    style: {
                        stroke: 'rgba(0,255,192,0.59)',
                        lineWidth: 2,
                        lineDash: [4, 5],
                        strokeOpacity: 0.7,
                        shadowColor: 'black',
                        shadowBlur: 10,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        cursor: 'pointer'
                    }
                }
            },
            label: {
                style: {
                    fill: 'rgb(0,255,234)'
                },
            },
        },
        yAxis: {
            grid: null,
            line: null,
            tickLine: null,
            label: {style: {fill: 'rgb(0,255,234)'}}
        },
    }
};