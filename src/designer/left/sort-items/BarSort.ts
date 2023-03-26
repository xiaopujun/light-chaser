import {AbstractSortItem, SortEnum} from "../types/SortItemTypes";
import {AlignLeftOutlined} from "@ant-design/icons";

export default class BarSort extends AbstractSortItem {
    getSortItemInfo() {
        return {
            icon: AlignLeftOutlined,
            name: "条形图",
            sort: SortEnum.BAR,
        };
    }
}