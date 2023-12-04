import React from "react";
import GroupLayerController from "./GroupLayerController";
import {AbstractDefinition} from "../../framework/core/AbstractDefinition";
import DesignerLoaderFactory from "../../designer/loader/DesignerLoaderFactory";
import {ILayerItem} from "../../designer/DesignerType";
import designerStore from "../../designer/store/DesignerStore";

export interface GroupLayerStyleProps {
    layer: ILayerItem;
}

export default class GroupLayer extends React.PureComponent<GroupLayerStyleProps> {

    groupLayerRef: HTMLDivElement | null = null;

    componentDidMount(): void {
        const {layer} = this.props;
        const {elemConfigs, compController} = designerStore;
        let groupDefinition: AbstractDefinition = DesignerLoaderFactory.getLoader().definitionMap['group'];
        let config;
        if (layer.id! in compController!) {
            //重新编组后，被编组组件会重新渲染，需从之前的实例中获取原有数据
            config = compController![layer.id!].getConfig();
        } else if (layer.id! in elemConfigs!) {
            config = elemConfigs![layer.id!];
        } else {
            config = groupDefinition.getInitConfig();
            config.base.id = layer.id!;
        }
        compController![layer.id!] = new GroupLayerController(this.groupLayerRef!, config, this);
    }

    render() {
        return <div className={'component-group'} ref={ref => this.groupLayerRef = ref!}
                    style={{position: 'absolute'}}>{this.props.children}</div>;
    }
}