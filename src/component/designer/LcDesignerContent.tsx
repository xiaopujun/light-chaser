import React, {Suspense} from 'react';
import ReactGridLayout, {Layout} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style/Content.less';
import getChartsTemplate from "../charts/ChartsCollection";
import {LCDesignerProps} from "../../types/LcDesignerType";
import Loading from "../loading/Loading";
import DragScaleProvider from "./DragScaleProvider";

interface LcDesignerContentProps {
    LCDesignerStore?: LCDesignerProps;
    delItem?: (id: string | number) => void;
    addItem?: (data: any) => void;
    updateLayout?: (data: any) => void;
    updateActive?: (data: any) => void; //打开右侧配置项回调
}

export default class LcDesignerContent extends React.Component<LcDesignerContentProps | any> {

    rgl: any = null;

    state: any = {
        scale: 1
    }

    calculateChartConfig = (elemId: string | number) => {
        const {LCDesignerStore: {chartConfigs}} = this.props;
        return chartConfigs[elemId];
    }

    updateActive = (e: any) => {
        //阻止事件冒泡
        e.stopPropagation();
        let {id: elemId, dataset} = e.currentTarget;
        const {updateActive} = this.props;
        updateActive && updateActive({elemId: parseInt(elemId), type: dataset.type});
    }

    /**
     * 元素生成方法
     */
    generateElement = () => {
        const {LCDesignerStore, updateActive} = this.props;
        const {layoutConfigs} = LCDesignerStore!;
        return layoutConfigs.map((item: any) => {
            let Chart: any = getChartsTemplate(item.name);
            const chartConfig = this.calculateChartConfig(item.id);
            return (
                <div key={item?.id + ''} className={'lc-comp-item'}
                     id={item.id} data-type={chartConfig?.baseInfo?.type}
                     onClick={this.updateActive}
                     style={{width: '100%', height: '100%'}}>
                    <Suspense fallback={<Loading width={'100%'} height={'100%'}/>}>
                        <Chart elemId={item?.id}
                               chartConfig={chartConfig}
                               updateActive={updateActive}
                               delItem={this.delItem}/>
                    </Suspense>
                </div>
            );
        })
    }

    /**
     * 删除目标组件
     */
    delItem = (elemId: string) => {
        const {delItem, LCDesignerStore} = this.props;
        delItem && delItem(elemId);

        if (this.rgl != null) {
            const {layoutConfigs} = LCDesignerStore!;
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
        const {addItem, LCDesignerStore} = this.props;
        const {canvasConfig} = LCDesignerStore!;
        let compObj
        try {
            compObj = JSON.parse(_event.dataTransfer.getData('compObj'));
        } catch (e) {
            console.log('异常', e)
        }
        const item = {
            ...layoutItem, ...{
                i: canvasConfig?.elemCount + "",
                id: canvasConfig?.elemCount,
                name: compObj?.chartName,
                type: compObj?.type
            }
        }
        addItem && addItem(item);
        if (this.rgl != null) {
            const {layoutConfigs} = LCDesignerStore!;
            this.rgl.setState({layout: layoutConfigs})
        }
    };

    /**
     * 元素被拖动时限定目标元素大小
     */
    onDropDragOver = (e: any) => {
        return {w: 5, h: 5}
    }

    /**
     * 组件拖拽变化回调
     */
    onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateLayout} = this.props;
        updateLayout && updateLayout(newItem);
    }

    /**
     * 组件大小变化回调
     */
    onResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateLayout} = this.props;
        updateLayout && updateLayout(newItem);
    }

    changeScale = (scale: number) => this.setState({scale: scale});


    render() {
        const {LCDesignerStore} = this.props;
        const {layoutConfigs, canvasConfig} = LCDesignerStore!;
        const {scale} = this.state;
        return (
            <DragScaleProvider contentWidth={canvasConfig.screenWidth}
                               contentHeight={canvasConfig.screenHeight}
                               containerWidth={window.innerWidth - 95}
                               containerHeight={window.innerHeight - 90}
                               changeScale={this.changeScale}>
                <div className={'lc-canvas'}
                     id={'-1'} data-type={'lcCanvas'}
                     onClick={this.updateActive}
                     style={{
                         height: canvasConfig.screenHeight,
                         backgroundColor: '#131e26',
                         width: canvasConfig.screenWidth,
                         // backgroundImage: `url(${bgImg})`
                     }}>\
                    <ReactGridLayout ref={obj => this.rgl = obj}
                                     className="layout"
                                     layout={layoutConfigs}
                                     cols={canvasConfig?.columns || 48}
                                     rowHeight={10}
                                     margin={[15, 15]}
                                     useCSSTransforms={true}
                                     preventCollision={true}
                                     allowOverlap={true}
                                     isBounded={true}
                                     isDroppable={true}
                                     style={{height: canvasConfig.screenHeight}}
                                     transformScale={scale}
                                     width={canvasConfig.screenWidth}
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
