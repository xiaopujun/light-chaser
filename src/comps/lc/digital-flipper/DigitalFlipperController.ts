import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../blueprint/core/BPExecutor";
import DigitalFlipperComponent, {
    DigitalFlipperComponentProps,
    DigitalFlipperComponentRef
} from "./DigitalFlipperComponent";

export class DigitalFlipperController extends AbstractDesignerController<DigitalFlipperComponentRef, DigitalFlipperComponentProps> {

    async create(container: HTMLElement, config: DigitalFlipperComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<DigitalFlipperComponentRef>(container, DigitalFlipperComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): DigitalFlipperComponentProps | null {
        return this.config;
    }


    changeData(data: number) {
        this.config!.data!.staticData!.data = data;
        this.instance?.changeData(data);
    }

    update(config: DigitalFlipperComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.updateConfig(this.config!);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }


    registerEvent() {
        const nodeId = this.config?.base?.id!;
        this.instance?.setEventHandler({
            click: () => BPExecutor.triggerComponentEvent(nodeId!, "click", this.config),
        })
    }
}