import AbstractComponent, {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {
    BackgroundColorMode,
    BackgroundConfigType,
    BackgroundImgRepeat,
    BackgroundMode
} from "../../../designer/DesignerType";
import DesignerBackground from "./DesignerBackground";
import {merge} from "../../../utils/ObjectUtil";

export default class AbstractBackgroundImpl extends AbstractComponent<DesignerBackground, BackgroundConfigType> {

    constructor(instanceRef: DesignerBackground) {
        super();
        this.instance = instanceRef;
        this.config = this.config = {
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

    getConfig(): BackgroundConfigType | null {
        return this.config;
    }

    update(config: BackgroundConfigType, upOp?: UpdateOptions): void {
        this.config = merge(this.config, config);
        upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
        if (upOp.reRender) {
            this.instance?.setState({config: this.config});
        }
    }

}