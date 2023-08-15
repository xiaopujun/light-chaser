import {ComponentBaseProps} from "../../common-component/common-types";
import {WritablePieOptions} from "../../antd-common/types";
import {Pie} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractComponent";
import {AntdBaseDesignerComponent} from "../../antd-common/AntdBaseDesignerComponent";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdPieProps extends ComponentBaseProps {
    style?: WritablePieOptions;
}

export default class AntdPie extends AntdBaseDesignerComponent<Pie, AntdPieProps> {

    async create(container: HTMLElement, config: AntdPieProps): Promise<this> {
        return super.commonCreate(container, Pie, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdPieProps | null {
        return this.config;
    }

    update(config: AntdPieProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Pie, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}