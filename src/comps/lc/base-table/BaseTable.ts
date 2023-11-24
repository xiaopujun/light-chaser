import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateType, UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseTableComponent, {BaseTableComponentProps} from "./BaseTableComponent";
import ObjectUtil from "../../../utils/ObjectUtil";

export class BaseTable extends AbstractDesignerController<BaseTableComponent, BaseTableComponentProps> {

    async create(container: HTMLElement, config: any): Promise<this> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BaseTableComponent, config);
        return this;
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseTableComponentProps | null {
        return this.config;
    }

    update(config: BaseTableComponentProps, upOp: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true, updateType: UpdateType.OPTIONS};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}