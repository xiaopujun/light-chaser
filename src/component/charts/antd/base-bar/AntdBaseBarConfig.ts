import {AbstractConfig} from "../../interface/AbstractConfig";
import {getDefaultMenuList} from "../../../../designer/right/config-content/util";
import LcEmBaseInfo from "../../../config/info/LcEmBaseInfo";
import {MenuInfo} from "../../../../designer/right/menu-list/AbstractMenu";
import {ClassType} from "react";
import AntdBaseBarConfigContent from "./AntdBaseBarConfigContent";

export class AntdBaseBarConfig extends AbstractConfig {
    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): { [key: string]: ClassType<any, any, any> } {
        return {
            'info': LcEmBaseInfo,
            'style': AntdBaseBarConfigContent,
        };
    }
}