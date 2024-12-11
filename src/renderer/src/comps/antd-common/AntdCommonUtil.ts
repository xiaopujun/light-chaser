import AbstractController from "../../framework/core/AbstractController";
import {ISelectOption} from "../../json-schema/ui/select/Select";

export default class AntdCommonUtil {
    public static getDataFieldOptions(controller: AbstractController) {
        const config = controller.getConfig();
        const data = config?.data?.staticData;
        const options: ISelectOption[] = [];
        if (data && data.length >= 1) {
            const dataObj = data[0];
            Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
        }
        return options;
    }
}