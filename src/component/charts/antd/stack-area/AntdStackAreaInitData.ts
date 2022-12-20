import {cloneDeep} from 'lodash';

//堆叠面积图初始化数据和配置
const AntdStackAreaInitData = () => {
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
export default AntdStackAreaInitData;


