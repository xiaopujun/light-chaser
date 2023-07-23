import AbstractComponent from "./AbstractComponent";
import ComponentUtil from "../../utils/ComponentUtil";
import {MovableItemType} from "../../lib/lc-movable/types";

export default class LayoutItem extends AbstractComponent<LayoutItem, MovableItemType> {

    constructor(config: MovableItemType) {
        super();
        this.config = config;
    }

    async create(container: HTMLElement, props: any): Promise<void> {
        if (!this.instance)
            ComponentUtil.createAndRender<LayoutItem>(container, props).then((instance) => {
                this.instance = instance;
            })
        else
            this.update(props);
    }

    destroy(): void {
    }

    getConfig(): MovableItemType | null {
        return this.config;
    }

    update(props: any, operateType?: any): void {
    }

    updateConfig(config: any): void {
    }

}