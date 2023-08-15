import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableLiquidOptions} from "../../antd-common/types";
import {Liquid} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractComponent";
import {AntdBaseDesignerComponent} from "../../antd-common/AntdBaseDesignerComponent";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdLiquidProps extends ComponentBaseProps {
    style?: WritableLiquidOptions;
}

export default class AntdLiquid extends AntdBaseDesignerComponent<Liquid, AntdLiquidProps> {

    async create(container: HTMLElement, config: AntdLiquidProps): Promise<this> {
        return super.commonCreate(container, Liquid, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdLiquidProps | null {
        return this.config;
    }

    update(config: AntdLiquidProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Liquid, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}