import React, {Component} from 'react';
import {Gauge} from "@ant-design/charts";
import './style/AntdGauge.less';
import EditTools from "../../edit-tool";

interface AntdGaugeProps {
    elemId?: string;
    chartConfig?: any;
}

/**
 * 基础柱状图
 */
export default class AntdGauge extends Component<AntdGaugeProps> {

    render() {
        const {chartConfig, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Gauge supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
