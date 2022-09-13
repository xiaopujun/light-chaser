import React from 'react';
import ReactGridLayout, {Layout} from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './index.less';
import getChartsTemplate from "../../charts/ComponentChartInit";

export default class LCLayoutContent extends React.Component<any, any> {

    rgl: any = null;

    /**
     * 元素生成方法
     */
    generateElement = () => {
        const {LCDesignerStore} = this.props;
        const {layoutConfig} = LCDesignerStore;
        return layoutConfig.map((item: any) => {
            let ElementChart = getChartsTemplate(item.name);
            return (
                <div key={item?.id + ''} style={{width: '100%', height: '100%'}}>
                    <ElementChart elemId={item?.id} deleteItem={this.deleteItem} {...this.props}/>
                </div>
            );
        })
    }

    /**
     * 删除目标组件
     */
    deleteItem = (elemId: string) => {
        const {deleteItem, LCDesignerStore} = this.props;
        deleteItem(elemId);

        if (this.rgl != null) {
            const {layoutConfig} = LCDesignerStore;
            this.rgl.setState({layout: layoutConfig})
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
        const chartName = _event.dataTransfer.getData('chartName');
        const item = {...layoutItem, ...{i: LCDesignerStore?.count + "", id: LCDesignerStore?.count, name: chartName}}
        addItem(item);

        if (this.rgl != null) {
            const {layoutConfig} = LCDesignerStore;
            this.rgl.setState({layout: layoutConfig})
        }
    };

    /**
     * 元素被拖动时限定目标元素大小
     * @param e
     */
    onDropDragOver = (e: any) => {
        return {w: 6, h: 12}
    }

    /**
     * @description 组件拖拽变化回调
     * @param layout
     */
    onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateItemLayout} = this.props;
        updateItemLayout(newItem);
    }

    onDrag = (layout: any, oldItem: any, newItem: any,
              placeholder: any, e: any, element: HTMLElement) => {
    }

    /**
     * @description 组件大小变化回调
     */
    onResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateItemLayout} = this.props;
        updateItemLayout(newItem);
    }

    render() {
        const {LCDesignerStore} = this.props;
        const {layoutConfig} = LCDesignerStore;
        return (
            <div className="site-layout-background" style={{height: window.innerHeight - 64}}>
                <ReactGridLayout ref={obj => this.rgl = obj}
                                 className="layout"
                                 layout={layoutConfig}
                                 cols={48}
                                 rowHeight={10}
                                 margin={[15, 15]}
                                 useCSSTransforms={true}
                                 preventCollision={true}
                                 allowOverlap={true}
                                 isBounded={true}
                                 isDroppable={true}
                                 style={{height: window.innerHeight - 64}}
                                 width={window.innerWidth - 600}
                                 onDrop={this.onDrop}
                                 onDrag={this.onDrag}
                                 onDropDragOver={this.onDropDragOver}
                                 onDragStop={this.onDragStop}
                                 onResizeStop={this.onResizeStop}>
                    {this.generateElement()}
                </ReactGridLayout>
            </div>
        );
    }
}
