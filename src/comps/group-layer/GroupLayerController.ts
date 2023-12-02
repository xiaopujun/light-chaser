import {ComponentInfoType} from "../common-component/common-types";
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
    
    async create(container: HTMLElement, config: GroupLayerProps): Promise<this> {
        return this;
    }

    getConfig(): GroupLayerProps | null {
        return this.config;
    }

    update(config: GroupLayerProps, upOp: UpdateOptions | undefined): void {
    }

}