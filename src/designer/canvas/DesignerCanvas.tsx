import React, {PureComponent} from 'react';
import DragScaleProvider from "../operate-provider/DragScaleProvider";
import {observer} from "mobx-react";
import designerStore, {DesignerStore} from "../store/DesignerStore";
import DesignerBackground from "../../comps/lc/background/DesignerBackground";
import designerStarter from "../DesignerStarter";
import rightStore from "../right/RightStore";
import DesignerRuler from "../../lib/lc-ruler/DesignerRuler";
import DesignerContainer from "../operate-provider/DesignerContainer";
import GroupMovable from "../../lib/lc-movable/GroupMovable";
import GroupSelectable from "../../lib/lc-movable/GroupSelectable";
import {MovableItemData} from "../../lib/lc-movable/types";
import LcRightMenu from "../operate-provider/right-click-menu/OperateMenu";

/**
 * 设计器画布
 */
class DesignerCanvas extends PureComponent<DesignerStore | any> {

    rgl: any = null;
    lcbg: any = null;

    calculateChartConfig = (elemId: string | number) => {
        const {elemConfigs} = designerStore;
        if (elemConfigs)
            return elemConfigs[elemId];
    }

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
        const {layoutConfigs} = designerStore!;
        if (layoutConfigs && layoutConfigs.length > 0) {
            const {customComponentInfoMap}: any = designerStarter;
            return layoutConfigs.map((item: MovableItemData) => {
                let Chart: any = customComponentInfoMap[item.type + ''].getComponent();
                const compConfig: any = this.calculateChartConfig(item.id + '');
                return (
                    <div id={item.id} data-type={item.type} key={item.id + ''}
                         style={{
                             width: item.width,
                             height: item.height,
                             transform: `translate(${item.position[0]}px, ${item.position[1]}px)`,
                             position: 'absolute'
                         }} className={'lc-comp-item'}>
                        <Chart config={compConfig}/>
                    </div>
                );
            })
        }
    }

    /**
     * 删除目标组件
     */
    delItem = (elemId: string) => {
        const {delItem, layoutConfigs} = designerStore;
        delItem && delItem(elemId);
        if (this.rgl != null)
            this.rgl.setState({layout: layoutConfigs})
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

