import React, {Suspense} from "react";
import historyRecordOperateProxy from "../../designer/operate-provider/undo-redo/HistoryRecordOperateProxy";
import runtimeConfigStore from "../../designer/store/RuntimeConfigStore";
import Loading from "../../ui/loading/Loading";
import URLUtil from "../../utils/URLUtil";
import {ILayerItem} from "../../designer/DesignerType";

export interface ComponentContainerProps {
    layer: ILayerItem;
}

class ComponentContainer extends React.PureComponent<ComponentContainerProps> {

    private ref: HTMLDivElement | null = null;

    private mode: string = URLUtil.parseUrlParams()?.action || 'edit';

    componentDidMount(): void {
        //通过ref创建组件，并将组件实例方法Map中。后续通过Map匹配到具体实例，
        //调用实例的对象方法进行组件的更新操作
        const {layer} = this.props;
        historyRecordOperateProxy.doAdd(this.ref, layer);
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
                        transform: `translate(${layer.position![0]}px, ${layer.position![1]}px)`,
                        position: 'absolute',
                        display: layer.hide ? 'none' : 'block',
                        border: auxiliaryBorder ? '1px solid #65eafc' : 'none'
                    }} className={'lc-comp-item'}>
                    <div ref={(ref) => this.ref = ref} style={{
                        width: '100%',
                        height: '100%',
                        pointerEvents: `${this.mode === 'view' ? 'auto' : 'none'}`,
                        position: 'relative'
                    }}/>
                </div>
            </Suspense>
        )
    }
}


export default ComponentContainer;