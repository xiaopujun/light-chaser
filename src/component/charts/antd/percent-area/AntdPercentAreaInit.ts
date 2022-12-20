import {cloneDeep} from 'lodash';

//百分比面积图初始化数据和配置
const AntdPercentAreaInit = () => {
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
export default AntdPercentAreaInit;

