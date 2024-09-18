import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import textScrollerImg from './text-scroller.png';
import {TextScrollerController} from "./TextScrollerController.ts";
import {TextScrollerComponentProps} from "./TextScrollerComponent.tsx";
import {TextScrollerConfig} from "./TextScrollerConfig.tsx";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";


export default class TextScrollerDefinition extends AbstractDesignerDefinition<TextScrollerController, TextScrollerComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "文字弹幕",
            compKey: "TextScroller",
            categorize: "info",
            subCategorize: "text",
            width: 320,
            height: 26,
        };
    }

    getChartImg(): string | null {
        return textScrollerImg;
    }

    getController(): ClazzTemplate<TextScrollerController> | null {
        return TextScrollerController;
    }

    getInitConfig(): TextScrollerComponentProps {
        return {
            base: {
                id: "",
                name: '文字弹幕',
                type: 'TextScroller',
            },
            style: {
                speed: 10,
                fontSize: 16,
                fontWeight: 500,
                color: '#fff',
                fontFamily: 'Arial',
            },
            filter: {
                enable: false,
                blur: 0,
                brightness: 1,
                contrast: 1,
                opacity: 1,
                saturate: 1,
                hueRotate: 0
            },
            data: {
                sourceType: 'static',
                staticData: '文字弹幕'
            }
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuMapping = super.getMenuToConfigContentMap();
        menuMapping['style'] = TextScrollerConfig;
        return menuMapping;
    }


    getEventList(): EventInfo[] {
        return [
            ...super.getEventList(),
            {
                id: "click",
                name: "点击时",
            }
        ]
    }
}