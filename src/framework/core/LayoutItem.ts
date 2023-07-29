import AbstractComponent, {UpdateOptions} from "./AbstractComponent";
import ComponentUtil from "../../utils/ComponentUtil";
import {MovableItemType} from "../../lib/lc-movable/types";

export default class LayoutItem extends AbstractComponent<LayoutItem, MovableItemType> {

    constructor(config: MovableItemType) {
        super();
        this.config = config;
    }

    async create(container: HTMLElement, params: Record<string, unknown>): Promise<this> {
        if (!this.instance)
            ComponentUtil.createAndRender<LayoutItem>(container, params).then((instance) => {
                this.instance = instance;
            })
        return this;
    }

    destroy(): void {
    }

    getConfig(): MovableItemType | null {
        return this.config;
    }

    update(props: any, upOp?: UpdateOptions): void {
    }


}