import React from 'react';
import ReactGridLayout, {Layout} from "react-grid-layout";
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';
import './index.less';
import AntdBar from "../../../component/charts/antd/bar";
import RightSlideBox from "../right";

export default class DataXLayoutContent extends React.Component<any, any> {

    rgl: any = null;

    /**
     * 元素生成方法
     */
    generateElement = () => {
        const {dataXDesigner} = this.props;
        const {layoutConfig} = dataXDesigner;
        return layoutConfig.map((item: any, index: any, arr: any) => {
            switch (item.name) {
                case 'AntdBaseBar':
                case 'AntdGroupBar':
                case 'AntdPercentBar':
                case 'AntdZoneBar':
                case 'AntdStackBar':
                    return (
                        <div key={item?.id + ''} style={{width: '100%', height: '100%'}}>
                            <AntdBar elemId={item?.id} deleteItem={this.deleteItem} {...this.props}/>
                        </div>
                    )
                default:
                    return null;
            }
        })
    }

    /**
     * 删除目标组件
     */
    deleteItem = (elemId: string) => {
        const {deleteItem, dataXDesigner} = this.props;
        deleteItem(elemId);

        if (this.rgl != null) {
            const {layoutConfig} = dataXDesigner;
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
        const {addItem, dataXDesigner} = this.props;
        const chartName = _event.dataTransfer.getData('chartName');
        const item = {...layoutItem, ...{i: dataXDesigner?.count + "", id: dataXDesigner?.count, name: chartName}}
        addItem(item);

        if (this.rgl != null) {
            const {layoutConfig} = dataXDesigner;
            this.rgl.setState({layout: layoutConfig})
        }
    };

    /**
     * 元素被拖动时限定目标元素大小
     * @param e
     */
    onDropDragOver = (e: any) => {
        return {w: 8, h: 8}
    }

    /**
     * @description 组件拖拽变化回调
     * @param layout
     */
    onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateItemLayout} = this.props;
        updateItemLayout(newItem);
    }

    /**
     * @description 组件大小变化回调
     * @param layout
     * @param oldItem
     * @param newItem
     * @param placeholder
     * @param event
     * @param element
     */
    onResizeStop = (layout: Layout[], oldItem: Layout, newItem: Layout, placeholder: Layout, event: MouseEvent, element: HTMLElement,) => {
        const {updateItemLayout} = this.props;
        updateItemLayout(newItem);
    }

    render() {
        const {dataXDesigner} = this.props;
        const {layoutConfig} = dataXDesigner;
        return (
            <>
                <div className="site-layout-background" style={{padding: 5, height: window.innerHeight}}>
                    <ReactGridLayout ref={obj => this.rgl = obj}
                                     className="layout"
                                     layout={layoutConfig}
                                     cols={48}
                                     rowHeight={10}
                                     margin={[10, 10]}
                                     useCSSTransforms={true}
                                     preventCollision={true}
                                     allowOverlap={true}
                                     isBounded={true}
                                     isDroppable={true}
                                     style={{height: window.innerHeight - 144}}
                                     width={window.innerWidth - 205}
                                     onDrop={this.onDrop}
                                     onDropDragOver={this.onDropDragOver}
                                     onDragStop={this.onDragStop}
                                     onResizeStop={this.onResizeStop}
                    >
                        {this.generateElement()}
                    </ReactGridLayout>
                    <RightSlideBox {...this.props}/>
                </div>

            </>
        );
    }
}
