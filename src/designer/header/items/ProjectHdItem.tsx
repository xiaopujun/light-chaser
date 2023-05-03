import {AbstractHeaderItem, HeaderItemProps} from "../../../framework/types/HeaderTypes";
import {SettingFilled} from "@ant-design/icons";

/**
 * header-项目设置
 */
export default class ProjectHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: SettingFilled,
            name: '项目设置',
            onClick: () => {
                alert("项目设置");
            }
        };
    }
}
