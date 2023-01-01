import React, {Component} from 'react';
import {HighlightFilled, LineOutlined} from "@ant-design/icons";
import './style/LcConfigContent.less';
import LcEmBaseInfo from "../config/info/LcEmBaseInfo";
import getChartsConfig from "../config/chart/ComponentSetInit";

class LcConfigContent extends Component<any> {
    render() {
        /* const {
             activated: {type},
             chartConfig: {baseInfo, chartProps, baseStyle},
             updateBaseStyle, updateChartProps, updateBaseInfo
         } = this.props;
         let ChartsConfig: any = getChartsConfig(type);*/
        return (
            <div className={'lc-config-panel'}>
                <div className={'lc-panel-top'}>
                    <div className={'panel-title'}><HighlightFilled/>&nbsp;<span>样式</span></div>
                    <div className={'panel-operate'}><LineOutlined/></div>
                </div>
                <div className={'lc-panel-content'}>
                </div>
            </div>
        );
    }
}

export default LcConfigContent;