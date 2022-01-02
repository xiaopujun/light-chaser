import React from 'react';
import GridLayout from 'react-grid-layout';
import 'antd/dist/antd.css';
import {Layout, Button} from 'antd';
import {connect} from 'react-redux';
import {AreaChartOutlined} from '@ant-design/icons';
import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../../node_modules/react-resizable/css/styles.css';

import './index.less';
import GlowBorder from "../../../component/border/four-angle-glow";
import AntdBar from "../../../component/charts/antd/bar";
import RightSlideBox from "../../../container/designer/right";
import {addItem, deleteItem, updateActiveConfig} from "../../../redux/actions/LayoutDesigner";
import {openRightSlideBox} from '../../../redux/actions/RightSildeBox';
import ComponentLib from "../left";

const {Content, Sider} = Layout;

class DataZBigScreenDesigner extends React.Component {


    state = {
        layout: [],
    }

    generateElement = () => {
        const {layoutDesigner, openRightSlideBox, updateActiveConfig} = this.props;
        const {chartConfig, layoutConfig, currentActive} = layoutDesigner;
        return layoutConfig.map((value, index, arr) => {
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

    onDrop = (layout, layoutItem, _event) => {
        const {addItem, layoutDesigner} = this.props;
        const chartName = _event.dataTransfer.getData('chartName');
        const item = {...layoutItem, ...{i: layoutDesigner.count + "", name: chartName}}
        addItem(item);

        //todo 目前平滑拖拽效果还需要该state支持，后续研究后需要优化掉
        layout[layout.length - 1] = {...layoutItem, ...{i: layout.length - 1 + ""}}
        this.setState({layout: layout});
    };

    onDropDragOver = (e) => {
        return {w: 8, h: 8}
    }

    render() {
        return (
            <Layout className={'big-screen-layout-designer'} style={{minHeight: '100vh'}}>
                <Sider width={300} className={'left-tools'}>
                    <div className="logo">DataZ-可视化大屏布局设计器</div>
                    <ComponentLib/>
                </Sider>
                <Layout className="site-layout">
                    {/*<Header className="site-layout-background" style={{padding: 0}}/>*/}
                    <Content className={'designer-content'} style={{margin: '0'}}>
                        <div className="site-layout-background" style={{padding: 15, height: window.innerHeight}}>
                            <GridLayout className="layout"
                                        {...this.props}
                                        layout={this.state.layout}
                                        onDropDragOver={this.onDropDragOver}
                                        cols={48}
                                        rowHeight={10}
                                        onDrop={this.onDrop}
                                        margin={[10, 10]}
                                        useCSSTransforms={true}
                                        measureBeforeMount={false}
                                        preventCollision={true}
                                        allowOverlap={true}
                                        onLayoutChange={this.onLayoutChange}
                                        isBounded={true}
                                        isDroppable={true}
                                        height={window.innerHeight}
                                        width={window.innerWidth - 375}>
                                {this.generateElement()}
                            </GridLayout>
                        </div>
                    </Content>
                </Layout>
                <RightSlideBox/>
            </Layout>
        );
    }
}

/**
 * 右滑框容器组件
 */
export default connect(
    state => ({layoutDesigner: state.layoutDesigner}),
    {addItem, deleteItem, openRightSlideBox, updateActiveConfig}
)(DataZBigScreenDesigner)