import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseTableComponent, {BaseTableComponentProps} from "./BaseTableComponent";
import ObjectUtil from "../../../utils/ObjectUtil";

export class BaseTable extends AbstractDesignerController<BaseTableComponent, BaseTableComponentProps> {

    create(container: HTMLElement, config: any): void {
        this.config = config;
        this.container = container;
        ComponentUtil.createAndRender<BaseTableComponent>(container, BaseTableComponent, config).then((instance) => this.instance = instance);
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
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}