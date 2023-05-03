import {AbstractHeaderItem, HeaderItemProps} from "../../../framework/types/HeaderTypes";
import {SkinFilled} from "@ant-design/icons";

/**
 * header-主题设置
 */
export default class ThemeHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: SkinFilled,
            name: '主题设置',
            onClick: () => {
                alert("主题设置");
            }
        };
    }
}
