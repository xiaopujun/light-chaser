import {ClassifyItemProps} from "../ClassifyType";

export abstract class AbstractClassifyItem {
    /**
     * 获取分类定义信息
     */
    abstract getClassifyItemInfo(): ClassifyItemProps;
}