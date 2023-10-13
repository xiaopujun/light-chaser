import React, {MouseEvent, PureComponent} from 'react';
import {observer} from "mobx-react";
import designerStore, {DesignerStore} from "../store/DesignerStore";
import rightStore from "../right/RightStore";
import DesignerRuler from "../../lib/lc-ruler/DesignerRuler";
import DesignerContainer from "../operate-provider/DesignerContainer";
import GroupMovable from "../../lib/lc-movable/GroupMovable";
import GroupSelectable from "../../lib/lc-movable/GroupSelectable";
import LcRightMenu from "../operate-provider/right-click-menu/ContextMenu";
import {MovableItemType} from "../../lib/lc-movable/types";
import HotKey from "../operate-provider/hot-key/HotKey";
import {hotkeyConfigs} from "../operate-provider/hot-key/HotKeyConfig";
import ComponentContainer from "../../framework/core/ComponentContainer";
import {isEqual} from "lodash";
import {DesignerDragScaleContainer} from "./DesignerDragScaleContainer";

/**
 * 设计器画布
 */
class DesignerCanvas extends PureComponent<DesignerStore | any> {

    state = {
        designerRef: null
    }

    componentDidMount() {
        this.setState({designerRef: document.querySelector('.lc-ruler-content')});
    }

    updateActive = (e: MouseEvent<HTMLDivElement>) => {
        let {id, dataset: {type}} = e.target as HTMLDivElement;
        const {activeConfig, activeElem} = rightStore;
        if (isEqual(activeElem, {id, type})) return;
        activeConfig(id, type!);
    }

    /**
     * 元素生成
     */
    generateElement = () => {
        let {layoutConfigs} = designerStore!;
        const sortLayout = Object.values(layoutConfigs).sort((a: MovableItemType, b: MovableItemType) => a.order! - b.order!);
        return sortLayout.map((item: MovableItemType) => {
            return <ComponentContainer layout={item} key={item.id}/>
        });
    }

    render() {
        return (
            <>
                <DesignerContainer>
                    <GroupSelectable>
                        <DesignerRuler offsetX={60} offsetY={50}>
                            <DesignerDragScaleContainer onDoubleClick={this.updateActive}>
                                <GroupMovable>
                                    {this.generateElement()}
                                </GroupMovable>
                            </DesignerDragScaleContainer>
                        </DesignerRuler>
                    </GroupSelectable>
                </DesignerContainer>
                <LcRightMenu/>
                <HotKey handlerMapping={hotkeyConfigs}/>
            </>
        );
    }
}

export default observer(DesignerCanvas);

