import {AbstractAutoScannerCore, BaseInfoType} from "../../../framework/abstract/AbstractAutoScannerCore";
import {ElemConfig, ThemeItemType} from "../../../framework/types/DesignerType";
import {MenuInfo} from "../../../framework/types/MenuType";
import {PictureFilled} from "@ant-design/icons";
import React from "react";
import BgConfigContent from "./BgConfigContent";
import ThemeItem from "../../../lib/common-fragment/theme-config/theme-item/ThemeItem";

class LcBgCore extends AbstractAutoScannerCore {
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