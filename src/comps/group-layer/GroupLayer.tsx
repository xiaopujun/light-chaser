import React from "react";
import GroupLayerController from "./GroupLayerController";
import {AbstractDefinition} from "../../framework/core/AbstractDefinition";
import {ILayerItem} from "../../designer/DesignerType";
import layerManager from "../../designer/manager/LayerManager.ts";
import editorDesignerLoader from "../../designer/loader/EditorDesignerLoader.ts";

export interface GroupLayerStyleProps {
    children?: React.ReactNode;
    layer: ILayerItem;
}

export default class GroupLayer extends React.PureComponent<GroupLayerStyleProps> {

    groupLayerRef: HTMLDivElement | null = null;

    state = {
        load: true
    }

    /**
     * 渲染分组组件时不记录操作日志。已在快捷键处记录
     */
    componentDidMount(): void {
        const {layer} = this.props;
        const {elemConfigs, compController} = layerManager;
        const groupDefinition: AbstractDefinition = editorDesignerLoader.definitionMap['group'];
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
        //渲染后删除elemConfigs中的映射关系（需要观察是否会造成其他问题）
        delete elemConfigs![layer.id!];
    }

    render() {
        const {load} = this.state;
        return (
            <>
                {
                    load && <div className={'component-group'} ref={ref => this.groupLayerRef = ref!}
                                 style={{position: 'absolute'}}>{this.props.children}</div>

                }
            </>
        )
    }
}