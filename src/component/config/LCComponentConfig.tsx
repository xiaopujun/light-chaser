import React, {Component} from 'react';
import {Collapse} from 'antd';
import './LCComponentConfig.less';
import LCBaseConfig from "./base/LCBaseConfig";
import ElemChartSet from "./chart/antd";

const {Panel} = Collapse;

/**
 * 右滑框中的组件配置选项
 */
export default class LCComponentConfig extends Component<any> {


    render() {
        return (
            <Collapse className={'lc-config-collapse lc-component-config'} bordered={false}>
                <Panel className={'lc-config-collapse-title'} header="基础设置" key="1">
                    <LCBaseConfig {...this.props}/>
                </Panel>
                <Panel className={'lc-config-collapse-title'} header="组件设置" key="2">
                    <ElemChartSet {...this.props}/>
                </Panel>
                <Panel className={'lc-config-collapse-title'} header="数据源" key="5">
                    {/*<ElemDataSet {...this.props}/>*/}
                    <p style={{color: 'white'}}>未开发...</p>
                </Panel>
            </Collapse>
        );
    }
}
