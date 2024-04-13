import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import {ComponentInfoType} from "../../common-component/common-types";
import BaseVideoComponent, {BaseVideoComponentRef, BaseVideoComponentStyle} from "./BaseVideoComponent.tsx";
import ComponentUtil from "../../../utils/ComponentUtil";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import ObjectUtil from "../../../utils/ObjectUtil";
import {ThemeItemType} from "../../../designer/DesignerType";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export interface BaseVideoComponentProps {
    base?: ComponentInfoType;
    style?: BaseVideoComponentStyle;
}


export default class BaseVideoController extends AbstractDesignerController<BaseVideoComponentRef, BaseVideoComponentProps> {

    public async create(container: HTMLElement, config: BaseVideoComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<BaseVideoComponentRef>(container, BaseVideoComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseVideoComponentProps | null {
        return this.config;
    }

    update(config: BaseVideoComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender) {
            this.instance?.updateConfig(this.config!);
        }
    }

    updateTheme(newTheme: ThemeItemType): void {

    }

    registerEvent() {
        if (this.instance) {
            const nodeId = this.config?.base?.id!;
            this.instance.setEventHandler({
                click: () => BPExecutor.triggerComponentEvent(nodeId!, "click", this.config)
            })
        }
    }
}