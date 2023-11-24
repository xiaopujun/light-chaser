import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateType, UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseIframeComponent, {BaseIframeComponentProps} from "./BaseIframeComponent";
import ObjectUtil from "../../../utils/ObjectUtil";

export class BaseIframeController extends AbstractDesignerController<BaseIframeComponent, BaseIframeComponentProps> {

    async create(container: HTMLElement, config: any): Promise<this> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BaseIframeComponent, config);
        return this;
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseIframeComponentProps | null {
        return this.config;
    }

    update(config: BaseIframeComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true, updateType: UpdateType.OPTIONS};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}