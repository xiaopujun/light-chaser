/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import React from "react";
import GroupLayerController from "./GroupLayerController";
import {AbstractDefinition} from "../../framework/core/AbstractDefinition";
import {DesignerMode, ILayerItem} from "../../designer/DesignerType";
import layerManager from "../../designer/manager/LayerManager.ts";
import URLUtil from "../../utils/URLUtil.ts";
import BPExecutor from "../../designer/blueprint/core/BPExecutor.ts";
import {DesignerLoader} from "../../designer/loader/DesignerLoader.ts";

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
        const groupDefinition: AbstractDefinition = DesignerLoader.definitionMap['group'];
        const {mode} = URLUtil.parseUrlParams();
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
        const controller = new GroupLayerController(this.groupLayerRef!, config, this);
        compController![layer.id!] = controller;
        //渲染后删除elemConfigs中的映射关系（需要观察是否会造成其他问题）
        delete elemConfigs![layer.id!];

        //根据图层hide控制初始时图层显示和隐藏
        controller?.setVisible(!layer.hide);
        if (mode as DesignerMode === DesignerMode.VIEW) {
            //所有组件都加载完毕之后。 触发bpExecutor的loaded事件
            if (++window.LC_ENV.createdController! === window.LC_ENV.totalController) {
                layerManager.compController && Object.values(layerManager.compController).forEach((controller) => {
                    BPExecutor?.triggerComponentEvent(controller.config.base.id, 'loaded', controller.config);
                });
            }
        }
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