import React, {PureComponent} from 'react';
import './style/Content.less';
import ReactGridLayout, {Layout} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import getChartsTemplate from "../charts/ChartsCollection";
import DragScaleProvider from "./DragScaleProvider";
import {observer} from "mobx-react";
import lcDesignerContentStore, {LcDesignerContentStore} from "./store/LcDesignerContentStore";
import lcRightMenuStore from "./store/LcRightMenuStore";
import LcDesignerBackground from "./LcDesignerBackground";

class LcDesignerContent extends PureComponent<LcDesignerContentStore | any> {

    rgl: any = null;
    lcbg: any = null;
    state: any = {
        scale: 1,
    }

    componentDidMount() {
        this.registerRightMenu();
    }

    calculateChartConfig = (elemId: string | number) => {
        const {chartConfigs} = lcDesignerContentStore;
        if (chartConfigs)
            return chartConfigs[elemId];
    }

    updateActive = (e: any) => {
        //todo 优化,事件处理时目前元素参数可能会存在偏差
        let {id: elemId, dataset} = e.target;
        if (!elemId) {
            elemId = e.currentTarget.id;
            dataset = e.currentTarget.dataset;
        }
        const {updateActive} = lcDesignerContentStore;
        updateActive && updateActive({id: parseInt(elemId), type: dataset.type});
        return false;
    }

    /**
     * 元素生成方法
     */
    generateElement = () => {
        const {layoutConfigs, updateActive} = lcDesignerContentStore!;
        if (layoutConfigs && layoutConfigs.length > 0) {
            return layoutConfigs.map((item: any) => {
                let Chart: any = getChartsTemplate(item.name);
                const chartConfig = this.calculateChartConfig(item.id);
                return (
                    <div key={item?.id + ''} className={'lc-comp-item'}
                         id={item.id} data-type={chartConfig?.baseInfo?.type}
                        // onClick={this.updateActive}
                         style={{width: '100%', height: '100%'}}>
                        <Chart elemId={item?.id}
                               chartConfig={chartConfig}
                               updateActive={updateActive}
                               delItem={this.delItem}/>
                    </div>
                );
            })
        }
    }

    /**
     * 删除目标组件
     */
    delItem = (elemId: string) => {
        const {delItem, layoutConfigs} = lcDesignerContentStore;
        delItem && delItem(elemId);
        if (this.rgl != null)
            this.rgl.setState({layout: layoutConfigs})
    }

    /**
     *  元素拖动方法
     */
    onDrop = (layout: any, layoutItem: any, _event: any) => {
        const {addItem, layoutConfigs, projectConfig} = lcDesignerContentStore;
        let compObj = JSON.parse(_event.dataTransfer.getData('compObj'));
        const item = {
            ...layoutItem, ...{
                i: projectConfig?.elemCount + "",
                id: projectConfig?.elemCount,
                name: compObj?.chartName,
                type: compObj?.type
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
        const {updateLayout} = lcDesignerContentStore;
        updateLayout && updateLayout(newItem);
    }

    /**
     * 组件大小变化回调
     */
    onResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        const {updateLayout} = lcDesignerContentStore;
        updateLayout && updateLayout(newItem);
    }

    changeScale = (scale: number) => this.setState({scale: scale});

    getDragScaleProviderProps = () => {
        const {projectConfig} = lcDesignerContentStore!;
        return {
            contentWidth: projectConfig?.screenWidth,
            contentHeight: projectConfig?.screenHeight,
            containerWidth: window.innerWidth - 95,
            containerHeight: window.innerHeight - 90,
            changeScale: this.changeScale
        }
    }

    getRGLProps = () => {
        const {layoutConfigs, projectConfig, canvasConfig} = lcDesignerContentStore;
        const {scale} = this.state;
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
            style: {height: projectConfig?.screenHeight},
            transformScale: scale,
            width: projectConfig?.screenWidth,
            onDrop: this.onDrop,
            onDropDragOver: this.onDropDragOver,
            onDragStop: this.onDragStop,
            onResizeStop: this.onResizeStop,
        }
    }

    registerRightMenu = () => {
        const {updateVisible, setPosition, setTargetId} = lcRightMenuStore;
        document.addEventListener("click", (event: any) => {
                const {visible} = lcRightMenuStore;
                if (visible && event.button === 0)
                    updateVisible(false);
            }
        );
        document.addEventListener("contextmenu", (event: any) => {
            event.preventDefault();
            if (event.target.className.indexOf('react-grid-item') > -1) {
                updateVisible && updateVisible(true);
                setPosition([event.clientX, event.clientY]);
                setTargetId && setTargetId(parseInt(event.target.id));
            } else {
                updateVisible && updateVisible(false);
            }
        });

    }

    render() {
        return (
            <DragScaleProvider {...this.getDragScaleProviderProps()}>
                <LcDesignerBackground onClick={this.updateActive} ref={obj => this.lcbg = obj}>
                    <ReactGridLayout ref={obj => this.rgl = obj} className="layout" {...this.getRGLProps()}>
                        {this.generateElement()}
                    </ReactGridLayout>
                </LcDesignerBackground>
            </DragScaleProvider>
        );
    }
}

export default observer(LcDesignerContent);

