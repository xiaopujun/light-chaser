import {AbstractHeaderItem, HeaderItemProps} from "../types/HeaderTypes";
import {SaveOutlined} from "@ant-design/icons";

/**
 * header-保存
 */
export default class SaveHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: SaveOutlined,
            name: '保存',
            onClick: () => {
                alert("保存");
            }
        };
    }
}
