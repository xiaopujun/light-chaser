import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseTextImg from './base-text.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseText} from "./BaseText";
import {BaseTextComponentProps} from "./BaseTextComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {BaseTextDataConfig, BaseTextStyleConfig} from "./BaseTextConfig";

export default class BaseTextDefinition extends AbstractCustomComponentDefinition<BaseText, BaseMenuMapping, BaseTextComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础文本",
            compKey: "LcBaseText",
            type: "基础",
            typeKey: "base",
            desc: "标准提供的基础文本",
        };
    }

    getChartImg(): string | null {
        return baseTextImg;
    }

    getComponent(): ClazzTemplate<BaseText> | null {
        return BaseText;
    }

    getInitConfig(): BaseTextComponentProps {
        return {
            info: {
                id: "",
                name: '基础文本',
                type: 'LcBaseText',
                desc: '标准提供的基础文本',
            },
            style: {
                color: '#fff',
                fontSize: 32,
                alignItems: 'center',
                justifyContent: 'space-around',
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: "文本"
                },
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => item.key !== 'theme');
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        return {
            info: BaseInfo,
            data: BaseTextDataConfig,
            style: BaseTextStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}