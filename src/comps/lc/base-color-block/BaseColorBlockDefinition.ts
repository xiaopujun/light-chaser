import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseColorBlockImg from './base-color-block.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseColorBlock} from "./BaseColorBlock";
import {BaseColorBlockComponentProps} from "./BaseColorBlockComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {BaseColorBlockConfig} from "./BaseColorBlockConfig";

export default class BaseColorBlockDefinition extends AbstractCustomComponentDefinition<BaseColorBlock, Omit<BaseMenuMapping, 'data'>, BaseColorBlockComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础色块",
            compKey: "LcBaseColorBlock",
            type: "基础",
            typeKey: "base",
            desc: "标准提供的基础色块",
        };
    }

    getChartImg(): string | null {
        return baseColorBlockImg;
    }

    getComponent(): ClazzTemplate<BaseColorBlock> | null {
        return BaseColorBlock;
    }

    getInitConfig(): BaseColorBlockComponentProps {
        return {
            info: {
                id: "",
                name: '基础色块',
                type: 'LcBaseColorBlock',
                desc: '标准提供的基础色块',
            },
            style: {
                backgroundColor: '#009DFF33',
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data'));
    }

    getMenuToConfigContentMap(): Omit<BaseMenuMapping, 'data'> | null {
        return {
            info: BaseInfo,
            style: BaseColorBlockConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}