import {cloneDeep} from 'lodash';

//堆叠面积图初始化数据和配置
export const initAntdStackArea = () => {
    return cloneDeep({
        elemBasePeoperties: {
            paddingTop: '15px',
            paddingLeft: '15px',
            paddingBottom: '15px',
            paddingRight: '15px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
            data: [],
            xField: 'year',
            yField: 'value',
            seriesField: 'category',
            color: ['#6897a7', '#8bc0d6', '#60d7a7', '#dedede', '#fedca9', '#fab36f', '#d96d6f'],
            legend: {
                position: 'top',
            },
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
                label: {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                },
            },

        }
    });
};

