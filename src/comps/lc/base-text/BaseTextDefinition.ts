import {
    AbstractDefinition, BaseInfoType, EventInfo,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseTextImg from './base-text.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseTextController} from "./BaseTextController";
import {BaseTextComponentProps} from "./BaseTextComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {BaseTextStyleConfig} from "./BaseTextConfig";

export default class BaseTextDefinition extends AbstractDefinition<BaseTextController, BaseTextComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础文本",
            compKey: "BaseText",
            categorize: "info",
            width: 64,
            height: 26,
        };
    }

    getChartImg(): string | null {
        return baseTextImg;
    }

    getController(): ClazzTemplate<BaseTextController> | null {
        return BaseTextController;
    }

    getInitConfig(): BaseTextComponentProps {
        return {
            base: {
                id: "",
                name: '基础文本',
                type: 'BaseText',
            },
            style: {
                color: '#a7a7a7',
                fontSize: 16,
                alignItems: 'center',
                justifyContent: 'center',
                strokeColor: '#ffffff',
                strokeWidth: 0,
                lineHeight: 1,
                letterSpacing: 0,
            },
            data: {
                sourceType: 'static',
                staticData: "基础文本"
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => item.key !== 'theme' && item.key !== 'mapping' && item.key !== 'data');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: BaseTextStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }


    getEventList(): EventInfo[] {
        const events = super.getEventList();
        return events.concat([
            {
                id: "click",
                name: "点击时",
            }
        ]);
    }
}