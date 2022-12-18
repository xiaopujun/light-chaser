import {cloneDeep} from 'lodash';


//基础柱状图初始化数据和配置
export const AntdStackColumnInitData = () => {
    return cloneDeep({
        baseInfo: {
            name: '堆叠柱状图',
            type: 'AntdStackColumn'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [
                {
                    name: '1991',
                    value: 3,
                    type: 'Lon',
                },
                {
                    name: '1992',
                    value: 4,
                    type: 'Lon',
                },
            ],
            isStack: true,
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
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
            maxColumnWidth: 8
        }
    });
};
export default AntdStackColumnInitData;