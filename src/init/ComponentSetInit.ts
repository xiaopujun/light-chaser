import AntdBarSet from "../component/config/chart/antd_bar";
import AntdColumnSet from "../component/config/chart/antd_column";
import AntdAreaSet from "../component/config/chart/antd_area";
import AntdPieSet from "../component/config/chart/antd_pie";
import AntdLiquidSet from "../component/config/chart/antd_liquid";
import AntdRadarSet from "../component/config/chart/antd_radar";
import AntdScatterSet from "../component/config/chart/antd_scatter";

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

export default function getChartsConfig(chartSetName: string) {
    if ("" !== chartSetName && configMap.has(chartSetName)) {
        return configMap.get(chartSetName);
    } else {
        throw new Error("name was null string or map don't has this config, it should be charts config's name");
    }
}
