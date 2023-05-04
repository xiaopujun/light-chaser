import {AbstractHeaderItem, HeaderItemProps} from "../../../framework/types/HeaderTypes";
import {SettingFilled} from "@ant-design/icons";
import headerStore from "../HeaderStore";

/**
 * header-项目设置
 */
export default class ProjectHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        const {setProjectVisible} = headerStore;
        return {
            icon: SettingFilled,
            name: '项目设置',
            onClick: () => {
                setProjectVisible(true);
            }
        };
    }
}
