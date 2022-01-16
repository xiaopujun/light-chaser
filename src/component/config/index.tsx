import React, {Component} from 'react';
import {Collapse} from 'antd';
import './index.less';
import ElemBaseSet from "./base";
import ElemChartSet from "./chart";
import ElemDataSet from "./data";

const {Panel} = Collapse;

/**
 * 右滑框中的组件配置选项
 */
export default class ElemPropSet extends Component<any> {


    render() {
        return (
            <Collapse className={'charts-properties'} bordered={false}>
                <Panel className={'charts-properties-title'} header="基础设置" key="1">
                    <ElemBaseSet {...this.props}/>
                </Panel>
                <Panel className={'charts-properties-title'} header="组件设置" key="2">
                    <ElemChartSet {...this.props}/>
                </Panel>
                <Panel className={'charts-properties-title'} header="数据源" key="5">
                    <ElemDataSet/>
                </Panel>
            </Collapse>
        );
    }
}
