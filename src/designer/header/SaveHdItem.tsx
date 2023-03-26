import {HeaderItem, HeaderItemProps} from "./HeaderItem";
import {SaveOutlined} from "@ant-design/icons";

/**
 * header-保存
 */
export default class SaveHdItem extends HeaderItem {
    getHeaderItem(): HeaderItemProps {
        return {
            icon: SaveOutlined,
            title: '保存',
            onClick: () => {
                alert("保存");
            }
        };
    }
}
