import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import {WritableLiquidOptions} from "../../antd-common/types";
import {Liquid} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdLiquidProps extends ComponentBaseProps {
    style?: WritableLiquidOptions;
}

export default class AntdLiquidController extends AntdBaseDesignerController<Liquid, AntdLiquidProps> {

    async create(container: HTMLElement, config: AntdLiquidProps): Promise<void> {
        super.commonCreate(container, Liquid, config);
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

    changeData(data: any) {
        this.config!.data!.staticData = data;
        this.config!.style!.percent = data;
        this.instance?.changeData(data);
    }

    update(config: AntdLiquidProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Liquid, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}