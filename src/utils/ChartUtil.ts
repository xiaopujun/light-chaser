import {
    initAntdBaseBar,
    initAntdGroupBar,
    initAntdPercentBar,
    initAntdZoneBar,
    initAntdStackBar
} from '../init/data/antd-bar';

import {initAntdBaseColumn} from '../init/data/antd-column';

/**
 * 根据类型，获取图表初始化数据
 * @param type
 */
export function getChartInitData(type: string) {
    switch (type) {
        case "AntdBaseBar":
            return initAntdBaseBar();
        case "AntdGroupBar":
            return initAntdGroupBar();
        case "AntdPercentBar":
            return initAntdPercentBar();
        case "AntdZoneBar":
            return initAntdZoneBar();
        case "AntdStackBar":
            return initAntdStackBar();
        case "AntdBaseColumn":
            return initAntdBaseColumn();
        default:
            return null;
    }
}