import {cloneDeep} from 'lodash';

//堆叠面积图初始化数据和配置
export const initAntdWordCloud = () => {
    return cloneDeep({
        elemBaseProperties: {
            paddingTop: '15px',
            paddingLeft: '15px',
            paddingBottom: '15px',
            paddingRight: '15px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProperties: {
            data:[],
            wordField: 'name',
            weightField: 'value',
            colorField: 'name',
            wordStyle: {
                fontFamily: 'Verdana',
                fontSize: [8, 32],
                rotation: 0,
            },
            // 返回值设置成一个 [0, 1) 区间内的值，
            // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
            random: () => 0.5,
        }
    });
};

