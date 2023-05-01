import {AbstractHeaderItem, HeaderItemProps} from "../../../types/HeaderTypes";
import {EyeFilled} from "@ant-design/icons";

/**
 * header-预览
 */
export default class PreViewHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: EyeFilled,
            name: '预览',
            onClick: () => {
                alert("预览");
            }
        };
    }
}
