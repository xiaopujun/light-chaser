import {HighlightFilled} from "@ant-design/icons";
import {AbstractMenu, MenuInfo} from "../AbstractMenu";

export default class StyleMenu extends AbstractMenu {
    getMenuInfo(): MenuInfo {
        return {
            icon: HighlightFilled,
            name: '样式',
            key: 'style',
        }
    }
}