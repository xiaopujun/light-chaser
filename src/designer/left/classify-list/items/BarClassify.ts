import {AbstractClassifyItem, ClassifyEnum, ClassifyItemProps} from "../ClassifyTypes";
import {AlignLeftOutlined} from "@ant-design/icons";

export default class BarClassify extends AbstractClassifyItem {
    getClassifyItemInfo(): ClassifyItemProps {
        return {
            icon: AlignLeftOutlined,
            name: "条形图",
            classify: ClassifyEnum.BAR,
        };
    }
}