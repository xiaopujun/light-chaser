import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import {ComponentInfoType} from "../../common-component/CommonTypes.ts";
import LivePlayerComponent, {LivePlayerComponentRef, LivePlayerComponentStyle} from "./LivePlayerComponent.tsx";
import ComponentUtil from "../../../utils/ComponentUtil";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import ObjectUtil from "../../../utils/ObjectUtil";
import {IFilterConfigType, ThemeItemType} from "../../../designer/DesignerType";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export interface LivePlayerComponentProps {
    base?: ComponentInfoType;
    style?: LivePlayerComponentStyle;
    filter?: IFilterConfigType;
}


export default class LivePlayerController extends AbstractDesignerController<LivePlayerComponentRef, LivePlayerComponentProps> {

    public async create(container: HTMLElement, config: LivePlayerComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<LivePlayerComponentRef>(container, LivePlayerComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): LivePlayerComponentProps | null {
        return this.config;
    }

    update(config: LivePlayerComponentProps, upOp?: UpdateOptions | undefined): void {
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
