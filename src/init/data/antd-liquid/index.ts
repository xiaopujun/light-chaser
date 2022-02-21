import {cloneDeep} from 'lodash';

//堆叠面积图初始化数据和配置
export const initAntdLiquid = () => {
    return cloneDeep({
        elemBaseProperties: {
            paddingTop: '15px',
            paddingLeft: '15px',
            paddingBottom: '15px',
            paddingRight: '15px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
            percent: 0.25,
            outline: {
                border: 4,
                style: {
                    stroke: 'rgb(0,255,234)'
                }
            },
            liquidStyle: {
                fill: 'rgba(0,255,251,0.63)'
            },
            wave: {
                length: 128,
            },
            statistic: {
                content: {
                    style: {fontSize: 10}
                }

            }
        }
    });
};

