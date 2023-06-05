import {AbstractHeaderItem, HeaderItemProps} from "../../../../framework/types/HeaderTypes";
import {SkinFilled} from "@ant-design/icons";
import headerStore from "../../HeaderStore";

/**
 * header-主题设置
 */
export default class ThemeHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        const {setThemeVisible} = headerStore;
        return {
            icon: SkinFilled,
            name: '主题设置',
            order: 2,
            onClick: () => {
                setThemeVisible(true);
            }
        };
    }
}
