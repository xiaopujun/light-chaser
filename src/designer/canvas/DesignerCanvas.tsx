import React, {PureComponent} from 'react';
import DragScaleProvider from "../operate-provider/DragScaleProvider";
import {observer} from "mobx-react";
import designerStore, {DesignerStore} from "../store/DesignerStore";
import DesignerBackground from "../../comps/lc/background/DesignerBackground";
import rightStore from "../right/RightStore";
import DesignerRuler from "../../lib/lc-ruler/DesignerRuler";
import DesignerContainer from "../operate-provider/DesignerContainer";
import GroupMovable from "../../lib/lc-movable/GroupMovable";
import GroupSelectable from "../../lib/lc-movable/GroupSelectable";
import LcRightMenu from "../operate-provider/right-click-menu/ContextMenu";
import {MovableItemType} from "../../lib/lc-movable/types";
import HotKey from "../operate-provider/keyboard-mouse/HotKey";
import {getOperateEventMapping} from "../operate-provider/keyboard-mouse/HotKeyConfig";
import ComponentContainer from "../../framework/core/ComponentContainer";
import {toJS} from "mobx";
import Loading from "../../lib/loading/Loading";

/**
 * 设计器画布
 */
class DesignerCanvas extends PureComponent<DesignerStore | any> {

    lcbg: any = null;

    state = {
        designerRef: null
    }

    componentDidMount() {
        this.setState({designerRef: document.querySelector('.lc-ruler-content')});
    }

    updateActive = (e: any) => {
        let {id, dataset: {type}} = e.target;
        console.log(id, type)
        const {activeConfig} = rightStore;
        activeConfig(id, type);
        // const {setActiveMenu} = rightStore;
        // const {updateActive, activeElem, elemConfigs} = designerStore;
        // if (elemId === activeElem?.id)
        //     return;
        // updateActive && updateActive({id: elemId, type: dataset.type});
        // if (type === 'LcBg') {
        //     //激活背景设置
        //     setActiveMenu('background', ['background']);
        // } else {
        //     //激活组件设置
        //     const {customComponentInfoMap} = designerStarter;
        //
        //     const {compInstanceMap} = designerStore;
        //     const instance = compInstanceMap[elemId];
        //     const elemConfig = instance.getConfig();
        //     const newMenus = Object.keys(elemConfig);
        //     setActiveMenu(newMenus[0], newMenus);
        // }
    }

    /**
     * 元素生成
     */
    generateElement = () => {
        console.log('generateElement')
        const {layoutConfigs, compInstances} = designerStore!;
        const sortLayout = Object.values(layoutConfigs).sort((a: any, b: any) => a.order - b.order);
        return sortLayout.map((item: MovableItemType) => {
            return <ComponentContainer layout={item} key={item.id}/>
        });
    }

    render() {
        const {loaded} = designerStore;
        if (!loaded)
            return <Loading/>;
        return (
            <>
                <DesignerContainer>
                    <GroupSelectable>
                        <DesignerRuler offsetX={60} offsetY={50}>
                            <DragScaleProvider>
                                <GroupMovable>
                                    <DesignerBackground onClick={this.updateActive}
                                                        ref={obj => this.lcbg = obj}>
                                        {this.generateElement()}
                                    </DesignerBackground>
                                </GroupMovable>
                            </DragScaleProvider>
                            <LcRightMenu/>
                        </DesignerRuler>
                    </GroupSelectable>
                </DesignerContainer>
                <HotKey handlerMapping={getOperateEventMapping()}/>
            </>
        );
    }
}

export default observer(DesignerCanvas);

