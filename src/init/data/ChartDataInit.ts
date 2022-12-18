import {
    initAntdBaseColumn,
    initAntdGroupColumn,
    initAntdPercentColumn,
    initAntdStackColumn,
    initAntdZoneColumn
} from "./AntdColumnDataInit";
import {initAntdPie, initAntdRing} from "./AntdPieDataInit";
import {initAntdBubbles, initAntdScatter} from "./AntdScatterDataInit";
import {initAntdBaseArea, initAntdPercentArea, initAntdStackArea} from "./AntdAreaDataInit";
import {initAntdBaseFoldLine, initAntdMuchFoldLine, initAntdStepFoldLine} from "./AntdLineDataInit";
import {initAntdLiquid} from "./AntdLiquidDataInit";
import {initAntdRadar} from "./AntdRadarDataInit";
import {initAntdGauge} from "./AntdGaugeDataInit";
import {initLcText} from "./LcTextDataInit";
import {initLcColorBlock} from "./LcColorBlockDataInit";


let chartInitDataMap = new Map();

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
chartInitDataMap.set('AntdBaseFoldLine', initAntdBaseFoldLine);
chartInitDataMap.set('AntdStepFoldLine', initAntdStepFoldLine);
chartInitDataMap.set('AntdMuchFoldLine', initAntdMuchFoldLine);
chartInitDataMap.set('AntdLiquid', initAntdLiquid);
chartInitDataMap.set('AntdRadar', initAntdRadar);
chartInitDataMap.set('AntdGauge', initAntdGauge);
chartInitDataMap.set('AntdBaseArea', initAntdBaseArea);
chartInitDataMap.set('AntdPercentArea', initAntdPercentArea);
chartInitDataMap.set('LcText', initLcText);
chartInitDataMap.set('LcColorBlock', initLcColorBlock);

export function getChartInitData(type: string) {
    if (chartInitDataMap.has(type)) {
        return chartInitDataMap.get(type)();
    } else {
        throw new Error('chartInitDataMap hos no relate init data');
    }
}
