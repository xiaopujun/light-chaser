import {AbstractConfig} from "../../../interf/AbstractConfig";
import {MenuInfo} from "../../../designer/right/menu-list/AbstractMenu";
import {PictureFilled} from "@ant-design/icons";
import LcBgConfigContent from "./LcBgConfigContent";
import React from "react";

export default class LcBgConfig extends AbstractConfig {
    getMenuList(): Array<MenuInfo> {
        return [
            {
                icon: PictureFilled,
                name: '背景',
                key: 'background',
            },
        ];
    }

    getMenuToConfigContentMap(): { [p: string]: React.Component | React.FC | any } {
        return {
            'background': LcBgConfigContent,
        };
    }

}