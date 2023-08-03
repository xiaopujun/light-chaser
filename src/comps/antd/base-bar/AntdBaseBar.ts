import AbstractComponent, {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {Bar, BarOptions} from "@antv/g2plot";
import {merge} from "../../../utils/ObjectUtil";
import {WritableBarOptions} from "./AntdBaseBarDefinition";

export interface ComponentInfoType {
    name: string;
    type: string;
    desc: string;
}

export interface AntdBarProps {
    info?: ComponentInfoType;
    style?: WritableBarOptions;
    data?: any;
}

export default class AntdBaseBar extends AbstractComponent<Bar, AntdBarProps> {

    async create(container: HTMLElement, config: AntdBarProps): Promise<this> {
        this.config = config;
        if (!this.instance)
            this.instance = new Bar(container, config?.style! as BarOptions);
        this.instance.render();
        return this;
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
    }

    getConfig(): AntdBarProps | null {
        return this.config;
    }

    update(config: AntdBarProps, upOp?: UpdateOptions): void {
        this.config = merge(this.config, config) as AntdBarProps;
        upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
        if (upOp.reRender) {
            if (upOp.operateType === OperateType.DATA)
                this.instance?.changeData(this.config!.style!.data!);
            else
                this.instance?.update(this.config?.style!);
        }
    }

}