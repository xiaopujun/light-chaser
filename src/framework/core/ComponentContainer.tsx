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

import {memo, Suspense, useEffect, useRef} from "react";
import Loading from "../../json-schema/ui/loading/Loading";
import URLUtil from "../../utils/URLUtil";
import {DesignerMode, ILayerItem} from "../../designer/DesignerType";
import AbstractDesignerController from "./AbstractDesignerController";
import BPExecutor from "../../designer/blueprint/core/BPExecutor.ts";
import runtimeConfigStore from "../../designer/store/RuntimeStore.ts";
import layerManager from "../../designer/manager/LayerManager.ts";
import {DesignerLoader} from "../../designer/loader/DesignerLoader.ts";

export interface ComponentContainerProps {
    layer: ILayerItem;
}

const ComponentContainer = memo((props: ComponentContainerProps) => {
    const {layer} = props;
    const ref = useRef(null);
    const mode: DesignerMode = URLUtil.parseUrlParams()?.mode as DesignerMode || DesignerMode.EDIT;
    const {auxiliaryBorder} = runtimeConfigStore;
    const enableEvent = mode === DesignerMode.VIEW || layerManager.enableEvent;

    useEffect(() => {
        //通过ref创建组件，并将组件实例存入Map中。后续通过Map匹配到具体实例，调用实例的对象方法进行组件的更新操作
        const {elemConfigs, compController} = layerManager;
        const componentDefine = DesignerLoader.definitionMap[layer.type!];
        if (componentDefine) {
            const Controller = componentDefine.getController();
            if (Controller) {
                let config;
                if (layer.id! in compController!) {
                    //重新编组后，被编组组件会重新渲染，需从之前的实例中获取原有数据
                    config = compController![layer.id!].getConfig();
                } else if (layer.id! in elemConfigs!) {
                    config = elemConfigs![layer.id!];
                } else {
                    config = componentDefine.getInitConfig();
                    config.base.id = layer.id!;
                }
                const {mode} = URLUtil.parseUrlParams();
                const controller = new Controller()! as AbstractDesignerController;
                /**
                 * 此处注意，执行顺序尤为重要！！！
                 * 第一步：动态代理绑定在前，
                 * 第二步：赋值controller在后，
                 * 第三步：最后才是执行create方法。
                 * 否则导致蓝图事件执行时，获取controller实例为undefined
                 */
                //todo 此处逻辑应该使用设计模式优化，而非写死
                if (mode as DesignerMode === DesignerMode.VIEW) {
                    //view模式下使用动态代理对象，执行蓝图事件
                    registerProxy(layer.id!, controller);
                }
                compController[layer.id + ''] = controller;
                controller.create(ref.current!, config).then(() => {
                    //根据图层hide控制初始时图层显示和隐藏
                    controller.setVisible(!layer.hide);
                    //在组件完全渲染完毕后进行数据的加载和事件的注册
                    if (mode as DesignerMode === DesignerMode.VIEW) {
                        controller.registerEvent();
                        controller.loadComponentData();
                        //所有组件都加载完毕之后。 触发bpExecutor的loaded事件
                        if (++window.LC_ENV.createdController! === window.LC_ENV.totalController) {
                            layerManager.compController && Object.values(layerManager.compController).forEach((controller) => {
                                BPExecutor?.triggerComponentEvent(controller.config.base.id, 'loaded', controller.config);
                            });
                        }
                    }
                    //设置组件滤镜效果（todo 考虑是否应该在此处设置？）
                    controller.updateFilter(controller.getConfig()?.filter);
                    //渲染后删除elemConfigs中的映射关系（需要观察是否会造成其他问题）
                    delete elemConfigs![layer.id!];
                });

            }
        }
    }, []);

    return (
        <Suspense fallback={<Loading/>}>
            <div
                id={layer.id}
                data-type={layer.type}
                data-lock={layer.lock}
                data-hide={layer.hide}
                key={layer.id + ''}
                style={{
                    width: layer.width,
                    height: layer.height,
                    transform: `translate(${layer.x!}px, ${layer.y!}px)`,
                    position: 'absolute',
                    border: auxiliaryBorder ? '1px solid #65eafc' : 'none'
                }} className={"lc-comp-item"}>
                <div ref={ref} style={{
                    width: '100%',
                    height: '100%',
                    pointerEvents: enableEvent ? 'auto' : 'none',
                    position: 'relative'
                }}/>
            </div>
        </Suspense>
    )
});


export default ComponentContainer;

const registerProxy = (compId: string, controller: AbstractDesignerController) => {
    controller.changeData = new Proxy(controller.changeData, {
        apply(target, thisArg, argus) {
            BPExecutor.triggerComponentEvent(compId, "dataChange", argus[0]);
            return target.apply(thisArg, argus as any);
        }
    });
}