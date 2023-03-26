import {HeaderItem, HeaderItemProps} from "../types/HeaderItem";
import {SettingFilled} from "@ant-design/icons";

/**
 * header-画布设置
 */
export default class CanvasHdItem extends HeaderItem {
    getHeaderItem(): HeaderItemProps {
        return {
            icon: SettingFilled,
            title: '画布设置',
            onClick: () => {
                alert("画布设置");
            }
        };
    }
}
