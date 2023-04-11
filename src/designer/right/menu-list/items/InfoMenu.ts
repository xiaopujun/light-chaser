import {MediumCircleFilled} from "@ant-design/icons";
import {AbstractMenu, MenuInfo} from "../AbstractMenu";

export default class InfoMenu extends AbstractMenu {
    getMenuInfo(): MenuInfo {
        return {
            icon: MediumCircleFilled,
            name: '信息',
            key: 'info',
        }
    }
}