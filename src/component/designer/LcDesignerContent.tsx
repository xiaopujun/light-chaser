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

    scaleConfig: any = {
        result: {},
        x: 0,
        y: 0,
        scale: 1,
        minScale: 0.1,
        maxScale: 5,
        isPointerdown: false, // 按下标识
        point: {x: 0, y: 0}, // 第一个点坐标
        diff: {x: 0, y: 0}, // 相对于上一次pointermove移动差值
        lastPointermove: {x: 0, y: 0}, // 用于计算diff
        ctrlDown: false,
    }

    calculateChartConfig = (elemId: string | number) => {
        const {LCDesignerStore: {chartConfigs}} = this.props;
        return chartConfigs[elemId];
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
                <div key={item?.id + ''} style={{width: '100%', height: '100%'}}>
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
        const {globalSet} = LCDesignerStore!;
        let compObj
        try {
            compObj = JSON.parse(_event.dataTransfer.getData('compObj'));
        } catch (e) {
            console.log('异常', e)
        }
        const item = {
            ...layoutItem, ...{
                i: globalSet?.elemCount + "",
                id: globalSet?.elemCount,
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
     * @param e
     */
    onDropDragOver = (e: any) => {
        return {w: 5, h: 5}
    }

    /**
     * @description 组件拖拽变化回调
     * @param layout
     */
    onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateLayout} = this.props;
        updateLayout && updateLayout(newItem);
    }

    /**
     * @description 组件大小变化回调
     */
    onResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateLayout} = this.props;
        updateLayout && updateLayout(newItem);
    }

    changeScale = (scale: number) => {
        this.setState({
            scale: scale
        })
    }

    render() {
        const {LCDesignerStore} = this.props;
        const {layoutConfigs, globalSet} = LCDesignerStore!;
        const {scale} = this.state;
        return (
            <DragScaleProvider contentWidth={globalSet.screenWidth}
                               contentHeight={globalSet.screenHeight}
                               containerWidth={window.innerWidth - 600}
                               containerHeight={window.innerHeight - 64}
                               changeScale={this.changeScale}>
                <ReactGridLayout ref={obj => this.rgl = obj}
                                 className="layout"
                                 layout={layoutConfigs}
                                 cols={globalSet?.columns || 48}
                                 rowHeight={10}
                                 margin={[15, 15]}
                                 useCSSTransforms={true}
                                 preventCollision={true}
                                 allowOverlap={true}
                                 isBounded={true}
                                 isDroppable={true}
                                 style={{height: globalSet.screenHeight, backgroundColor: '#131e26',}}
                                 transformScale={scale}
                                 width={globalSet.screenWidth}
                                 onDrop={this.onDrop}
                                 onDropDragOver={this.onDropDragOver}
                                 onDragStop={this.onDragStop}
                                 onResizeStop={this.onResizeStop}>
                    {this.generateElement()}
                </ReactGridLayout>
            </DragScaleProvider>
        );
    }
}
