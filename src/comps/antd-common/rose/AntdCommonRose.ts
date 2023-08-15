import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableRoseOptions} from "../types";
import {Rose} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractComponent";
import {AntdBaseDesignerComponent} from "../AntdBaseDesignerComponent";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdRoseProps extends ComponentBaseProps {
    style?: WritableRoseOptions;
}

export default class AntdCommonRose extends AntdBaseDesignerComponent<Rose, AntdRoseProps> {

    async create(container: HTMLElement, config: AntdRoseProps): Promise<this> {
        return super.commonCreate(container, Rose, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdRoseProps | null {
        return this.config;
    }

    update(config: AntdRoseProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Rose, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}