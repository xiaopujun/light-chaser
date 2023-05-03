import {AbstractConfig} from "../../../framework/abstract/AbstractConfig";
import {PictureFilled} from "@ant-design/icons";
import LcBgConfigContent from "./LcBgConfigContent";
import React from "react";
import {MenuInfo} from "../../../framework/types/MenuType";

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