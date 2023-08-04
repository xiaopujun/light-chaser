import React, {Suspense} from "react";
import designerStarter from "../../designer/DesignerStarter";
import {MovableItemType} from "../../lib/lc-movable/types";
import Loading from "../../lib/loading/Loading";
import designerStore from "../../designer/store/DesignerStore";
import {AbstractCustomComponentDefinition} from "./AbstractCustomComponentDefinition";

export interface ComponentContainerProps {
    layout: MovableItemType;
}

class ComponentContainer extends React.PureComponent<ComponentContainerProps> {

    private ref: HTMLDivElement | null = null;

    componentDidMount(): void {
        //通过ref创建组件，并将组件实例方法Map中。后续通过Map匹配到具体实例，
        //调用实例的对象方法进行组件的更新操作
        const {layout} = this.props;
        const {customComponentInfoMap} = designerStarter;
        const {elemConfigs} = designerStore;
        let componentDefine: AbstractCustomComponentDefinition = customComponentInfoMap[layout!.type + ''];
        if (componentDefine) {
            const AbsCompImpl = componentDefine.getComponent();
            if (AbsCompImpl) {
                const config = layout.id! in elemConfigs! ? elemConfigs![layout.id!] : componentDefine.getInitConfig();
                new AbsCompImpl()!.create(this.ref!, config).then((instance: any) => {
                    const {compInstances} = designerStore;
                    compInstances[layout.id + ''] = instance;
                });
                delete elemConfigs![layout.id!];
            }
        }
    }

    render() {
        console.log('ComponentContainer render')
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