import {AbstractConfig} from "../../../../types/AbstractConfig";
import {MenuInfo} from "../../../../designer/right/menu-list/AbstractMenu";
import {VideoCameraFilled} from "@ant-design/icons";
import LcBgConfigContent from "./LcBgConfigContent";
import React from "react";

class LcBgConfig extends AbstractConfig {
    getMenuList(): Array<MenuInfo> {
        return [
            {
                icon: VideoCameraFilled,
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