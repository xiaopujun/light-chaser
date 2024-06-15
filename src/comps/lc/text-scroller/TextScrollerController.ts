import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import TextScrollerComponent, {TextScrollerComponentProps, TextScrollerComponentRef} from "./TextScrollerComponent.tsx";
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export class TextScrollerController extends AbstractDesignerController<TextScrollerComponentRef, TextScrollerComponentProps> {

    async create(container: HTMLElement, config: TextScrollerComponentProps, executor: BPExecutor): Promise<void> {
        this.config = config;
        this.container = container;
        this.bpExecutor = executor;
        this.instance = await ComponentUtil.createAndRender<TextScrollerComponentRef>(container, TextScrollerComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): TextScrollerComponentProps | null {
        return this.config;
    }


    changeData(data: string[]) {
        this.config!.data!.staticData = data;
        this.instance?.updateConfig(this.config!);
    }

    update(config: TextScrollerComponentProps, upOp?: UpdateOptions | undefined): void {
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