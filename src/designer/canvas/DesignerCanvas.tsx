import React, {PureComponent} from 'react';
import DragScaleProvider from "../operate-provider/DragScaleProvider";
import {observer} from "mobx-react";
import designerStore, {DesignerStore} from "../store/DesignerStore";
import designerStarter from "../DesignerStarter";
import rightStore from "../right/RightStore";
import {MovableItemType} from "../../lib/lc-movable/types";
import DesignerBackground from "../../comps/lc/background/DesignerBackground";
import DesignerRuler from "../../lib/lc-ruler/DesignerRuler";
import DesignerContainer from "../operate-provider/DesignerContainer";
import GroupMovable from "../../lib/lc-movable/GroupMovable";
import GroupSelectable from "../../lib/lc-movable/GroupSelectable";
import LcRightMenu from "../operate-provider/right-click-menu/ContextMenu";

/**
 * 设计器画布
 */
class DesignerCanvas extends PureComponent<DesignerStore | any> {

    lcbg: any = null;

    updateActive = (e: any) => {
        //todo 优化,事件处理时目前元素参数可能会存在偏差
        let {id: elemId, dataset} = e.target;
        const {updateActive, activeElem, elemConfigs} = designerStore;
        if (elemId === activeElem?.id)
            return;
        updateActive && updateActive({id: parseInt(elemId), type: dataset.type});
        const {setActiveMenu} = rightStore;
        const elemConfig = elemConfigs[elemId];
        const newMenus = Object.keys(elemConfig);
        setActiveMenu(newMenus[0], newMenus);
    }

    /**
     * 元素生成方法
     */
    generateElement = () => {
        const {customComponentInfoMap}: any = designerStarter;
        const {layoutConfigs, elemConfigs, projectConfig} = designerStore!;
        const sortLayout = Object.values(layoutConfigs).sort((a: any, b: any) => a.order - b.order);
        return sortLayout.map((item: MovableItemType) => {
            let Chart: any = customComponentInfoMap[item.type + ''].getComponent();
            const compConfig: any = elemConfigs[item.id + ''];
            let position = item.position || [0, 0];
            return <div id={item.id}
                        data-type={item.type}
                        data-locked={item.locked}
                        data-hide={false}
                        key={item.id + ''}
                        style={{
                            width: item.width,
                            height: item.height,
                            transform: `translate(${position[0]}px, ${position[1]}px)`,
                            position: 'absolute',
                        }} className={'lc-comp-item'}>
                <Chart config={compConfig} realTimeRefresh={projectConfig.realTimeRefresh}/>
            </div>
        });
    }

    getDragScaleProviderProps = () => {
        const {canvasConfig} = designerStore!;
        return {
            contentWidth: canvasConfig?.width,
            contentHeight: canvasConfig?.height,
            containerWidth: window.innerWidth - 95,
            containerHeight: window.innerHeight - 90,
        }
    }

    render() {
        const {elemConfigs} = designerStore;
        return (
            <DesignerContainer>
                <GroupSelectable>
                    <DesignerRuler offsetX={60} offsetY={50}>
                        <DragScaleProvider {...this.getDragScaleProviderProps()}>
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
        );
    }
}

export default observer(DesignerCanvas);

