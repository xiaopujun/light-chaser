import {ComponentInfoType} from "../common-component/CommonTypes.ts";
import {UpdateOptions} from "../../framework/core/AbstractController";
import GroupLayer from "./GroupLayer";
import AbstractDesignerController from "../../framework/core/AbstractDesignerController";

export interface GroupLayerProps {
    base: ComponentInfoType;
}

export default class GroupLayerController extends AbstractDesignerController<GroupLayer, GroupLayerProps> {

    constructor(container: HTMLElement, config: GroupLayerProps, instance: GroupLayer) {
        super();
        this.container = container;
        this.config = config;
        this.instance = instance;
    }

    async create(container: HTMLElement, config: GroupLayerProps): Promise<void> {
    }

    public getConfig(): GroupLayerProps | null {
        return this.config;
    }

    public update(config: GroupLayerProps, upOp: UpdateOptions | undefined): void {
    }

    public show(): void {
        this.instance?.setState({load: true})
    }

    public hide(): void {
        this.instance?.setState({load: false})
    }


}