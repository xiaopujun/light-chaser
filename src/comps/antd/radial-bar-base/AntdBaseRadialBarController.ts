import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableRadialBarOptions} from "../../antd-common/types";
import {RadialBar} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdRadialBarProps extends ComponentBaseProps {
    style?: WritableRadialBarOptions;
}

export default class AntdBaseRadialBarController extends AntdBaseDesignerController<RadialBar, AntdRadialBarProps> {

    async create(container: HTMLElement, config: AntdRadialBarProps): Promise<void> {
        super.commonCreate(container, RadialBar, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdRadialBarProps | null {
        return this.config;
    }

    update(config: AntdRadialBarProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, RadialBar, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}