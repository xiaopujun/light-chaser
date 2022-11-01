import React, {Component} from 'react';
import {Collapse} from 'antd';
import './LCComponentConfig.less';
import LCBaseConfig from "./base/LCBaseConfig";
import ElemChartSet from "./chart/antd";
import {RollbackOutlined} from "@ant-design/icons";

const {Panel} = Collapse;

/**
 * 右滑框中的组件配置选项
 */
export default class LCComponentConfig extends Component<any> {

    cancelActive = () => {
        const {activeElem} = this.props;
        activeElem && activeElem({elemId: -1, type: ''});
    }


    render() {
        const {active, layoutConfig} = this.props.LCDesignerStore;
        let layout: any = {};
        for (let i = 0; i < layoutConfig.length; i++) {
            if (layoutConfig[i].id === active.id) {
                layout = layoutConfig[i];
                break;
            }
        }
        return (
            <>
                <div className={'lc-component-config-title'}>
                    <RollbackOutlined onClick={this.cancelActive}/>&nbsp;组件配置({layout?.type})
                </div>
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
            </>
        );
    }
}
