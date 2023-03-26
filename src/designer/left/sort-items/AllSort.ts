import {AbstractSortItem, SortEnum} from "../types/SortItemTypes";
import {AppstoreFilled} from "@ant-design/icons";

export default class AllSort extends AbstractSortItem {
    getSortItemInfo() {
        return {
            icon: AppstoreFilled,
            name: "全部",
            sort: SortEnum.ALL,
        };
    }
}