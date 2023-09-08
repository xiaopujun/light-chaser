import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableRingProgressOptions} from "../../antd-common/types";
import {RingProgress} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractComponent";
import {AntdBaseDesignerComponent} from "../../antd-common/AntdBaseDesignerComponent";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdRingProgressProps extends ComponentBaseProps {
    style?: WritableRingProgressOptions;
}

export default class AntdRingProgress extends AntdBaseDesignerComponent<RingProgress, AntdRingProgressProps> {

    async create(container: HTMLElement, config: AntdRingProgressProps): Promise<this> {
        return super.commonCreate(container, RingProgress, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdRingProgressProps | null {
        return this.config;
    }

    update(config: AntdRingProgressProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, RingProgress, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}