import {AbstractHeaderItem, HeaderItemProps} from "../types/HeaderTypes";
import {EyeOutlined} from "@ant-design/icons";

/**
 * header-预览
 */
export default class PreViewHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: EyeOutlined,
            name: '预览',
            onClick: () => {
                alert("预览");
            }
        };
    }
}
