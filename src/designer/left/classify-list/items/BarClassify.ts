import {AlignLeftOutlined} from "@ant-design/icons";
import {ClassifyEnum, ClassifyItemProps} from "../../../../types/ClassifyType";
import {AbstractClassifyItem} from "../../../../interf/AbstractClassifyItem";

export default class BarClassify extends AbstractClassifyItem {
    getClassifyItemInfo(): ClassifyItemProps {
        return {
            icon: AlignLeftOutlined,
            name: "条形图",
            classify: ClassifyEnum.BAR,
        };
    }
}