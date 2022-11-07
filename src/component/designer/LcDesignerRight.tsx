import React, {Component} from 'react';
import LcCompConfigContainer from "../config/LcCompConfigContainer";
import './style/Right.less';
import {LCDesignerProps} from "../../types/LcDesignerType";
import LcGlobalSet from "../config/global/LcGlobalSet";

interface LcDesignerRightProps {
    LCDesignerStore?: LCDesignerProps;
    updateDrawerVisible?: (data?: any) => void;
    activeElem?: (data?: any) => void;
    updateElemBaseSet?: (data?: any) => void;
}

/**
 * 右滑框外壳组件
 * @description:用于展示右滑框，控制右滑框的显示与隐藏
 */
export default class LcDesignerRight extends Component<LcDesignerRightProps, any> {

    onClose = () => {
        const {updateDrawerVisible} = this.props;
        updateDrawerVisible && updateDrawerVisible();
    }

    render() {
        const {LCDesignerStore, activeElem, updateElemBaseSet} = this.props;
        const {activated, chartConfigs, globalSet} = LCDesignerStore!;
        const chartConfig = chartConfigs[activated.id];
        return (
            <div className={'lc-config-panel'} style={{height: window.innerHeight - 64}}>
                {activated.id >= 0 ?
                    <LcCompConfigContainer {...{activeElem, updateElemBaseSet, chartConfig, activated}} /> :
                    <LcGlobalSet globalSet={globalSet}/>
                }
            </div>
        );
    }
}