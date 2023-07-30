import AbstractComponent, {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {
    BackgroundColorMode,
    BackgroundImgRepeat,
    BackgroundMode
} from "../../../designer/DesignerType";
import DesignerBackground from "./DesignerBackground";
import {merge} from "../../../utils/ObjectUtil";

/**
 * 背景设置
 */
export interface BackgroundConfigType {
    //背景宽
    width: number;
    //背景高
    height: number;
    //背景模式
    bgMode: BackgroundMode;
    bgImg: {
        //背景图片尺寸
        bgImgSize: [number, number];
        //背景图片位置
        bgImgPos: [number, number];
        //背景图片重复方式
        bgImgRepeat: BackgroundImgRepeat;
        //背景图片url地址
        bgImgUrl: string;
    },
    bgColor: {
        //背景图片颜色模式
        bgColorMode: BackgroundColorMode;
        single: {
            color: string,//单色背景颜色},
        },
        linearGradient: {
            color: string,
            angle: number,
            colorArr: string[]
        },
        radialGradient: {
            color: string,
            colorArr: string[]
        },
    }
}

export interface AbstractBackgroundImplProps {
    background: BackgroundConfigType;
}

export default class AbstractBackgroundImpl extends AbstractComponent<DesignerBackground, AbstractBackgroundImplProps> {

    constructor(instanceRef: DesignerBackground) {
        super();
        this.instance = instanceRef;
        this.config = {
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
        }
    }

    async create(container: HTMLElement, params: Record<string, unknown> | undefined): Promise<this> {
        throw new Error("Method not implemented.");
    }

    destroy(): void {
        this.config = null;
        this.instance = null;
    }

    getConfig(): AbstractBackgroundImplProps | null {
        return this.config;
    }

    public update(config: AbstractBackgroundImplProps, upOp?: UpdateOptions): void {
        this.config = merge(this.config, config);
        upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
        if (upOp.reRender) {
            this.instance?.setState({config: this.config?.background});
        }
    }

}