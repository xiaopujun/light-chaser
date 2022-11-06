import React, {Component, Suspense} from 'react';
import {Collapse, Spin} from 'antd';
import './LcCompConfigContainer.less';
import LcCompBaseStyleSet from "./base/LcCompBaseStyleSet";
import {RollbackOutlined} from "@ant-design/icons";
import LcEmBaseInfo from "./info/LcEmBaseInfo";
import {LCDesignerProps} from "../../global/types";
import getChartsConfig from "./chart/antd/ComponentSetInit";
import Loading from "../loading/Loading";

const {Panel} = Collapse;

interface LcCompConfigContainerProps {
    LCDesignerStore?: LCDesignerProps;
    activeElem?: (data: any) => void;
    updateElemBaseSet?: (data: any) => void;
    activated?: any;
}

/**
 * 右滑框中的组件配置选项
 */
export default class LcCompConfigContainer extends Component<LcCompConfigContainerProps | any> {

    cancelActive = () => {
        const {activeElem} = this.props;
        activeElem && activeElem({elemId: -1, type: ''});
    }


    render() {
        const {activated: {id: activatedId, type}, LCDesignerStore: {chartConfigs}, updateElemBaseSet} = this.props;
        const {chartConfig: {baseInfo, chartProps, baseStyle}} = chartConfigs[activatedId];
        let ChartsConfig = getChartsConfig(type);
        return (
            <>
                <div className={'lc-component-config-title'}>
                    <RollbackOutlined onClick={this.cancelActive}/>&nbsp;组件配置()
                </div>
                <Collapse className={'lc-config-collapse lc-component-config'} bordered={false}>
                    <Panel className={'lc-config-collapse-title'} header="基础信息" key="0">
                        <LcEmBaseInfo baseInfo={baseInfo}/>
                    </Panel>
                    <Panel className={'lc-config-collapse-title'} header="基础样式" key="1">
                        <LcCompBaseStyleSet baseStyle={baseInfo} updateElemBaseSet={updateElemBaseSet}/>
                    </Panel>
                    <Panel className={'lc-config-collapse-title'} header="组件样式" key="2">
                        <Suspense fallback={<Loading width={'100%'} height={'100%'}/>}>
                            <ChartsConfig updateElemBaseSet={updateElemBaseSet} chartProps={chartProps}/>
                        </Suspense>
                    </Panel>
                    <Panel className={'lc-config-collapse-title'} header="数据源设置" key="5">
                        <p style={{color: 'white'}}>it's coding...</p>
                    </Panel>
                </Collapse>
            </>
        );
    }
}
