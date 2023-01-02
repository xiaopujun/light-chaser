import React, {Component} from 'react';
import {Pie} from "@ant-design/charts";

interface AntdPieProps {
    chartConfig?: any;
    elemId?: string;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
}

/**
 * 基础柱状图
 */
export default class AntdPie extends Component<AntdPieProps> {

    render() {
        const {chartConfig, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                
                <Pie supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
