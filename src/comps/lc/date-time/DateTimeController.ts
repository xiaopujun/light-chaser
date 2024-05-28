import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import DateTimeComponent, {
    DateTimeComponentRef,
    DateTimeComponentProps,
} from "./DateTimeComponent.tsx";
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export class DateTimeController extends AbstractDesignerController<DateTimeComponentRef, DateTimeComponentProps> {

    async create(container: HTMLElement, config: DateTimeComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<DateTimeComponentRef>(container, DateTimeComponent, config);
    }

    destroy(): void {
        this.instance?.destroy();
        this.instance = null;
        this.config = null;
    }

    getConfig(): DateTimeComponentProps | null {
        return this.config;
    }


    update(config: DateTimeComponentProps, upOp?: UpdateOptions | undefined): void {
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