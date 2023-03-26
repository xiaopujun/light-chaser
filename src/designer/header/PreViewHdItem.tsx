import {HeaderItem, HeaderItemProps} from "./HeaderItem";
import {EyeOutlined} from "@ant-design/icons";

/**
 * header-预览
 */
export default class PreViewHdItem extends HeaderItem {
    getHeaderItem(): HeaderItemProps {
        return {
            icon: EyeOutlined,
            title: '预览',
            onClick: () => {
                alert("预览");
            }
        };
    }
}
