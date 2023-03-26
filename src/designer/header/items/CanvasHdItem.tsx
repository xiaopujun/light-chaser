import {AbstractHeaderItem, HeaderItemProps} from "../types/HeaderTypes";
import {SettingFilled} from "@ant-design/icons";

/**
 * header-画布设置
 */
export default class CanvasHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: SettingFilled,
            name: '画布设置',
            onClick: () => {
                alert("画布设置");
            }
        };
    }
}
