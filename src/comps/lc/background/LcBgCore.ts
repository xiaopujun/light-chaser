import {AbstractComponentDefinitionCore,} from "../../../framework/abstract/AbstractComponentDefinitionCore";
import {BaseInfoType, ElemConfig, ThemeItemType} from "../../../framework/types/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import {PictureFilled} from "@ant-design/icons";
import React from "react";
import BgConfigContent from "./BgConfigContent";

class LcBgCore extends AbstractComponentDefinitionCore {
    updateTheme = (newTheme: ThemeItemType, sourceStyle: any) => {
    };

    getBaseInfo(): BaseInfoType | null {
        return null;
    }

    getChartImg(): any {
        return null;
    }

    getComponent(): any {
        return null;
    }

    getInitConfig(): ElemConfig | Object | null {
        return null;
    }

    getKey(): string {
        return "LcBg";
    }

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
            'background': BgConfigContent,
        };
    }

}

export default LcBgCore;