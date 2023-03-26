import {HeaderItem, HeaderItemProps} from "./HeaderItem";
import {SettingFilled} from "@ant-design/icons";

/**
 * header-项目设置
 */
export default class ProjectHdItem extends HeaderItem {
    getHeaderItem(): HeaderItemProps {
        return {
            icon: SettingFilled,
            title: '项目设置',
            onClick: () => {
                alert("项目设置");
            }
        };
    }
}
