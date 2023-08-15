import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableGaugeOptions} from "../../antd-common/types";
import {Gauge} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractComponent";
import {AntdBaseDesignerComponent} from "../../antd-common/AntdBaseDesignerComponent";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdGaugeProps extends ComponentBaseProps {
    style?: WritableGaugeOptions;
}

export default class AntdGauge extends AntdBaseDesignerComponent<Gauge, AntdGaugeProps> {

    async create(container: HTMLElement, config: AntdGaugeProps): Promise<this> {
        return super.commonCreate(container, Gauge, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdGaugeProps | null {
        return this.config;
    }

    update(config: AntdGaugeProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Gauge, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}