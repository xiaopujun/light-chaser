import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import ScreenReferenceComponent, {
    ScreenReferenceComponentProps,
    ScreenReferenceComponentRef
} from './ScreenReferenceComponent.tsx';
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor.ts";

export class ScreenReferenceController extends AbstractDesignerController<ScreenReferenceComponentRef, ScreenReferenceComponentProps> {

    async create(container: HTMLElement, config: ScreenReferenceComponentProps, executor: BPExecutor): Promise<void> {
        this.config = config;
        this.container = container;
        this.bpExecutor = executor;
        this.instance = await ComponentUtil.createAndRender<ScreenReferenceComponentRef>(container, ScreenReferenceComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): ScreenReferenceComponentProps | null {
        return this.config;
    }

    update(config: ScreenReferenceComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.updateConfig(this.config!);
    }

    registerEvent() {
        const nodeId = this.config?.base?.id!;
        const executor = this.bpExecutor;
        this.instance?.setEventHandler({
            click: () => executor?.triggerComponentEvent(nodeId!, "click", this.config),
        })
    }
}