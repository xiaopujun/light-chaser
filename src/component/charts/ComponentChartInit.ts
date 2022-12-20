import {lazy} from "react";
import LcText from "./lc/text/LcText";
import LcColorBlock from "./lc/colorblock/LcColorBlock";
import {lcComps} from "../designer";

const AntdRadar = lazy(() => import('./antd/radar/AntdRadar'));
const AntdGauge = lazy(() => import('./antd/gauge/AntdGauge'));

let chartsMap = new Map();

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
