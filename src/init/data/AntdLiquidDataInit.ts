import {cloneDeep} from 'lodash';

//堆叠面积图初始化数据和配置
export const initAntdLiquid = () => {
    return cloneDeep({
        baseInfo: {
            name: '堆叠面积图',
            type: 'AntdLiquid'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            percent: 0.67,
            color: 'rgb(0,255,234)',
            outline: {
                border: 4,
                style: {
                    stroke: 'rgb(0,255,234)'
                }
            },
            wave: {
                length: 128,
            },
            statistic: {
                title: {
                    style: {
                        fill: '#00fce1',
                        fontSize: 14,
                    }
                },
                content: {
                    style: {
                        fill: '#00fce1',
                        fontSize: 14,
                        lineHeight: '44px'
                    }
                }

            }
        }
    });
};

