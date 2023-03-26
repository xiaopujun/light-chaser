import {HeaderItem, HeaderItemProps} from "../types/HeaderItem";
import {SkinFilled} from "@ant-design/icons";

/**
 * header-主题设置
 */
export default class ThemeHdItem extends HeaderItem {
    getHeaderItem(): HeaderItemProps {
        return {
            icon: SkinFilled,
            title: '主题设置',
            onClick: () => {
                alert("主题设置");
            }
        };
    }
}
