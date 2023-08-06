import AbstractComponent, {OperateType, UpdateOptions,} from "../../../framework/core/AbstractComponent";
import ComponentUtil from "../../../utils/ComponentUtil";
import LayerItem, {LayerItemDataProps} from "./LayerItem";
import {merge} from "../../../utils/ObjectUtil";

export default class LayerComponent extends AbstractComponent<LayerItem, LayerItemDataProps> {

    async create(container: HTMLElement, config: LayerItemDataProps): Promise<this> {
        this.config = config;
        if (!this.instance)
            ComponentUtil.createAndRender<LayerItem, LayerItemDataProps>(container, LayerItem, config).then((instance) => {
                this.instance = instance;
            });
        return this;
    }

    destroy(): void {
    }

    getConfig(): LayerItemDataProps | null {
        return this.config;
    }

    update(config: LayerItemDataProps, upOp?: UpdateOptions): void {
        this.config = merge(this.config, config) as LayerItemDataProps;
        upOp = upOp || {reRender: true, operateType: OperateType.OPTIONS};
        if (upOp.reRender)
            this.instance?.setState({...this.config})
    }


}
