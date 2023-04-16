import {lcCompConfigs} from "../../../designer/Scanner";


export default function getChartsConfig(chartSetName: string) {
    chartSetName += "Set";
    if (chartSetName in lcCompConfigs) {
        return lcCompConfigs[chartSetName];
    } else {
        return null;
    }
}
