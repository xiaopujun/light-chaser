import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {
    BackgroundColorMode,
    BackgroundImgRepeat,
    BackgroundMode,
    BaseInfoType,
    ThemeItemType,
} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import {PictureFilled} from "@ant-design/icons";
import React from "react";
import BackgroundConfig from "./BackgroundConfig";

class BackgroundDefinition extends AbstractCustomComponentDefinition {
    getInitConfig(): any {
        return {
            background: {
                width: 1920, //背景宽
                height: 1080, //背景高
                bgMode: BackgroundMode.NONE, //背景模式
                bgImg: {
                    bgImgSize: [1920, 1080], //背景图片尺寸
                    bgImgPos: [0, 0], //背景图片位置
                    bgImgRepeat: BackgroundImgRepeat.NO_REPEAT, //背景图片重复方式
                    bgImgUrl: "", //背景图片url地址
                },
                bgColor: {
                    bgColorMode: BackgroundColorMode.SINGLE, //背景图片颜色模式
                    single: {color: "#000000"},
                    linearGradient: {
                        color: "linear-gradient(0deg, #000000, #000000)",
                        angle: 0,
                        colorArr: ["#000000", "#000000"],
                    },
                    radialGradient: {
                        color: "radial-gradient(circle, #000000, #000000)",
                        colorArr: ["#000000", "#000000"],
                    },
                },
            }
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "",
            compKey: "LcBg",
            type: "",
            typeKey: "",
            desc: "",
        };
    }

    getChartImg(): any {
        return null;
    }

    getComponent(): any {
        return null;
    }

    getMenuList(): Array<MenuInfo> {
        return [
            {
                icon: PictureFilled,
                name: "背景",
                key: "background",
            },
        ];
    }

    getMenuToConfigContentMap(): { [p: string]: React.Component | React.FC | any; } {
        return {
            background: BackgroundConfig,
        };
    }
}

export default BackgroundDefinition;
