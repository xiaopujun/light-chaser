import {cloneDeep} from 'lodash';

//基础柱状图初始化数据和配置
export const initAntdBaseColumn = () => {
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
                    name: '家具家电',
                    value: 38,
                },
                {
                    name: '粮油副食',
                    value: 52,
                },
                {
                    name: '生鲜水果',
                    value: 61,
                },
                {
                    name: '美容洗护',
                    value: 145,
                },
                {
                    name: '母婴用品',
                    value: 48,
                },
                {
                    name: '进口食品',
                    value: 38,
                },
                {
                    name: '食品饮料',
                    value: 38,
                },
                {
                    name: '家庭清洁',
                    value: 38,
                },
            ],
            xField: 'name',
            yField: 'value',
            xAxis: {
                grid: null,
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
            color: 'rgb(0,255,234)',
            legend: false,
        }
    });
};

//堆叠柱状图初始化数据和配置
export const initAntdStackColumn = () => {
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
                    name: '1991',
                    value: 3,
                    type: 'Lon',
                },
                {
                    name: '1992',
                    value: 4,
                    type: 'Lon',
                },
                {
                    name: '1993',
                    value: 3.5,
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
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
            xAxis: {
                grid: null,
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
    });
};

//分组柱状图初始化数据和配置
export const initAntdGroupCloumn = () => {
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
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
            dodgePadding: 4,
            xAxis: {
                grid: null,
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
            color: ['rgb(0,255,234)', 'rgb(233,118,9)'],
            legend: false,
        }
    });
};

//百分比柱状图初始化数据和配置
export const initAntdPercentCloumn = () => {
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
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
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
    });
};

//区间柱状图初始化数据和配置
export const initAntdZoneCloumn = () => {
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
            xField: 'name',
            yField: 'value',
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
    });
};
