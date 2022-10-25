import {lazy} from "react";

const AntdArea = lazy(() => import('./antd/AntdArea'));
const AntdBar = lazy(() => import('./antd/AntdBar'));
const AntdColumn = lazy(() => import('./antd/AntdColumn'));
const AntdPie = lazy(() => import('./antd/AntdPie'));
const AntdScatter = lazy(() => import('./antd/AntdScatter'));
const AntdWordCloud = lazy(() => import('./antd/AntdWordCloud'));
const AntdLine = lazy(() => import('./antd/AntdLine'));
const AntdLiquid = lazy(() => import('./antd/AntdLiquid'));
const AntdRadar = lazy(() => import('./antd/AntdRadar'));
const AntdGauge = lazy(() => import('./antd/AntdGauge'));

let chartsMap = new Map();

chartsMap.set("AntdBaseBar", AntdBar);
chartsMap.set("AntdGroupBar", AntdBar);
chartsMap.set("AntdPercentBar", AntdBar);
chartsMap.set("AntdZoneBar", AntdBar);
chartsMap.set("AntdStackBar", AntdBar);
chartsMap.set("AntdBaseColumn", AntdColumn);
chartsMap.set("AntdGroupColumn", AntdColumn);
chartsMap.set("AntdPercentColumn", AntdColumn);
chartsMap.set("AntdZoneColumn", AntdColumn);
chartsMap.set("AntdStackColumn", AntdColumn);
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

export default function getChartsTemplate(classTemplateName: string) {
    if ("" !== classTemplateName && chartsMap.has(classTemplateName)) {
        return chartsMap.get(classTemplateName);
    } else {
        throw new Error("name was null string or map don't has this template, it should be charts template's name");
    }
}
