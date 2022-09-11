import AntdArea from "./antd/area";
import AntdBar from "./antd/bar";
import AntdColumn from "./antd/column";
import AntdPie from "./antd/pie";
import AntdScatter from "./antd/scatter";
import AntdWordCloud from "./antd/wordcloud";
import AntdLine from "./antd/line";
import AntdLiquid from "./antd/liquid";
import AntdRadar from "./antd/radar";
import AntdGauge from "./antd/gauge";

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
