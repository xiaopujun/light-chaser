import {initAntdBaseBar, initAntdGroupBar, initAntdPercentBar, initAntdStackBar, initAntdZoneBar} from "./antd-bar";
import {
    initAntdBaseColumn,
    initAntdGroupColumn,
    initAntdPercentColumn,
    initAntdStackColumn,
    initAntdZoneColumn
} from "./antd-column";
import {initAntdPie, initAntdRing} from "./antd-pie";
import {initAntdBubbles, initAntdScatter} from "./antd-scatter";
import {initAntdStackArea} from "./antd-area";
import {initAntdWordCloud} from "./antd-wordcloud";
import {initAntdMuchFoldLine} from "./antd-line";
import {initAntdLiquid} from "./antd-liquid";
import {initAntdRadar} from "./antd-radar";
import {initAntdGauge} from "./antd-gauge";


let chartInitDataMap = new Map();

chartInitDataMap.set('AntdBaseBar', initAntdBaseBar);
chartInitDataMap.set('AntdGroupBar', initAntdGroupBar);
chartInitDataMap.set('AntdPercentBar', initAntdPercentBar);
chartInitDataMap.set('AntdZoneBar', initAntdZoneBar);
chartInitDataMap.set('AntdStackBar', initAntdStackBar);
chartInitDataMap.set('AntdBaseColumn', initAntdBaseColumn);
chartInitDataMap.set('AntdGroupColumn', initAntdGroupColumn);
chartInitDataMap.set('AntdPercentColumn', initAntdPercentColumn);
chartInitDataMap.set('AntdZoneColumn', initAntdZoneColumn);
chartInitDataMap.set('AntdStackColumn', initAntdStackColumn);
chartInitDataMap.set('AntdPie', initAntdPie);
chartInitDataMap.set('AntdRing', initAntdRing);
chartInitDataMap.set('AntdScatter', initAntdScatter);
chartInitDataMap.set('AntdBubbles', initAntdBubbles);
chartInitDataMap.set('AntdStackArea', initAntdStackArea);
chartInitDataMap.set('AntdWordCloud', initAntdWordCloud);
chartInitDataMap.set('AntdMuchFoldLine', initAntdMuchFoldLine);
chartInitDataMap.set('AntdLiquid', initAntdLiquid);
chartInitDataMap.set('AntdRadar', initAntdRadar);
chartInitDataMap.set('AntdGauge', initAntdGauge);

export default chartInitDataMap;