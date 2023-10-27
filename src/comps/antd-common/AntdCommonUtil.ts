import AbstractController from "../../framework/core/AbstractController";
import {Option} from "../../ui/select/SelectType";

export default class AntdCommonUtil {
    public static getDataFieldOptions(controller: AbstractController) {
        const config = controller.getConfig();
        const data = config?.data?.staticData?.data;
        const options: Option[] = [];
        if (data && data.length >= 1) {
            const dataObj = data[0];
            Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
        }
        return options;
    }
}