import {cloneDeep} from 'lodash';

//雷达图初始化数据和配置
export const initAntdRadar = () => {
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
            xField: 'item',
            yField: 'score',
            seriesField: 'user',
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
            },
            yAxis: {
                line: null,
                tickLine: null,
                grid: {
                    line: {
                        type: 'line',
                        style: {
                            lineDash: null,
                        },
                    },
                },
            },
            // 开启面积
            area: {},
            // 开启辅助点
            point: {
                size: 2,
            },
        }
    });
};

