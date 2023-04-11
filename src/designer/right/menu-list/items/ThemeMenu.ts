import {SkinFilled} from "@ant-design/icons";
import {AbstractMenu, MenuInfo} from "../AbstractMenu";

export default class ThemeMenu extends AbstractMenu {
    getMenuInfo(): MenuInfo {
        return {
            icon: SkinFilled,
            name: '主题',
            key: 'theme',
        }
    }
}