import {ComponentInfoType} from "../common-component/common-types";
import AbstractController, {UpdateOptions} from "../../framework/core/AbstractController";
import GroupLayer from "./GroupLayer";

export interface GroupLayerProps {
    base: ComponentInfoType;
}

export default class GroupLayerController extends AbstractController<GroupLayer, GroupLayerProps> {

    constructor(container: HTMLElement, config: GroupLayerProps, instance: GroupLayer) {
        super();
        this.container = container;
        this.config = config;
        this.instance = instance;
    }


    async create(container: HTMLElement, config: GroupLayerProps): Promise<this> {
        return this;
    }

    destroy(): void {
    }

    getConfig(): GroupLayerProps | null {
        return this.config;
    }

    update(config: GroupLayerProps, upOp: UpdateOptions | undefined): void {
    }

}