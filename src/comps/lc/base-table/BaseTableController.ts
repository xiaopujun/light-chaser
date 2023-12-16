import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseTableComponent, {BaseTableComponentProps} from "./BaseTableComponent";
import ObjectUtil from "../../../utils/ObjectUtil";

export class BaseTableController extends AbstractDesignerController<BaseTableComponent, BaseTableComponentProps> {

    async create(container: HTMLElement, config: any): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<BaseTableComponent>(container, BaseTableComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseTableComponentProps | null {
        return this.config;
    }


    changeData(data: any) {
        const style = ObjectUtil.merge(this.config?.style, {data});
        this.instance?.setState(style);
    }

    update(config: BaseTableComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}