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
        let {id: elemId, dataset} = e.target;
        const {updateActive, activeElem, elemConfigs} = designerStore;
        if (elemId === activeElem?.id)
            return;
        updateActive && updateActive({id: elemId, type: dataset.type});
        const {setActiveMenu} = rightStore;
        const elemConfig = elemConfigs[elemId];
        const newMenus = Object.keys(elemConfig);
        setActiveMenu(newMenus[0], newMenus);
    }

    /**
     * 元素生成
     */
    generateElement = () => {
        const {layoutConfigs, compInstanceMap} = designerStore!;
        const sortLayout = Object.values(layoutConfigs).sort((a: any, b: any) => a.order - b.order);
        return sortLayout.map((item: MovableItemType) => {
            return <ComponentContainer layout={item} key={item.id}/>
        });
    }

    render() {
        const {elemConfigs} = designerStore;
        return (
            <>
                <DesignerContainer>
                    <GroupSelectable>
                        <DesignerRuler offsetX={60} offsetY={50}>
                            <DragScaleProvider>
                                <GroupMovable>
                                    <DesignerBackground config={elemConfigs['-1']['background']}
                                                        onClick={this.updateActive}
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

