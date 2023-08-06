import {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {BackgroundColorMode, BackgroundImgRepeat, BackgroundMode, ThemeItemType} from "../../../designer/DesignerType";
import DesignerBackground from "./DesignerBackground";
import {merge} from "../../../utils/ObjectUtil";
import AbstractDesignerComponent from "../../../framework/core/AbstractDesignerComponent";

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

export default class AbstractBackgroundImpl extends AbstractDesignerComponent<DesignerBackground, AbstractBackgroundImplProps> {

    constructor(instanceRef: DesignerBackground, config: AbstractBackgroundImplProps) {
        super();
        this.instance = instanceRef;
        this.config = config;
    }

    async create(container: HTMLElement, config: AbstractBackgroundImplProps): Promise<this> {
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
        console.log('upOp', config)
        if (upOp.reRender) {
            this.instance?.setState({config: this.config?.background});
        }
    }

    updateTheme(newTheme: ThemeItemType): void {
    }

}