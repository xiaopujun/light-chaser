import {cloneDeep} from 'lodash';

//词云图初始化数据和配置
export const initLcColorBlock = () => {
    return cloneDeep({
        baseInfo: {
            name: '颜色块',
            type: 'LcColorBlock'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {}
    });
};

