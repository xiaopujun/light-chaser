import {ComponentBaseProps, ThemeItemType} from "../../../designer/DesignerType";
import {WritableGaugeOptions} from "../../antd-common/types";
import {Gauge} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor.ts";

export interface AntdGaugeProps extends ComponentBaseProps {
    style?: WritableGaugeOptions;
}

export default class AntdGaugeController extends AntdBaseDesignerController<Gauge, AntdGaugeProps> {

    async create(container: HTMLElement, config: AntdGaugeProps, executor: BPExecutor): Promise<void> {
        super.commonCreate(container, Gauge, config, executor);
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


    changeData(data: any) {
        this.config!.data!.staticData = data;
        this.config!.style!.percent = data;
        this.instance?.changeData(data);
    }

    update(config: AntdGaugeProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Gauge, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}