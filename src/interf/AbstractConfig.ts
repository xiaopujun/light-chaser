import React from "react";
import {MenuInfo} from "../designer/right/menu-list/AbstractMenu";

export abstract class AbstractConfig {
    /**
     * 获取右侧菜单列表
     */
    abstract getMenuList(): Array<MenuInfo>;

    /**
     * 获取右侧菜单对应的配置内容的映射关系
     */
    abstract getMenuToConfigContentMap(): { [key: string]: React.Component | React.FC | any };
}