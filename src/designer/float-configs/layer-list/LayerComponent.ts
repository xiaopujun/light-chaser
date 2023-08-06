import AbstractComponent, {
    UpdateOptions,
} from "../../../framework/core/AbstractComponent";
import ComponentUtil from "../../../utils/ComponentUtil";
import LayerItem, {LayerItemProps} from "./LayerItem";

export default class LayerComponent extends AbstractComponent<LayerItem, LayerItemProps> {
    
    async create(container: HTMLElement, config: LayerItemProps): Promise<this> {
        if (!this.instance)
            ComponentUtil.createAndRender<LayerItem, LayerItemProps>(container, LayerItem, config).then((instance) => {
                this.instance = instance;
            });
        return this;
    }

    destroy(): void {
    }

    getConfig(): LayerItemProps | null {
        return this.config;
    }

    update(props: any, upOp?: UpdateOptions): void {
    }
}
