import {ThemeItemType} from "../../../designer/DesignerType";
import {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import AbstractDesignerComponent from "../../../framework/core/AbstractDesignerComponent";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseColorBlockComponent, {BaseColorBlockComponentProps} from "./BaseColorBlockComponent";
import ObjectUtil from "../../../utils/ObjectUtil";

export class BaseColorBlock extends AbstractDesignerComponent<BaseColorBlockComponent, BaseColorBlockComponentProps> {

    async create(container: HTMLElement, config: any): Promise<this> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BaseColorBlockComponent, config);
        return this;
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseColorBlockComponentProps | null {
        return this.config;
    }

    update(config: BaseColorBlockComponentProps, upOp: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}