import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseTableComponent, {BaseTableComponentProps, BaseTableComponentRef} from "./BaseTableComponent";
import ObjectUtil from "../../../utils/ObjectUtil";

export class BaseTableController extends AbstractDesignerController<BaseTableComponentRef, BaseTableComponentProps> {

    async create(container: HTMLElement, config: BaseTableComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<BaseTableComponentRef>(container, BaseTableComponent, config);
    }

    destroy(): void {
        this.instance?.destroy();
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseTableComponentProps | null {
        return this.config;
    }

    changeData(data: any) {
        this.config = ObjectUtil.merge(this.config, {style: {data}, data: {staticData: data}});
        this.instance?.updateConfig(this.config!);
    }

    update(config: BaseTableComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.updateConfig(this.config!);
    }

}