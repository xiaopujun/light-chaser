import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import DynamicPanelComponent, {DynamicPanelComponentProps} from "./DynamicPanelComponent";
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export class DynamicPanelController extends AbstractDesignerController<DynamicPanelComponent, DynamicPanelComponentProps> {

    async create(container: HTMLElement, config: DynamicPanelComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<DynamicPanelComponent>(container, DynamicPanelComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): DynamicPanelComponentProps | null {
        return this.config;
    }

    update(config: DynamicPanelComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    registerEvent() {
        if (this.instance) {
            const nodeId = this.config?.base?.id!;
            this.instance.eventHandlerMap = {
                load: () => BPExecutor.triggerComponentEvent(nodeId!, "load", this.config)
            }
        }
    }
}
