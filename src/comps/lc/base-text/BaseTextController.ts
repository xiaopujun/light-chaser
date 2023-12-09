import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseTextComponent, {BaseTextComponentProps} from "./BaseTextComponent";
import ObjectUtil from "../../../utils/ObjectUtil";

export class BaseTextController extends AbstractDesignerController<BaseTextComponent, BaseTextComponentProps> {

    create(container: HTMLElement, config: any): void {
        this.config = config;
        this.container = container;
        ComponentUtil.createAndRender<BaseTextComponent>(container, BaseTextComponent, config).then((instance) => this.instance = instance);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseTextComponentProps | null {
        return this.config;
    }

    update(config: BaseTextComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.setState(this.config);

    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}