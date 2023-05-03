import {AbstractHeaderItem, HeaderItemProps} from "../../../framework/types/HeaderTypes";
import {SaveFilled} from "@ant-design/icons";

/**
 * header-保存
 */
export default class SaveHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: SaveFilled,
            name: '保存',
            onClick: () => {
                alert("保存");
            }
        };
    }
}
