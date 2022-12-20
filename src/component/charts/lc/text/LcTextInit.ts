import {cloneDeep} from 'lodash';

//词云图初始化数据和配置
const LcTextInit = () => {
    return cloneDeep({
        baseInfo: {
            name: '文本',
            type: 'LcText'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            value: ''
        }
    });
};
export default LcTextInit;
