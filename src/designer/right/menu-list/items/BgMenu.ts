import {PictureFilled} from "@ant-design/icons";
import {AbstractMenu, MenuInfo} from "../AbstractMenu";

export default class BgMenu extends AbstractMenu {
    getMenuInfo(): MenuInfo {
        return {
            icon: PictureFilled,
            name: '背景',
            key: 'bg',
        }
    }
}