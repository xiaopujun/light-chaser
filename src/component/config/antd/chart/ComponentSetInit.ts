import AntdBarSet from "./antd_bar";
import AntdColumnSet from "./antd_column";
import AntdAreaSet from "./antd_area";
import AntdPieSet from "./antd_pie";
import AntdLiquidSet from "./antd_liquid";
import AntdRadarSet from "./antd_radar";
import AntdScatterSet from "./antd_scatter";
import AntdBubbleSet from "./antd_bubblle";
import AntdWordCloudSet from "./antd_wordcloud";
import AntdFoldLineSet from "./antd_line";

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

export default function getChartsConfig(chartSetName: string) {
    if ("" !== chartSetName && configMap.has(chartSetName)) {
        return configMap.get(chartSetName);
    } else {
        throw new Error("name was null string or map don't has this config, it should be charts config's name");
    }
}
