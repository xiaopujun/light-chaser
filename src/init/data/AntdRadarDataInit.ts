import {cloneDeep} from 'lodash';

//雷达图初始化数据和配置
export const initAntdRadar = () => {
        return cloneDeep({
            baseStyle: {
                padding: '10px',
                bgColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                data: [
                    {"name": "Design", "type": "a", "value": 70},
                    {"name": "Design", "type": "b", "value": 30},
                    {"name": "Development", "type": "a", "value": 60},
                    {"name": "Development", "type": "b", "value": 70},
                    {"name": "Marketing", "type": "a", "value": 50},
                    {"name": "Marketing", "type": "b", "value": 60},
                    {"name": "Users", "type": "a", "value": 40},
                    {"name": "Users", "type": "b", "value": 50},
                    {"name": "Test", "type": "a", "value": 60},
                    {"name": "Test", "type": "b", "value": 70},
                    {"name": "Language", "type": "a", "value": 70},
                    {"name": "Language", "type": "b", "value": 50},
                    {"name": "Technology", "type": "a", "value": 50},
                    {"name": "Technology", "type": "b", "value": 40},
                    {"name": "Support", "type": "a", "value": 30},
                    {"name": "Support", "type": "b", "value": 40},
                    {"name": "Sales", "type": "a", "value": 60},
                    {"name": "Sales", "type": "b", "value": 40},
                    {"name": "UX", "type": "a", "value": 50},
                    {"name": "UX", "type": "b", "value": 60}
                ]
                ,
                xField: 'name',
                yField: 'value',
                seriesField: 'type',
                meta: {
                    score: {
                        alias: '分数',
                        min: 0,
                        max: 80,
                    },
                },
                xAxis: {
                    line: null,
                    tickLine: null,
                    grid: {
                        line: {
                            style: {
                                lineDash: null,
                            },
                        },
                    },
                    label: {
                        style: {
                            fill: 'rgb(0,255,234)'
                        },
                    },
                },
                yAxis: {
                    line: null,
                    tickLine: null,
                    grid: {
                        line: {
                            style: {
                                lineDash: null,
                            },
                        },
                    },
                    label: {
                        style: {
                            fill: 'rgb(0,255,234)'
                        },
                    },
                },
                area: {},
                point: {
                    size: 2,
                },
                legend: {
                    itemName: {
                        style: {
                            fill: 'rgba(0,255,242,0.92)'
                        }
                    },
                }
            }
        });
    }
;

