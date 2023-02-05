import React, {Component} from 'react';
import {Pie} from "@ant-design/charts";
import LcCompBg from "../../LcCompBg";

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
        const {chartConfig} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <LcCompBg style={baseStyle}>
                <Pie supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </LcCompBg>
        );
    }
}
