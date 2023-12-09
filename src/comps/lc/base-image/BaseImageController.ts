import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import {ComponentInfoType} from "../../common-component/common-types";
import BaseImageComponent, {BaseImageComponentStyle} from "./BaseImageComponent";
import ComponentUtil from "../../../utils/ComponentUtil";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import ObjectUtil from "../../../utils/ObjectUtil";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface BaseImageComponentProps {
    base?: ComponentInfoType;
    style?: BaseImageComponentStyle;
}


export default class BaseImageController extends AbstractDesignerController<BaseImageComponent, BaseImageComponentProps> {

    public create(container: HTMLElement, config: BaseImageComponentProps): void {
        this.config = config;
        this.container = container;
        ComponentUtil.createAndRender<BaseImageComponent>(container, BaseImageComponent, config.style).then((instance) => this.instance = instance);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseImageComponentProps | null {
        return this.config;
    }

    update(config: BaseImageComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender) {
            this.instance?.setState(this.config?.style!);
        }
    }

    updateTheme(newTheme: ThemeItemType): void {

    }

}