import {ActionInfo, BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseFormInput from './base-form-input.png';
import {BaseFormInputController} from "./BaseFormInputController.ts";
import {BaseFormInputComponentProps} from "./BaseFormInputComponent.tsx";
import {BaseFormInputConfig} from "./BaseFormInputConfig.tsx";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";


export default class BaseFormInputDefinition extends AbstractDesignerDefinition<BaseFormInputController, BaseFormInputComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础表单输入框",
            compKey: "formBaseInput",
            categorize: "web",
            subCategorize: "form",
            width: 200,
            height: 32,
        };
    }

    getChartImg(): string | null {
        return baseFormInput;
    }

    getController(): ClazzTemplate<BaseFormInputController> | null {
        return BaseFormInputController;
    }

    getInitConfig(): BaseFormInputComponentProps {
        return {
            base: {
                id: "",
                name: '基本表单输入框',
                type: 'formBaseInput',
            },
            style: {
                styleType: "none",
                defaultStyle:{
                    borderRadius:0,
                    colorBgContainer:"#2A3F56",
                    colorBorder:"#0089FF",
                    colorText: '#ffffff',
                    fontSize: 20,
                    size: "small",
                },

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
                staticData: ""
            }
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuMapping = super.getMenuToConfigContentMap();
        menuMapping['style'] = BaseFormInputConfig;
        return menuMapping;
    }

    getEventList(): EventInfo[] {
        const events = super.getEventList();
        return events.concat([
            {
                id: "click",
                name: "点击时",
            },
            {
                id: "onChange",
                name: "输入框内容变化时",
            },
            {
                id: "onPressEnter",
                name: "按下回车时",
            },
        ]);
    }
    getActionList(): Array<ActionInfo> {
        return super.getActionList();
    }
}
