import React, {Component} from 'react';
import {Collapse} from 'antd';
import './LcCompConfigContainer.less';
import LcCompBaseStyleSet from "./base/LcCompBaseStyleSet";
import ElemChartSet from "./chart/antd";
import {RollbackOutlined} from "@ant-design/icons";
import LcEmBaseInfo from "./info/LcEmBaseInfo";
import {LCDesignerProps} from "../../global/types";

const {Panel} = Collapse;

interface LcCompConfigContainerProps {
    LCDesignerStore?: LCDesignerProps;
    activeElem?: (data: any) => void;
}

/**
 * 右滑框中的组件配置选项
 */
export default class LcCompConfigContainer extends Component<LcCompConfigContainerProps> {

    cancelActive = () => {
        const {activeElem} = this.props;
        activeElem && activeElem({elemId: -1, type: ''});
    }


    render() {
        const {active, layoutConfigs} = this.props.LCDesignerStore!;
        let layout: any = {};
        for (let i = 0; i < layoutConfigs.length; i++) {
            if (layoutConfigs[i].id === active.id) {
                layout = layoutConfigs[i];
                break;
            }
        }
        return (
            <>
                <div className={'lc-component-config-title'}>
                    <RollbackOutlined onClick={this.cancelActive}/>&nbsp;组件配置({layout?.type})
                </div>
                <Collapse className={'lc-config-collapse lc-component-config'} bordered={false}>
                    <Panel className={'lc-config-collapse-title'} header="基础信息" key="0">
                        <LcEmBaseInfo {...this.props}/>
                    </Panel>
                    <Panel className={'lc-config-collapse-title'} header="基础样式" key="1">
                        <LcCompBaseStyleSet {...this.props}/>
                    </Panel>
                    <Panel className={'lc-config-collapse-title'} header="组件样式" key="2">
                        <ElemChartSet {...this.props}/>
                    </Panel>
                    <Panel className={'lc-config-collapse-title'} header="数据源设置" key="5">
                        <p style={{color: 'white'}}>it's coding...</p>
                    </Panel>
                </Collapse>
            </>
        );
    }
}
