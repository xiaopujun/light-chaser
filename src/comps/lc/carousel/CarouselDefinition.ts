import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import carouselImg from './carousel.png';
import {CarouselController} from "./CarouselController.ts";
import {CarouselComponentProps} from "./CarouselComponent.tsx";
import {CarouselConfig} from "./CarouselConfig.tsx";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

export default class CarouselDefinition extends AbstractDesignerDefinition<CarouselController, CarouselComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "轮播图",
            compKey: "carousel",
            categorize: "web",
        };
    }

    getChartImg(): string | null {
        return carouselImg;
    }

    getController(): ClazzTemplate<CarouselController> | null {
        return CarouselController;
    }

    getInitConfig(): CarouselComponentProps {
        return {
            base: {
                id: "",
                name: '轮播图',
                type: 'carousel',
            },
            style: {
                autoplay: true,
                autoplaySpeed: 3000,
                dots: true,
                fade: false,
                speed: 500,
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
                staticData: [carouselImg, carouselImg]
            }
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuMapping = super.getMenuToConfigContentMap();
        menuMapping['style'] = CarouselConfig;
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