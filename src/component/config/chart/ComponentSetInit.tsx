import {lazy} from "react";
import LcTextSet from "./lc/LcTextSet";

const AntdBarSet = lazy(() => import('./antd/AntdBarSet'));
const AntdColumnSet = lazy(() => import('./antd/AntdColumnSet'));
const AntdAreaSet = lazy(() => import('./antd/AntdAreaSet'));
const AntdPieSet = lazy(() => import('./antd/AntdPieSet'));
const AntdLiquidSet = lazy(() => import('./antd/AntdLiquidSet'));
const AntdRadarSet = lazy(() => import('./antd/AntdRadarSet'));
const AntdScatterSet = lazy(() => import('./antd/AntdScatterSet'));
const AntdBubbleSet = lazy(() => import('./antd/AntdBubbleSet'));
const AntdWordCloudSet = lazy(() => import('./antd/AntdWordCloudSet'));
const AntdFoldLineSet = lazy(() => import('./antd/AntdLineSet'));
const AntdGaugeSet = lazy(() => import('./antd/AntdGaugeSet'));
const DefaultSet = lazy(() => import('./DefaultSet'));

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
        return DefaultSet;
    }
}
