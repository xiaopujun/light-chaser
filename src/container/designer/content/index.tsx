import React from 'react';
import GridLayout from 'react-grid-layout';
import {connect} from 'react-redux';
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';

import './index.less';
import AntdBar from "../../../component/charts/antd/bar";
import RightSlideBox from "../../../container/designer/right";
import {addItem, deleteItem, updateActiveConfig} from "../../../redux/actions/LayoutDesigner";
import {openRightSlideBox} from '../../../redux/actions/RightSildeBox';
import ReactGridLayout from "react-grid-layout";

class DataXLayoutContent extends React.Component<any, any> {


    state = {
        layout: [],
    }

    generateElement = () => {
        const {layoutDesigner, openRightSlideBox, updateActiveConfig} = this.props;
        const {chartConfig, layoutConfig, currentActive} = layoutDesigner;
        return layoutConfig.map((value: any, index: any, arr: any) => {
            switch (value.name) {
                case 'AntdBaseBar':
                case 'AntdGroupBar':
                case 'AntdPercentBar':
                case 'AntdZoneBar':
                case 'AntdStackBar':
                    return (
                        <div key={`${value.i}`} style={{width: '100%', height: '100%'}}>
                            <AntdBar key={`${value.i}`} openRightSlideBox={openRightSlideBox}
                                     updateActiveConfig={updateActiveConfig}
                                     currentActive={currentActive}
                                     subType={value.name}
                                     config={chartConfig.get(value.i)}
                                     id={value.i}/>
                        </div>
                    )
                case 'BaseBar':
                    return (
                        <div key={`${value.i}`} style={{width: '100%', height: '100%'}}>
                            <AntdBar key={`${value.i}`} openRightSlideBox={openRightSlideBox}
                                     updateActiveConfig={updateActiveConfig}
                                     currentActive={currentActive}
                                     config={chartConfig.get(value.i)}
                                     id={value.i}/>
                        </div>
                    )
                default:
                    return null;
            }
        })
    }

    onDrop = (layout: any, layoutItem: any, _event: any) => {
        const {addItem, layoutDesigner} = this.props;
        const chartName = _event.dataTransfer.getData('chartName');
        const item = {...layoutItem, ...{i: layoutDesigner.count + "", name: chartName}}
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

/**
 * 右滑框容器组件
 */
export default connect(
    (state: any) => ({layoutDesigner: state.layoutDesigner}),
    {addItem, deleteItem, openRightSlideBox, updateActiveConfig}
)(DataXLayoutContent)