import {
    initAntdBaseBar,
    initAntdGroupBar,
    initAntdPercentBar,
    initAntdZoneBar,
    initAntdStackBar
} from '../init/data/antd-bar';

import {
    initAntdBaseColumn,
    initAntdPercentCloumn,
    initAntdZoneCloumn,
    initAntdGroupCloumn,
    initAntdStackColumn,
} from '../init/data/antd-column';

import {initAntdPie, initAntdRing} from '../init/data/antd-pie';

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
        case "AntdGroupColumn":
            return initAntdGroupCloumn();
        case "AntdPercentColumn":
            return initAntdPercentCloumn();
        case "AntdZoneColumn":
            return initAntdZoneCloumn();
        case "AntdStackColumn":
            return initAntdStackColumn();
        case "AntdPie":
            return initAntdPie();
        case "AntdRing":
            return initAntdRing();
        default:
            return null;
    }
}