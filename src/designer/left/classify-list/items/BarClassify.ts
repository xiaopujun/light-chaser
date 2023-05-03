import {AlignLeftOutlined} from "@ant-design/icons";
import {ClassifyEnum, ClassifyItemProps} from "../../../../framework/types/ClassifyType";
import {AbstractClassifyItem} from "../../../../framework/abstract/AbstractClassifyItem";

export default class BarClassify extends AbstractClassifyItem {
    getClassifyItemInfo(): ClassifyItemProps {
        return {
            icon: AlignLeftOutlined,
            name: "条形图",
            classify: ClassifyEnum.BAR,
        };
    }
}