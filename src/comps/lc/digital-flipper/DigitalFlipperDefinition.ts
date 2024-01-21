import {
    AbstractDefinition,
    BaseInfoType,
    EventInfo,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import digitalFlipperImg from './digital-flipper.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {DigitalFlipperController} from "./DigitalFlipperController";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {DigitalFlipperConfig} from "./DigitalFlipperConfig";
import {DigitalFlipperComponentProps} from "./DigitalFlipperComponent";
import DataConfig from "../../common-component/data-config/DataConfig";

export default class DigitalFlipperDefinition extends AbstractDefinition<DigitalFlipperController, DigitalFlipperComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "数字翻牌器",
            compKey: "DigitalFlipper",
            categorize: "info",
            width: 200,
            height: 50,
        };
    }

    getChartImg(): string | null {
        return digitalFlipperImg;
    }

    getController(): ClazzTemplate<DigitalFlipperController> | null {
        return DigitalFlipperController;
    }

    getInitConfig(): DigitalFlipperComponentProps {
        return {
            base: {
                id: "",
                name: '数字翻牌器',
                type: 'DigitalFlipper',
            },
            style: {
                fontSize: 20,
                fontWeight: 500,
                fontFamily: 'Microsoft YaHei',
                color: '#ffffff',
                type: 'slide',
            },
            data: {
                staticData: {
                    data: 123456789,
                }
            }
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: DigitalFlipperConfig,
            data: DataConfig,
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