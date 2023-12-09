import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseColorBlockComponent, {BaseColorBlockComponentProps} from "./BaseColorBlockComponent";
import ObjectUtil from "../../../utils/ObjectUtil";

export class BaseColorBlockController extends AbstractDesignerController<BaseColorBlockComponent, BaseColorBlockComponentProps> {

    create(container: HTMLElement, config: any): void {
        this.config = config;
        this.container = container;
        ComponentUtil.createAndRender<BaseColorBlockComponent>(container, BaseColorBlockComponent, config).then((instance) => this.instance = instance);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseColorBlockComponentProps | null {
        return this.config;
    }

    update(config: BaseColorBlockComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}