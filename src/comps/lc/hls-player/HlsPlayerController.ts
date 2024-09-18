import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import HlsPlayerComponent, {HlsPlayerComponentProps, HlsPlayerComponentRef} from "./HlsPlayerComponent.tsx";
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export class HlsPlayerController extends AbstractDesignerController<HlsPlayerComponentRef, HlsPlayerComponentProps> {

    async create(container: HTMLElement, config: HlsPlayerComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<HlsPlayerComponentRef>(container, HlsPlayerComponent, config);
    }

    destroy(): void {
        this.instance?.destroy();
        this.instance = null;
        this.config = null;
    }

    getConfig(): HlsPlayerComponentProps | null {
        return this.config;
    }

    update(config: HlsPlayerComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.updateConfig(this.config!);
    }

    registerEvent() {
        const nodeId = this.config?.base?.id!;
        this.instance?.setEventHandler({
            click: () => BPExecutor.triggerComponentEvent(nodeId!, "click", this.config),
        })
    }
}