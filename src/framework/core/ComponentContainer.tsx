import React, {Suspense} from "react";
import designerStarter from "../../designer/DesignerStarter";
import {MovableItemType} from "../../lib/lc-movable/types";
import Loading from "../../lib/loading/Loading";
import designerStore from "../../designer/store/DesignerStore";

export interface ComponentContainerProps {
    layout: MovableItemType;
}

class ComponentContainer extends React.Component<ComponentContainerProps> {

    private ref: any;

    componentDidMount(): void {
        //通过ref创建组件，并将组件实例方法Map中。后续通过Map匹配到具体实例，
        //调用实例的对象方法进行组件的更新操作
        const {layout} = this.props;
        const {customComponentInfoMap} = designerStarter;
        let componentDefine: any = customComponentInfoMap[layout!.type + ''];
        if (componentDefine) {
            const AbsCompImpl = componentDefine.getComponent();
            new AbsCompImpl().create(this.ref).then((instance: any) => {
                const {compInstanceMap} = designerStore;
                compInstanceMap[layout.id + ''] = instance;
            });
        }
    }

    render() {
        const {layout} = this.props;
        return (
            <Suspense fallback={<Loading/>}>
                <div
                    id={layout.id}
                    data-type={layout.type}
                    data-locked={layout.locked}
                    data-hide={layout.hide}
                    key={layout.id + ''}
                    style={{
                        width: layout.width,
                        height: layout.height,
                        transform: `translate(${layout.position![0]}px, ${layout.position![1]}px)`,
                        position: 'absolute',
                        display: layout.hide ? 'none' : 'block',
                    }} className={'lc-comp-item'}>
                    <div ref={(ref) => this.ref = ref} style={{
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        position: 'relative'
                    }}/>
                </div>
            </Suspense>
        )
    }
}


export default ComponentContainer;