import React, {PureComponent} from 'react';
import ReactGridLayout, {Layout} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import DragScaleProvider from "../tools/DragScaleProvider";
import {observer} from "mobx-react";
import designerStore, {DesignerStore} from "../store/DesignerStore";
import DesignerBackground from "./DesignerBackground";
import rootStore from "../BootStore";
import rightStore from "../right/RightStore";
import DesignerRuler from "../../lib/lc-ruler/DesignerRuler";
import DesignerContainer from "../tools/DesignerContainer";
import eventOperateStore from "../event/EventOperateStore";

class DesignerContent extends PureComponent<DesignerStore | any> {

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
        if (!elemId) {
            elemId = e.currentTarget.id;
            dataset = e.currentTarget.dataset;
        }
        const {updateActive, activeElem, elemConfigs} = designerStore;
        if (elemId === activeElem?.id)
            return;
        updateActive && updateActive({id: parseInt(elemId), type: dataset.type});
        const {setActiveMenu} = rightStore;
        const elemConfig = elemConfigs[elemId];
        const activeMenu = Object.keys(elemConfig)[0];
        setActiveMenu(activeMenu);
    }

    /**
     * 元素生成方法
     */
    generateElement = () => {
        const {layoutConfigs} = designerStore!;
        if (layoutConfigs && layoutConfigs.length > 0) {
            const {compsClazz} = rootStore;
            return layoutConfigs.map((item: any) => {
                let Chart: any = compsClazz[item.compKey];
                const compConfig: any = this.calculateChartConfig(item.id);
                return (
                    <div key={item?.id + ''} className={'lc-comp-item'}
                         id={item.id} data-type={compConfig?.info?.type}
                        // onClick={this.updateActive}
                         style={{width: '100%', height: '100%'}}>
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

    /**
     *  元素拖动方法
     */
    onDrop = (layout: any, layoutItem: any, _event: any) => {
        const {addItem, layoutConfigs, statisticInfo} = designerStore;
        let compObj = JSON.parse(_event.dataTransfer.getData('compObj'));
        const item = {
            ...layoutItem, ...{
                i: statisticInfo?.count + "",
                id: statisticInfo?.count,
                compName: compObj?.compName,
                compKey: compObj?.compKey
            }
        }
        addItem && addItem(item);
        if (this.rgl != null)
            this.rgl.setState({layout: layoutConfigs})
    };

    /**
     * 元素被拖动时限定目标元素大小
     */
    onDropDragOver = () => {
        return {w: 32, h: 18}
    }

    /**
     * 组件拖拽变化回调
     */
    onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        if (JSON.stringify(oldItem) === JSON.stringify(newItem))
            return;
        const {updateLayout} = designerStore;
        updateLayout && updateLayout(newItem);
    }

    /**
     * 组件大小变化回调
     */
    onResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        const {updateLayout} = designerStore;
        updateLayout && updateLayout(newItem);
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

    getRGLProps = () => {
        const {layoutConfigs, canvasConfig} = designerStore;
        const {scale} = eventOperateStore;
        let margin: [number, number] = [0, 0];
        return {
            layout: layoutConfigs,
            cols: canvasConfig?.columns || 1920 / 5,
            rowHeight: 5,
            margin: margin,
            useCSSTransforms: true,
            preventCollision: true,
            allowOverlap: true,
            isBounded: true,
            isDroppable: true,
            style: {height: canvasConfig?.height},
            transformScale: scale,
            width: canvasConfig?.width,
            onDrop: this.onDrop,
            onDropDragOver: this.onDropDragOver,
            onDragStop: this.onDragStop,
            onResizeStop: this.onResizeStop,
        }
    }

    render() {
        return (
            <DesignerContainer>
                <DesignerRuler>
                    <DragScaleProvider {...this.getDragScaleProviderProps()}>
                        <DesignerBackground onClick={this.updateActive} ref={obj => this.lcbg = obj}>
                            <ReactGridLayout ref={obj => this.rgl = obj} className="layout" {...this.getRGLProps()}>
                                {this.generateElement()}
                            </ReactGridLayout>
                        </DesignerBackground>
                    </DragScaleProvider>
                </DesignerRuler>
            </DesignerContainer>
        );
    }
}

export default observer(DesignerContent);

