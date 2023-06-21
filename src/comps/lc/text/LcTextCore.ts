import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig, ThemeItemType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import textImg from './lc-text.png';
import React from "react";
import {getDefaultMenuList} from "../../../designer/right/util";
import BaseInfo from "../../../lib/common-fragment/base-info/BaseInfo";
import AnimationConfig from "../../../lib/common-fragment/animation-config/AnimationConfig";
import ThemeConfig from "../../../lib/common-fragment/theme-config/ThemeConfig";
import {LcTextDataConfig, LcTextStyleConfig} from "./LcTextConfig";

const LcText = React.lazy(() => import('./LcText'));

class LcTextCore extends AbstractCustomComponentDefinition {
    updateTheme = (newTheme: ThemeItemType, sourceStyle: any) => {

    };

    getBaseInfo(): BaseInfoType | null {
        return {
            name: "基础文本",
            key: 'LcText',
            typeName: "基础",
            typeKey: "base",
            sourceName: "Lc",
            sourceKey: "lc",
        };
    }

    getChartImg(): any {
        return textImg;
    }

    getComponent(): any {
        return LcText;
    }

    getInitConfig(): ElemConfig | Object | null {
        return {
            info: {
                id: '',
                name: '基础文本',
                type: 'LcText',
                des: 'Lc设计器默认文本组件',
            },
            style: {
                baseStyle: {
                    padding: "0px",
                    backgroundColor: "#0f273db5",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    fontSize: 40,
                    fontWeight: 500,
                    color: "#ffffff",
                }
            },
            data: {
                content: '文本',
            },
            animation: {},
        };
    }

    getKey(): string {
        return "LcText";
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList().filter((item: MenuInfo) => item.key !== 'theme');
    }

    getMenuToConfigContentMap(): { [p: string]: any } {
        return {
            'info': BaseInfo,
            'style': LcTextStyleConfig,
            'data': LcTextDataConfig,
            'animation': AnimationConfig,
        };
    }

}

export default LcTextCore;