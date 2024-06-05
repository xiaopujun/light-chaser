import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import CarouselComponent, {CarouselComponentProps, CarouselComponentRef} from "./CarouselComponent.tsx";
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export class CarouselController extends AbstractDesignerController<CarouselComponentRef, CarouselComponentProps> {

    async create(container: HTMLElement, config: CarouselComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<CarouselComponentRef>(container, CarouselComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): CarouselComponentProps | null {
        return this.config;
    }


    changeData(data: string[]) {
        this.config!.data!.staticData = data;
        this.instance?.updateConfig(this.config!);
    }

    update(config: CarouselComponentProps, upOp?: UpdateOptions | undefined): void {
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