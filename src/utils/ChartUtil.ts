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
import {initAntdScatter, initAntdBubbles} from '../init/data/antd-scatter';
import {initAntdStackArea} from '../init/data/antd-area';
import {initAntdWordCloud} from '../init/data/antd-wordcloud';
import {initAntdMuchFoldLine} from '../init/data/antd-line';
import {initAntdLiquid} from '../init/data/antd-liquid';

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
        case "AntdScatter":
            return initAntdScatter();
        case "AntdBubbles":
            return initAntdBubbles();
        case "AntdStackArea":
            return initAntdStackArea();
        case "AntdWordCloud":
            return initAntdWordCloud();
        case "AntdMuchFoldLine":
            return initAntdMuchFoldLine();
        case "AntdLiquid":
            return initAntdLiquid();
        default:
            return null;
    }
}