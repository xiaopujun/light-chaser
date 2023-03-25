import {HeaderItem, HeaderItemProps} from "./HeaderItem";
import React from "react";
import {SettingFilled} from "@ant-design/icons";

/**
 * header-项目设置
 */
export default class ProjectSetItem extends HeaderItem {
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
