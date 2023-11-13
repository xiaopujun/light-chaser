import React, {Suspense} from "react";
import {MovableItemType} from "../../designer/operate-provider/movable/types";
import historyRecordOperateProxy from "../../designer/operate-provider/undo-redo/HistoryRecordOperateProxy";
import runtimeConfigStore from "../../designer/store/RuntimeConfigStore";
import Loading from "../../ui/loading/Loading";
import URLUtil from "../../utils/URLUtil";

export interface ComponentContainerProps {
    layout: MovableItemType;
}

class ComponentContainer extends React.PureComponent<ComponentContainerProps> {

    private ref: HTMLDivElement | null = null;

    private mode: string = URLUtil.parseUrlParams()?.action || 'edit';

    componentDidMount(): void {
        //通过ref创建组件，并将组件实例方法Map中。后续通过Map匹配到具体实例，
        //调用实例的对象方法进行组件的更新操作
        const {layout} = this.props;
        historyRecordOperateProxy.doAdd(this.ref, layout);
    }

    render() {
        const {layout} = this.props;
        const {auxiliaryBorder} = runtimeConfigStore;
        return (
            <Suspense fallback={<Loading/>}>
                <div
                    id={layout.id}
                    data-type={layout.type}
                    data-lock={layout.lock}
                    data-hide={layout.hide}
                    key={layout.id + ''}
                    style={{
                        width: layout.width,
                        height: layout.height,
                        transform: `translate(${layout.position![0]}px, ${layout.position![1]}px)`,
                        position: 'absolute',
                        display: layout.hide ? 'none' : 'block',
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