import {AbstractConfig} from "../../../framework/abstract/AbstractConfig";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClassType} from "react";
import BaseInfo from "../../../lib/common-fragment/base-info/BaseInfo";
import {MenuInfo} from "../../../framework/types/MenuType";
import AntdBaseBarConfigStyle from "./AntdBaseBarConfigStyle";
import DataConfig from "../../../lib/common-fragment/data-config/DataConfig";
import ThemeConfig from "../../../lib/common-fragment/theme-config/ThemeConfig";
import AnimationConfig from "../../../lib/common-fragment/animation-config/AnimationConfig";

export default class AntdBaseBarConfig extends AbstractConfig {
    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): { [key: string]: ClassType<any, any, any> } {
        return {
            'info': BaseInfo,
            'style': AntdBaseBarConfigStyle,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }
}