import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import {ComponentInfoType} from "../../common-component/CommonTypes.ts";
import BaseVideoComponent, {BaseVideoComponentRef, BaseVideoComponentStyle} from "./BaseVideoComponent.tsx";
import ComponentUtil from "../../../utils/ComponentUtil";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import ObjectUtil from "../../../utils/ObjectUtil";
import {IFilterConfigType} from "../../../designer/DesignerType";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export interface BaseVideoComponentProps {
    base?: ComponentInfoType;
    style?: BaseVideoComponentStyle;
    filter?: IFilterConfigType;
}


export default class BaseVideoController extends AbstractDesignerController<BaseVideoComponentRef, BaseVideoComponentProps> {

    public async create(container: HTMLElement, config: BaseVideoComponentProps, executor: BPExecutor): Promise<void> {
        this.config = config;
        this.container = container;
        this.bpExecutor = executor;
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


    registerEvent() {
        if (this.instance) {
            const nodeId = this.config?.base?.id!;
            const executor = this.bpExecutor;
            this.instance.setEventHandler({
                click: () => executor?.triggerComponentEvent(nodeId!, "click", this.config)
            })
        }
    }
}