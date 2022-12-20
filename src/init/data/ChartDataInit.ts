import {
    initAntdBaseColumn,
    initAntdGroupColumn,
    initAntdPercentColumn,
    initAntdStackColumn,
    initAntdZoneColumn
} from "./AntdColumnDataInit";
import {initAntdPie, initAntdRing} from "../../component/charts/antd/pie/AntdPieInitData";
import {initAntdBubbles, initAntdScatter} from "../../component/charts/antd/scatter/AntdScatterInitData";
import {initAntdBaseFoldLine, initAntdMuchFoldLine, initAntdStepFoldLine} from "../../component/charts/antd/base-fold-line/AntdBaseLineDataInit";
import {initAntdRadar} from "../../component/charts/antd/radar/AntdRadarInitData";
import {initAntdGauge} from "../../component/charts/antd/gauge/AntdGaugeInitData";
import {initLcText} from "../../component/charts/lc/text/LcTextInitData";
import {initLcColorBlock} from "../../component/charts/lc/colorblock/LcColorBlockInitData";


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
chartInitDataMap.set('AntdBaseFoldLine', initAntdBaseFoldLine);
chartInitDataMap.set('AntdStepFoldLine', initAntdStepFoldLine);
chartInitDataMap.set('AntdMuchFoldLine', initAntdMuchFoldLine);
chartInitDataMap.set('AntdRadar', initAntdRadar);
chartInitDataMap.set('AntdGauge', initAntdGauge);
chartInitDataMap.set('LcText', initLcText);
chartInitDataMap.set('LcColorBlock', initLcColorBlock);

export function getChartInitData(type: string) {
    if (chartInitDataMap.has(type)) {
        return chartInitDataMap.get(type)();
    } else {
        throw new Error('chartInitDataMap hos no relate init data');
    }
}
