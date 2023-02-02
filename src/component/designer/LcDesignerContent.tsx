import React from 'react';
import ReactGridLayout, {Layout} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style/Content.less';
import getChartsTemplate from "../charts/ChartsCollection";
import DragScaleProvider from "./DragScaleProvider";
import localforage from 'localforage';
import {observer} from "mobx-react";
import lcDesignerContentStore, {LcDesignerContentStore} from "./store/LcDesignerContentStore";

class LcDesignerContent extends React.Component<LcDesignerContentStore | any> {

    rgl: any = null;
    bgImgId = "";
    state: any = {
        scale: 1,
        bgImg: null
    }

    calculateChartConfig = (elemId: string | number) => {
        const {chartConfigs} = lcDesignerContentStore;
        if (chartConfigs)
            return chartConfigs[elemId];
    }

    updateActive = (e: any) => {
        //阻止事件冒泡
        e.stopPropagation();
        let {id: elemId, dataset} = e.currentTarget;
        const {updateActive} = lcDesignerContentStore;
        updateActive && updateActive({id: parseInt(elemId), type: dataset.type});
    }

    /**
     * 元素生成方法
     */
    generateElement = () => {
        const {layoutConfigs, updateActive} = lcDesignerContentStore!;
        if (layoutConfigs) {
            return layoutConfigs.map((item: any) => {
                let Chart: any = getChartsTemplate(item.name);
                const chartConfig = this.calculateChartConfig(item.id);
                return (
                    <div key={item?.id + ''} className={'lc-comp-item'}
                         id={item.id} data-type={chartConfig?.baseInfo?.type}
                         onClick={this.updateActive}
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
        if (this.rgl != null) {
            this.rgl.setState({layout: layoutConfigs})
        }
    }

    /**
     * @description 元素拖动方法
     * @param layout
     * @param layoutItem
     * @param _event
     */
    onDrop = (layout: any, layoutItem: any, _event: any) => {
        const {addItem, layoutConfigs, projectConfig} = lcDesignerContentStore;
        let compObj
        try {
            compObj = JSON.parse(_event.dataTransfer.getData('compObj'));
        } catch (e) {
            console.log('异常', e)
        }
        const item = {
            ...layoutItem, ...{
                i: projectConfig?.elemCount + "",
                id: projectConfig?.elemCount,
                name: compObj?.chartName,
                type: compObj?.type
            }
        }
        addItem && addItem(item);
        if (this.rgl != null) {
            this.rgl.setState({layout: layoutConfigs})
        }
    };

    /**
     * 元素被拖动时限定目标元素大小
     */
    onDropDragOver = () => {
        return {w: 15, h: 15}
    }

    /**
     * 组件拖拽变化回调
     */
    onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
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

    getBgImgSource = () => {
        const {bgConfig} = lcDesignerContentStore!;
        if (bgConfig) {
            if (bgConfig.imgSource !== '' && bgConfig.imgSource !== this.bgImgId) {
                localforage.getItem(bgConfig?.imgSource).then((value => {
                    this.setState({bgImg: value})
                }))
            }
        }
    }

    getDragScaleProviderProps = () => {
        const {projectConfig} = lcDesignerContentStore!;
        return {
            contentWidth: projectConfig?.screenWidth,
            contentHeight: projectConfig?.screenHeight,
            containerWidth: window.innerWidth - 95,
            containerHeight: window.innerHeight - 90,
        }
    }

    getBgConfigProps = () => {
        const {projectConfig} = lcDesignerContentStore!;
        const {bgImg} = this.state;
        if (projectConfig) {
            let bgConfigProps: any = {
                height: projectConfig.screenHeight,
                width: projectConfig.screenWidth,
                backgroundColor: '#131e26',
            }
            if (bgImg)
                bgConfigProps['backgroundImage'] = `url(${this.state.bgImg})`;
            return bgConfigProps;
        }
    }

    render() {
        this.getBgImgSource();
        const {layoutConfigs, projectConfig, canvasConfig} = lcDesignerContentStore;
        const {scale} = this.state;
        return (
            <DragScaleProvider {...this.getDragScaleProviderProps()} changeScale={this.changeScale}>
                <div className={'lc-canvas'}
                     id={'-1'}
                     data-type={'lcCanvas'}
                     onClick={this.updateActive}
                     style={this.getBgConfigProps()}>
                    <ReactGridLayout ref={obj => this.rgl = obj}
                                     className="layout"
                                     layout={layoutConfigs}
                                     cols={canvasConfig?.columns || 1920 / 5}
                                     rowHeight={5}
                                     margin={[0, 0]}
                                     useCSSTransforms={true}
                                     preventCollision={true}
                                     allowOverlap={true}
                                     isBounded={true}
                                     isDroppable={true}
                                     style={{height: projectConfig?.screenHeight}}
                                     transformScale={scale}
                                     width={projectConfig?.screenWidth}
                                     onDrop={this.onDrop}
                                     onDropDragOver={this.onDropDragOver}
                                     onDragStop={this.onDragStop}
                                     onResizeStop={this.onResizeStop}>
                        {this.generateElement()}
                    </ReactGridLayout>
                </div>
            </DragScaleProvider>
        );
    }
}

export default observer(LcDesignerContent);

