import {initAntdBaseBar, initAntdGroupBar, initAntdPercentBar, initAntdStackBar, initAntdZoneBar} from "./AntdBarDataInit";
import {
    initAntdBaseColumn,
    initAntdGroupColumn,
    initAntdPercentColumn,
    initAntdStackColumn,
    initAntdZoneColumn
} from "./AntdColumnDataInit";
import {initAntdPie, initAntdRing} from "./AntdPieDataInit";
import {initAntdBubbles, initAntdScatter} from "./AntdScatterDataInit";
import {initAntdStackArea, initAntdBaseArea, initAntdPercentArea} from "./AntdAreaDataInit";
import {initAntdWordCloud} from "./AntdWordCloudDataInit";
import {initAntdBaseFoldLine, initAntdMuchFoldLine, initAntdStepFoldLine} from "./AntdLineDataInit";
import {initAntdLiquid} from "./AntdLiquidDataInit";
import {initAntdRadar} from "./AntdRadarDataInit";
import {initAntdGauge} from "./AntdGaugeDataInit";


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
chartInitDataMap.set('AntdBaseFoldLine', initAntdBaseFoldLine);
chartInitDataMap.set('AntdStepFoldLine', initAntdStepFoldLine);
chartInitDataMap.set('AntdMuchFoldLine', initAntdMuchFoldLine);
chartInitDataMap.set('AntdLiquid', initAntdLiquid);
chartInitDataMap.set('AntdRadar', initAntdRadar);
chartInitDataMap.set('AntdGauge', initAntdGauge);
chartInitDataMap.set('AntdBaseArea', initAntdBaseArea);
chartInitDataMap.set('AntdPercentArea', initAntdPercentArea);

export default chartInitDataMap;