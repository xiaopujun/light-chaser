import {cloneDeep} from 'lodash';

//堆叠面积图初始化数据和配置
const AntdGaugeInitData = () => {
    return cloneDeep({
        baseInfo: {
            name: '堆叠面积图',
            type: 'AntdGauge'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            percent: 0.75,
            range: {
                color: ['#30BF78'],
            },
            indicator: {
                pointer: {
                    style: {
                        stroke: '#D0D0D0',
                    },
                },
                pin: {
                    style: {
                        stroke: '#D0D0D0',
                    },
                },
            },
            statistic: {
                content: {
                    style: {
                        fontSize: '36px',
                        lineHeight: '36px',
                    },
                },
            },
        }
    });
};
export default AntdGaugeInitData;
