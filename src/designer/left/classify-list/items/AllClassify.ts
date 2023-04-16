import {AppstoreFilled} from "@ant-design/icons";
import {ClassifyEnum, ClassifyItemProps} from "../../../../types/ClassifyType";
import {AbstractClassifyItem} from "../../../../interf/AbstractClassifyItem";

export default class AllClassify extends AbstractClassifyItem {
    getClassifyItemInfo(): ClassifyItemProps {
        return {
            icon: AppstoreFilled,
            name: "全部",
            classify: ClassifyEnum.ALL,
        };
    }
}