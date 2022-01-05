import React, {Component} from 'react';
import {Collapse} from 'antd';
import './index.less';
import TitleConfig from "./title";
import BorderConfig from "./border";
import BackgroundConfig from "./background";
import ChartConfig from "./chart";

const {Panel} = Collapse;

/**
 * 右滑框中的组件配置选项
 */
export default class ElemPropSet extends Component {


    render() {
        return (
            <Collapse className={'charts-properties'} bordered={false} defaultActiveKey={['1']}>
                <Panel className={'charts-properties-title'} header="标题" key="1">
                    <TitleConfig {...this.props}/>
                </Panel>
                <Panel className={'charts-properties-title'} header="边框" key="2">
                    <BorderConfig {...this.props}/>
                </Panel>
                <Panel className={'charts-properties-title'} header="背景" key="3">
                    <BackgroundConfig {...this.props}/>
                </Panel>
                <Panel className={'charts-properties-title'} header="图表" key="4">
                    <ChartConfig {...this.props}/>
                </Panel>
                <Panel className={'charts-properties-title'} header="数据源" key="5">
                    <p>暂无</p>
                </Panel>
            </Collapse>
        );
    }
}
