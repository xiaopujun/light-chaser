import {lazy} from "react";
import LcTextSet from "../lc/LcTextSet";

const AntdBarSet = lazy(() => import('./AntdBarSet'));
const AntdColumnSet = lazy(() => import('./AntdColumnSet'));
const AntdAreaSet = lazy(() => import('./AntdAreaSet'));
const AntdPieSet = lazy(() => import('./AntdPieSet'));
const AntdLiquidSet = lazy(() => import('./AntdLiquidSet'));
const AntdRadarSet = lazy(() => import('./AntdRadarSet'));
const AntdScatterSet = lazy(() => import('./AntdScatterSet'));
const AntdBubbleSet = lazy(() => import('./AntdBubbleSet'));
const AntdWordCloudSet = lazy(() => import('./AntdWordCloudSet'));
const AntdFoldLineSet = lazy(() => import('./AntdLineSet'));
const AntdGaugeSet = lazy(() => import('./AntdGaugeSet'));

let configMap = new Map();

configMap.set("AntdBaseBar", AntdBarSet);
configMap.set("AntdGroupBar", AntdBarSet);
configMap.set("AntdPercentBar", AntdBarSet);
configMap.set("AntdZoneBar", AntdBarSet);
configMap.set("AntdStackBar", AntdBarSet);

configMap.set("AntdBaseColumn", AntdColumnSet);
configMap.set("AntdGroupColumn", AntdColumnSet);
configMap.set("AntdPercentColumn", AntdColumnSet);
configMap.set("AntdZoneColumn", AntdColumnSet);
configMap.set("AntdStackColumn", AntdColumnSet);

configMap.set("AntdStackArea", AntdAreaSet);
configMap.set("AntdPie", AntdPieSet);
configMap.set("AntdLiquid", AntdLiquidSet);
configMap.set("AntdRadar", AntdRadarSet);
configMap.set("AntdScatter", AntdScatterSet);
configMap.set("AntdBubbles", AntdBubbleSet);
configMap.set("AntdBaseArea", AntdAreaSet);
configMap.set("AntdPercentArea", AntdAreaSet);
configMap.set("AntdWordCloud", AntdWordCloudSet);
configMap.set("AntdBaseFoldLine", AntdFoldLineSet);
configMap.set("AntdStepFoldLine", AntdFoldLineSet);
configMap.set("AntdMuchFoldLine", AntdFoldLineSet);
configMap.set("AntdMuchFoldLine", AntdFoldLineSet);
configMap.set("AntdRadar", AntdRadarSet);
configMap.set("AntdGauge", AntdGaugeSet);
configMap.set("LcText", LcTextSet);

export default function getChartsConfig(chartSetName: string) {
    if ("" !== chartSetName && configMap.has(chartSetName)) {
        return configMap.get(chartSetName);
    } else {
        throw new Error("name was null string or map don't has this config, it should be charts config's name");
    }
}
