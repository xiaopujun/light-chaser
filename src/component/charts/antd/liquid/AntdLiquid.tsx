import React, {Component} from 'react';
import {Liquid} from "@ant-design/charts";

interface AntdLiquidProps {
    chartConfig?: any;
    elemId?: string;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
}

/**
 * 基础柱状图
 */
export default class AntdLiquid extends Component<AntdLiquidProps> {

    render() {
        const {chartConfig, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                
                <Liquid supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
