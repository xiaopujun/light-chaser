import React, {Component, Suspense} from 'react';
import {Collapse} from 'antd';
import './LcCompConfigContainer.less';
import {RollbackOutlined} from "@ant-design/icons";
import LcEmBaseInfo from "./info/LcEmBaseInfo";
import getChartsConfig from "./chart/antd/ComponentSetInit";
import LcCompBaseStyleSet from "./base/LcCompBaseStyleSet";
import Loading from "../loading/Loading";

const {Panel} = Collapse;

interface LcCompConfigContainerProps {
    chartConfig?: any;
    updateActive?: (data: any) => void;
    updateBaseStyle?: (data: any) => void;
    updateChartProps?: (data?: any) => void;
    updateBaseInfo?: (data?: any) => void;
    activated?: any;
}

/**
 * 右滑框中的组件配置选项
 */
export default class LcCompConfigContainer extends Component<LcCompConfigContainerProps | any> {

    cancelActive = () => {
        const {updateActive} = this.props;
        updateActive && updateActive({elemId: -1, type: ''});
    }


    render() {
        const {
            activated: {type},
            chartConfig: {baseInfo, chartProps, baseStyle},
            updateBaseStyle, updateChartProps, updateBaseInfo
        } = this.props;
        let ChartsConfig = getChartsConfig(type);
        return (
            <>
                <div className={'lc-component-config-title'}>
                    <RollbackOutlined onClick={this.cancelActive}/>&nbsp;组件配置
                </div>
                <Collapse className={'lc-config-collapse lc-component-config'} bordered={false}>
                    <Panel className={'lc-config-collapse-title'} header="基础信息" key="0">
                        <LcEmBaseInfo updateBaseInfo={updateBaseInfo} baseInfo={baseInfo}/>
                    </Panel>
                    <Panel className={'lc-config-collapse-title'} header="基础样式" key="1">
                        <LcCompBaseStyleSet baseStyle={baseStyle} updateBaseStyle={updateBaseStyle}/>
                    </Panel>
                    <Panel className={'lc-config-collapse-title'} header="组件样式" key="2">
                        <Suspense fallback={<Loading width={'100%'} height={'100%'}/>}>
                            <ChartsConfig updateChartProps={updateChartProps} chartProps={chartProps}/>
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
