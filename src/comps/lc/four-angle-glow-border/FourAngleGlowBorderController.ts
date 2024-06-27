import {ComponentInfoType, IFilterConfigType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";
import FourAngleGlowBorder, {FourAngleGlowBorderRef, FourAngleGlowBorderStyle} from "./FourAngleGlowBorder";

export interface FourAngleGlowProps {
    base?: ComponentInfoType;
    style?: FourAngleGlowBorderStyle;
    filter?: IFilterConfigType;
}

export class FourAngleGlowBorderController extends AbstractDesignerController<FourAngleGlowBorderRef, FourAngleGlowProps> {

    async create(container: HTMLElement, config: FourAngleGlowProps, executor: BPExecutor): Promise<void> {
        this.config = config;
        this.container = container;
        this.bpExecutor = executor;
        this.instance = await ComponentUtil.createAndRender<FourAngleGlowBorderRef>(container, FourAngleGlowBorder, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): FourAngleGlowProps | null {
        return this.config;
    }

    update(config: FourAngleGlowProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.updateConfig(this.config!.style!);
    }

    registerEvent() {
        const nodeId = this.config?.base?.id!;
        const executor = this.bpExecutor;
        this.instance?.setEventHandler({
            click: () => executor?.triggerComponentEvent(nodeId!, "click", this.config),
        })
    }
}