import {cloneDeep} from 'lodash';

//基础柱状图初始化数据和配置
export const initAntdPie = () => {
    return cloneDeep({
        elemBaseProperties: {
            padding:'5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
            data: [
                {
                    name: '分类一',
                    value: 27,
                },
                {
                    name: '分类二',
                    value: 25,
                },
                {
                    name: '分类三',
                    value: 18,
                },
                {
                    name: '分类四',
                    value: 15,
                },
                {
                    name: '分类五',
                    value: 10,
                },
                {
                    name: '其他',
                    value: 5,
                },
            ],
            appendPadding: 10,
            angleField: 'value',
            colorField: 'name',
            color: ['#ff1616', '#ffc360', '#f8a5ff', '#2aff81', '#00ff48', '#ffc360'],
            radius: 0.75,
            statistic: {title: null, content: null},
            pieStyle: {stroke: null},
            label: {
                type: 'spider',
                labelHeight: 28,
                content: '{name}\n{percentage}',
                style: {fill: 'rgb(0,255,234)'},
            },
            interactions: [{
                type: 'element-selected',
            }, {
                type: 'element-active',
            }],
        }
    });
};
//基础柱状图初始化数据和配置
export const initAntdRing = () => {
    return cloneDeep({
        elemBaseProperties: {
            padding:'5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
            data: [
                {
                    name: '分类一',
                    value: 27,
                },
                {
                    name: '分类二',
                    value: 25,
                },
                {
                    name: '分类三',
                    value: 18,
                },
                {
                    name: '分类四',
                    value: 15,
                },
                {
                    name: '分类五',
                    value: 5,
                },
                {
                    name: '其他',
                    value: 5,
                },
            ],
            appendPadding: 10,
            angleField: 'value',
            colorField: 'name',
            radius: 1,
            innerRadius: 0.6,
            label: {
                type: 'inner',
                offset: '-50%',
                content: '{value}',
                style: {
                    textAlign: 'center',
                    fontSize: 14,
                    fill: 'rgb(0,255,234)'
                },
            },
            interactions: [{
                type: 'element-selected',
            }, {
                type: 'element-active',
            }],
            statistic: {
                title: false,
                content: {
                    style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: '#fff',
                    },
                },
            },
        }
    });
};
