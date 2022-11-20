import {cloneDeep} from 'lodash';

//基础面积图初始化数据和配置
export const initAntdBaseArea = () => {
    return cloneDeep({
        baseInfo: {
            name: '基础面积图',
            type: 'AntdBaseArea'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [
                {
                    "name": "2006 Q3",
                    "value": 1
                },
                {
                    "name": "2006 Q4",
                    "value": 1.08
                },
                {
                    "name": "2007 Q1",
                    "value": 0.47
                },
                {
                    "name": "2007 Q2",
                    "value": 1.26
                },
                {
                    "name": "2007 Q3",
                    "value": 1.00
                },
            ],
            xField: 'name',
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
            type: 'AntdStackArea'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [
                {"type": "北美", "name": 1965, "value": 1390.5},
                {"type": "北美", "name": 1966, "value": 1469.5},
                {"type": "中南美", "name": 1965, "value": 109.2},
                {"type": "中南美", "name": 1966, "value": 115.7},
                {"type": "CIS 地区", "name": 1965, "value": 593.3},
                {"type": "CIS 地区", "name": 1966, "value": 630.9},
                {"type": "中东", "name": 1965, "value": 48.3},
                {"type": "中东", "name": 1966, "value": 50.4},
                {"type": "非洲", "name": 1965, "value": 60.6},
                {"type": "非洲", "name": 1966, "value": 63.3},
                {"type": "亚太地区", "name": 1965, "value": 441.6},
                {"type": "亚太地区", "name": 1966, "value": 482.9},
            ]
            ,
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
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
            type: 'AntdPercentArea'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [{
                "type": "Asia",
                "name": "1750",
                "value": 502
            }, {
                "type": "Asia",
                "name": "1800",
                "value": 635
            }, {
                "type": "Asia",
                "name": "1850",
                "value": 809
            }, {
                "type": "Africa",
                "name": "1750",
                "value": 106
            }, {
                "type": "Africa",
                "name": "1800",
                "value": 107
            }, {
                "type": "Africa",
                "name": "1850",
                "value": 111
            }, {
                "type": "Europe",
                "name": "1750",
                "value": 163
            }, {
                "type": "Europe",
                "name": "1800",
                "value": 203
            }, {
                "type": "Europe",
                "name": "1850",
                "value": 276
            }],
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
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

