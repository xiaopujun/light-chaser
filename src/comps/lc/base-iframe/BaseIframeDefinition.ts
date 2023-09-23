import {
    AbstractCustomComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseIframeImg from './base-iframe.png';
import {BaseIframe} from "./BaseIframe";
import {BaseIframeComponentProps} from "./BaseIframeComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import {BaseIframeStyleConfig} from "./BaseIframeConfig";
import {HighlightFilled, MediumCircleFilled} from "@ant-design/icons";

export default class BaseIframeDefinition extends AbstractCustomComponentDefinition<BaseIframe, BaseIframeComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础iframe",
            compKey: "LcBaseIframe",
            type: "基础",
            typeKey: "base",
            desc: "标准提供的基础iframe",
        };
    }

    getChartImg(): string | null {
        return baseIframeImg;
    }

    getComponent(): ClazzTemplate<BaseIframe> | null {
        return BaseIframe;
    }

    getInitConfig(): BaseIframeComponentProps {
        return {
            info: {
                id: "",
                name: '基础iframe',
                type: 'LcBaseIframe',
                desc: '标准提供的基础iframe',
            },
            style: {
                src: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return [
            {
                icon: MediumCircleFilled,
                name: '信息',
                key: 'info',
            },
            {
                icon: HighlightFilled,
                name: '样式',
                key: 'style',
            }
        ];
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            style: BaseIframeStyleConfig,
        };
    }
}