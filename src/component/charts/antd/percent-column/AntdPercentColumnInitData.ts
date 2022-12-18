import {cloneDeep} from 'lodash';

//基础柱状图初始化数据和配置
export const AntdPercentColumnInitData = () => {
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
            xAxis: {
                grid: null,
                label: {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                },
                line: null,
                tickLine: null
            },
            yAxis: {
                grid: null,
                label: {
                    style: {
                        fill: 'rgb(0,255,234)'
                    },
                },
                line: null,
                tickLine: null
            },
            legend: false,
            maxColumnWidth: 8
        }
    });
};
export default AntdPercentColumnInitData;