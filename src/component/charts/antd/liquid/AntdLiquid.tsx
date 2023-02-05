import React, {Component} from 'react';
import {Liquid} from "@ant-design/charts";
import LcCompBg from "../../LcCompBg";

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
        const {chartConfig} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <LcCompBg style={baseStyle}>
                <Liquid supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </LcCompBg>
        );
    }
}
