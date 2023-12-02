import {
    AbstractDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseColorBlockImg from './base-color-block.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseColorBlockController} from "./BaseColorBlockController";
import {BaseColorBlockComponentProps} from "./BaseColorBlockComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {BaseColorBlockConfig} from "./BaseColorBlockConfig";

export default class BaseColorBlockDefinition extends AbstractDefinition<BaseColorBlockController, BaseColorBlockComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础色块",
            compKey: "LcBaseColorBlock",
            type: "基础",
            typeKey: "base",
        };
    }

    getChartImg(): string | null {
        return baseColorBlockImg;
    }

    getComponent(): ClazzTemplate<BaseColorBlockController> | null {
        return BaseColorBlockController;
    }

    getInitConfig(): BaseColorBlockComponentProps {
        return {
            base: {
                id: "",
                name: '基础色块',
                type: 'LcBaseColorBlock',
            },
            style: {
                background: '#009DFF33',
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: BaseColorBlockConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}