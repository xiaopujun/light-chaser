import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {SettingFilled} from "@ant-design/icons";
import headerStore from "../../HeaderStore";

/**
 * header-画布设置
 */
export default class CanvasHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        const {setCanvasVisible} = headerStore;
        return {
            icon: SettingFilled,
            name: '画布设置',
            order: 1,
            onClick: () => {
                setCanvasVisible(true);
            }
        };
    }
}
