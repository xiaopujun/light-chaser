import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ThemeItemType,} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import {PictureFilled} from "@ant-design/icons";
import React from "react";
import BackgroundConfig from "./BackgroundConfig";

class BackgroundDefinition extends AbstractCustomComponentDefinition {
    updateTheme = (newTheme: ThemeItemType, sourceStyle: any) => {
    };

    getBaseInfo(): BaseInfoType {
        return {
            compName: "",
            compKey: "LcBg",
            type: "",
            typeKey: "",
            desc: "",
        };
    }

    getChartImg(): any {
        return null;
    }

    getComponent(): any {
        return null;
    }

    getMenuList(): Array<MenuInfo> {
        return [
            {
                icon: PictureFilled,
                name: "背景",
                key: "background",
            },
        ];
    }

    getMenuToConfigContentMap(): { [p: string]: React.Component | React.FC | any; } {
        return {
            background: BackgroundConfig,
        };
    }
}

export default BackgroundDefinition;
