import {AbstractCustomComponentDefinition,} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig, ThemeItemType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import {PictureFilled} from "@ant-design/icons";
import React from "react";
import BgConfigContent from "./BgConfigContent";

class LcBgCore extends AbstractCustomComponentDefinition<any, any> {
    updateTheme = (newTheme: ThemeItemType, sourceStyle: any) => {
    };

    getBaseInfo(): BaseInfoType | null {
        return {
            name: "背景（默认）",
            key: 'LcBg',
            typeName: "",
            typeKey: "",
            sourceName: "",
            sourceKey: "",
        };
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