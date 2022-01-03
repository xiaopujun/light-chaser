import React from 'react';
import ReactGridLayout from "react-grid-layout";
import '../../../../node_modules/react-grid-layout/css/styles.css';

import '../../../../node_modules/react-resizable/css/styles.css';
import './index.less';
import AntdBar from "../../../component/charts/antd/bar";
import RightSlideBox from "../right";
import {addItem, deleteItem} from "../../../redux/actions/LayoutDesigner";

export default class DataXLayoutContent extends React.Component<any, any> {


    state = {
        layout: [],
    }

    generateElement = () => {
        const {dataXDesigner} = this.props;
        const {chartConfigMap, layoutConfig} = dataXDesigner;
        return layoutConfig.map((value: any, index: any, arr: any) => {
            switch (value.name) {
                case 'AntdBaseBar':
                case 'AntdGroupBar':
                case 'AntdPercentBar':
                case 'AntdZoneBar':
                case 'AntdStackBar':
                    return (
                        <div key={value?.i + ''} style={{width: '100%', height: '100%'}}>
                            <AntdBar id={value?.i} {...this.props}/>
                        </div>
                    )
                default:
                    return null;
            }
        })
    }

    onDrop = (layout: any, layoutItem: any, _event: any) => {
        const {addItem, dataXDesigner} = this.props;
        const chartName = _event.dataTransfer.getData('chartName');
        const item = {...layoutItem, ...{i: dataXDesigner?.count, name: chartName}}
        addItem(item);

        //todo 目前平滑拖拽效果还需要该state支持，后续研究后需要优化掉
        layout[layout.length - 1] = {...layoutItem, ...{i: layout.length - 1 + ""}}
        this.setState({layout: layout});
    };

    onDropDragOver = (e: any) => {
        return {w: 8, h: 8}
    }

    render() {
        return (
            <>
                <div className="site-layout-background" style={{padding: 5, height: window.innerHeight}}>
                    <ReactGridLayout className="layout"
                                     {...this.props}
                                     layout={this.state.layout}
                                     onDropDragOver={this.onDropDragOver}
                                     cols={48}
                                     rowHeight={10}
                                     onDrop={this.onDrop}
                                     margin={[10, 10]}
                                     useCSSTransforms={true}
                                     preventCollision={true}
                                     allowOverlap={true}
                                     isBounded={true}
                                     isDroppable={true}
                                     style={{height: window.innerHeight - 144}}
                                     width={window.innerWidth - 375}>
                        {this.generateElement()}
                    </ReactGridLayout>
                </div>
                <RightSlideBox/>
            </>
        );
    }
}
