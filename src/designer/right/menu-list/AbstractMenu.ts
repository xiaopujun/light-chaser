import React from "react";

export abstract class AbstractMenu {
    abstract getMenuInfo(): MenuInfo;
}

export interface MenuInfo {
    //图标
    icon: React.Component | React.FC;
    //名称
    name: string;
    //标识
    key: string;
    //点击事件
    onClick?: (menuKey: string) => void;
}