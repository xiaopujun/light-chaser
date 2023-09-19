import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {SaveFilled} from "@ant-design/icons";
import {doSave} from "../../../operate-provider/hot-key/HotKeyImpl";

/**
 * header-保存
 */
export default class SaveHdItem extends AbstractHeaderItem {

    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: SaveFilled,
            name: '保存',
            order: 3,
            onClick: () => {
                doSave();
            }
        }
    }
}
