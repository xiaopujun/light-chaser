import {cloneDeep} from 'lodash';

//基础条形图初始化数据和配置
const AntdZoneBarInitData = () => {
    return cloneDeep({
        baseInfo: {
            name: '区间条形图',
            type: 'AntdZoneBar'
        },
        baseStyle: {
            padding: '10px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
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
            ],
            xField: 'value',
            yField: 'name',
            isRange: true,
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
            color: ['rgb(0,255,234)', '#fff'],
            seriesField: 'name',
            maxBarWidth: 8,
            legend: false,
        }
    });
};

export default AntdZoneBarInitData;