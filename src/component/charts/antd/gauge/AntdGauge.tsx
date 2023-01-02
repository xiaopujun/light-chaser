import React, {Component} from 'react';
import {Gauge} from "@ant-design/charts";

interface AntdGaugeProps {
    elemId?: string;
    chartConfig?: any;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
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
                
                <Gauge supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
