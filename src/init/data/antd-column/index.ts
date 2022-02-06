import {cloneDeep} from 'lodash';

//基础柱状图初始化数据和配置
export const initAntdBaseColumn = () => {
    return cloneDeep({
        elemBasePeoperties: {},
        chartProperties: {
            data: [
                {
                    name: '家具家电',
                    value: 38,
                },
                {
                    name: '粮油副食',
                    value: 52,
                },
                {
                    name: '生鲜水果',
                    value: 61,
                },
                {
                    name: '美容洗护',
                    value: 145,
                },
                {
                    name: '母婴用品',
                    value: 48,
                },
                {
                    name: '进口食品',
                    value: 38,
                },
                {
                    name: '食品饮料',
                    value: 38,
                },
                {
                    name: '家庭清洁',
                    value: 38,
                },
            ],
            xField: 'name',
            yField: 'value',
            xAxis: {
                label: {
                    autoHide: true,
                    autoRotate: false,
                },
            },
            meta: {
                type: {
                    alias: '类别',
                },
                value: {
                    alias: '销售额',
                },
            },
            color: 'rgb(0,255,234,0.2)',
            legend: false,
        }
    });
};

