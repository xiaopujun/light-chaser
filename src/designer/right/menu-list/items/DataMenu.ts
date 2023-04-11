import {DatabaseFilled} from "@ant-design/icons";
import {AbstractMenu, MenuInfo} from "../AbstractMenu";

export default class DataMenu extends AbstractMenu {
    getMenuInfo(): MenuInfo {
        return {
            icon: DatabaseFilled,
            name: '数据',
            key: 'data',
        }
    }
}