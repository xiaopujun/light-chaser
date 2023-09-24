import {ThemeItemType} from "../../../designer/DesignerType";
import {OperateType, UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseTextComponent, {BaseTextComponentProps} from "./BaseTextComponent";
import ObjectUtil from "../../../utils/ObjectUtil";

export class BaseText extends AbstractDesignerController<BaseTextComponent, BaseTextComponentProps> {

    async create(container: HTMLElement, config: any): Promise<this> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BaseTextComponent, config);
        return this;
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseTextComponentProps | null {
        return this.config;
    }

    update(config: BaseTextComponentProps, upOp: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}