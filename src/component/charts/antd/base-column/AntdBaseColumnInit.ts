import {cloneDeep} from 'lodash';


//基础柱状图初始化数据和配置
export const AntdBaseColumnInit = () => {
    return cloneDeep({
        baseInfo: {
            name: '基础柱状图',
            type: 'AntdBaseColumn'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [
                {
                    name: '家具家电',
                    value: 38,
                },
                {
                    name: '粮油副食',
                    value: 52,
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
            seriesField: 'name',
            color: 'rgb(0,255,234)',
            legend: false,
            maxColumnWidth: 8
        }
    });
};
export default AntdBaseColumnInit;

