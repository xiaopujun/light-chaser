import {
    AbstractCustomComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractCustomComponentDefinition";
import BaseImage, {BaseImageComponentProps} from "./BaseImage";
import {BaseInfoType} from "../../../designer/DesignerType";
import baseImage from './baseImage.png';
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import {BaseImageStyleConfig} from "./BaseImageConfig";

export default class BaseImageDefinition extends AbstractCustomComponentDefinition<BaseImage, BaseImageComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础图片",
            compKey: "LcBaseImage",
            type: "基础",
            typeKey: "base",
            desc: "标准提供的基础图片",
        };
    }

    getChartImg(): string | null {
        return baseImage;
    }

    getComponent(): ClazzTemplate<BaseImage> | null {
        return BaseImage;
    }

    getInitConfig(): BaseImageComponentProps {
        return {
            info: {
                id: "",
                name: '基础图片',
                type: 'LcBaseImage',
                desc: '标准提供的基础图片',
            },
            style: {
                src: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            style: BaseImageStyleConfig,
            // animation: AnimationConfig,
            // theme: ThemeConfig
        };
    }


}