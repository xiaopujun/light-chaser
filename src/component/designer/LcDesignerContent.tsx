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
        const {projectConfig} = LCDesignerStore!;
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
            const {layoutConfigs} = LCDesignerStore!;
            this.rgl.setState({layout: layoutConfigs})
        }
    };

    /**
     * 元素被拖动时限定目标元素大小
     */
    onDropDragOver = (e: any) => {
        return {w: 15, h: 15}
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
        const {layoutConfigs, projectConfig} = LCDesignerStore!;
        const {scale} = this.state;
        return (
            <DragScaleProvider contentWidth={projectConfig.screenWidth}
                               contentHeight={projectConfig.screenHeight}
                               containerWidth={window.innerWidth - 95}
                               containerHeight={window.innerHeight - 90}
                               changeScale={this.changeScale}>
                <div className={'lc-canvas'}
                     id={'-1'} data-type={'lcCanvas'}
                     onClick={this.updateActive}
                     style={{
                         height: projectConfig.screenHeight,
                         backgroundColor: '#131e26',
                         width: projectConfig.screenWidth,
                         // backgroundImage: `url(${bgImg})`
                     }}>
                    <ReactGridLayout ref={obj => this.rgl = obj}
                                     className="layout"
                                     layout={layoutConfigs}
                                     cols={projectConfig?.columns || 1920 / 5}
                                     rowHeight={5}
                                     margin={[0, 0]}
                                     useCSSTransforms={true}
                                     preventCollision={true}
                                     allowOverlap={true}
                                     isBounded={true}
                                     isDroppable={true}
                                     style={{height: projectConfig.screenHeight}}
                                     transformScale={scale}
                                     width={projectConfig.screenWidth}
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
