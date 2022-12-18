import {lazy} from "react";
import LcText from "./lc/text/LcText";
import LcColorBlock from "./lc/colorblock/LcColorBlock";
import {lcComps} from "../designer";

const AntdArea = lazy(() => import('./antd/AntdArea'));
const AntdBar = lazy(() => import('./antd/base-bar/AntdBaseBar'));
const AntdColumn = lazy(() => import('./antd/base-column/AntdBaseColumn'));
const AntdPie = lazy(() => import('./antd/AntdPie'));
const AntdScatter = lazy(() => import('./antd/AntdScatter'));
const AntdWordCloud = lazy(() => import('./antd/word-cloud/AntdWordCloud'));
const AntdLine = lazy(() => import('./antd/AntdLine'));
const AntdLiquid = lazy(() => import('./antd/AntdLiquid'));
const AntdRadar = lazy(() => import('./antd/AntdRadar'));
const AntdGauge = lazy(() => import('./antd/AntdGauge'));

let chartsMap = new Map();

chartsMap.set("AntdPie", AntdPie);
chartsMap.set("AntdRing", AntdPie);
chartsMap.set("AntdScatter", AntdScatter);
chartsMap.set("AntdBubbles", AntdScatter);
chartsMap.set("AntdBaseArea", AntdArea);
chartsMap.set("AntdStackArea", AntdArea);
chartsMap.set("AntdPercentArea", AntdArea);
chartsMap.set("AntdWordCloud", AntdWordCloud);
chartsMap.set("AntdBaseFoldLine", AntdLine);
chartsMap.set("AntdStepFoldLine", AntdLine);
chartsMap.set("AntdMuchFoldLine", AntdLine);
chartsMap.set("AntdLiquid", AntdLiquid);
chartsMap.set("AntdRadar", AntdRadar);
chartsMap.set("AntdGauge", AntdGauge);
chartsMap.set("LcText", LcText);
chartsMap.set("LcColorBlock", LcColorBlock);

export default function getChartsTemplate(classTemplateName: string) {
    if (classTemplateName in lcComps)
        return lcComps[classTemplateName];
    else {
        throw new Error("name was null string or map don't has this template, it should be charts template's name");
    }
}
