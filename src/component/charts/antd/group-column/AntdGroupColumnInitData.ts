import {cloneDeep} from 'lodash';

//基础柱状图初始化数据和配置
export const AntdGroupColumnInitData = () => {
    return cloneDeep({
        baseInfo: {
            name: '分组柱状图',
            type: 'AntdGroupColumn'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
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
            color: ['rgb(0,255,234)', 'rgb(233,118,9)'],
            legend: false,
            maxColumnWidth: 8
        }
    });
};
export default AntdGroupColumnInitData;