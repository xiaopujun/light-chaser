import React, {Suspense} from "react";
import runtimeConfigStore from "../../designer/store/RuntimeConfigStore";
import Loading from "../../ui/loading/Loading";
import URLUtil, {DesignerMode} from "../../utils/URLUtil";
import {ILayerItem} from "../../designer/DesignerType";
import designerStore from "../../designer/store/DesignerStore";
import {AbstractDefinition} from "./AbstractDefinition";
import DesignerLoaderFactory from "../../designer/loader/DesignerLoaderFactory";
import AbstractDesignerController from "./AbstractDesignerController";

export interface ComponentContainerProps {
    layer: ILayerItem;
}

class ComponentContainer extends React.PureComponent<ComponentContainerProps> {

    private ref: HTMLDivElement | null = null;

    private mode: DesignerMode = URLUtil.parseUrlParams()?.mode as DesignerMode || DesignerMode.EDIT;

    componentDidMount(): void {
        //通过ref创建组件，并将组件实例存入Map中。后续通过Map匹配到具体实例，调用实例的对象方法进行组件的更新操作
        const {layer} = this.props;
        const {elemConfigs, compController} = designerStore;
        let componentDefine: AbstractDefinition = DesignerLoaderFactory.getLoader().definitionMap[layer!.type!];
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
                compController[layer.id + ''] = controller;
                controller.create(this.ref!, config).then(() => {
                    //在组件完全渲染完毕后进行数据的加载和事件的注册
                    if (mode as DesignerMode === DesignerMode.VIEW) {
                        controller.registerEvent();
                        controller.loadComponentData();
                    }
                });
            }
        }
    }

    render() {
        const {layer} = this.props;
        const {auxiliaryBorder} = runtimeConfigStore;
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
                        display: layer.hide ? 'none' : 'block',
                        border: auxiliaryBorder ? '1px solid #65eafc' : 'none'
                    }} className={'lc-comp-item'}>
                    <div ref={(ref) => this.ref = ref} style={{
                        width: '100%',
                        height: '100%',
                        pointerEvents: `${this.mode === DesignerMode.VIEW ? 'auto' : 'none'}`,
                        position: 'relative'
                    }}/>
                </div>
            </Suspense>
        )
    }
}


export default ComponentContainer;