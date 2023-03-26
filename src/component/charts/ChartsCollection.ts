import {lcComps} from "../../designer/Scanner";

export default function getChartsTemplate(classTemplateName: string) {
    if (classTemplateName in lcComps)
        return lcComps[classTemplateName];
    else {
        throw new Error("name was null string or map don't has this template, it should be charts template's name " + classTemplateName);
    }
}
