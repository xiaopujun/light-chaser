import React, {Component} from 'react';
import {Area} from "@ant-design/charts";

interface AntdAreaProps {
    elemId?: string;
    chartConfig?: any;
    chartName?: string;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
}


/**
 * 基础柱状图
 */
export default class AntdBaseArea extends Component<AntdAreaProps> {

    state: any = {
        data: []
    }

    render() {
        const {chartConfig} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <Area supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
