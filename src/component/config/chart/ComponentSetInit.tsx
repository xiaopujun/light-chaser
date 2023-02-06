import {lcCompSets} from "../../designer";


export default function getChartsConfig(chartSetName: string) {
    chartSetName += "Set";
    if (chartSetName in lcCompSets) {
        return lcCompSets[chartSetName];
    } else {
        return null;
    }
}
