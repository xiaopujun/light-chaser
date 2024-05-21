import {ComponentType} from "react";

export interface MenuInfo {
    //图标
    icon: ComponentType;
    //名称
    name: string;
    //标识
    key: string;
    //点击事件
    onClick?: (menuKey: string) => void;
}