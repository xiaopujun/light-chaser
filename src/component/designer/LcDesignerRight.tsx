import React, {Component} from 'react';
import LcCompConfigContainer from "../config/LcCompConfigContainer";
import './style/Right.less';
import {LCDesignerProps} from "../../types/LcDesignerType";
import LcGlobalSet from "../config/global/LcGlobalSet";

interface LcDesignerRightProps {
    LCDesignerStore?: LCDesignerProps;
    updateRightVisible?: (data?: any) => void;
    updateActive?: (data?: any) => void;
    updateBaseStyle?: (data?: any) => void;
    updateChartProps?: (data?: any) => void;
    updateBaseInfo?: (data?: any) => void;
    updateGlobalSet?: (data?: any) => void;
}

/**
 * 右滑框外壳组件
 * @description:用于展示右滑框，控制右滑框的显示与隐藏
 */
export default class LcDesignerRight extends Component<LcDesignerRightProps, any> {

    onClose = () => {
        const {updateRightVisible} = this.props;
        updateRightVisible && updateRightVisible();
    }

    render() {
        const {
            LCDesignerStore,
            updateActive,
            updateBaseStyle,
            updateChartProps,
            updateBaseInfo,
            updateGlobalSet
        } = this.props;
        const {activated, chartConfigs, globalSet} = LCDesignerStore!;
        const chartConfig = chartConfigs[activated.id];
        return (
            <div className={'lc-config-panel'} style={{height: window.innerHeight - 64}}>
                {activated.id >= 0 ?
                    <LcCompConfigContainer {...{
                        updateActive,
                        updateBaseStyle,
                        chartConfig,
                        activated,
                        updateChartProps,
                        updateBaseInfo
                    }} /> :
                    <LcGlobalSet updateGlobalSet={updateGlobalSet} globalSet={globalSet}/>
                }
            </div>
        );
    }
}