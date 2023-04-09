import {AbstractClassifyItem, ClassifyEnum, ClassifyItemProps} from "../ClassifyTypes";
import {AppstoreFilled} from "@ant-design/icons";

export default class AllClassify extends AbstractClassifyItem {
    getClassifyItemInfo(): ClassifyItemProps {
        return {
            icon: AppstoreFilled,
            name: "全部",
            classify: ClassifyEnum.ALL,
        };
    }
}