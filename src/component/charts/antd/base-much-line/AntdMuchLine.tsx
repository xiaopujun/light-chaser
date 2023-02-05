import React, {Component} from 'react';
import {Line} from "@ant-design/charts";
import LcCompBg from "../../LcCompBg";

interface AntdLineProps {
    chartConfig?: any;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
    elemId?: string;
}

/**
 * 基础柱状图
 */
export default class AntdMuchLine extends Component<AntdLineProps> {

    render() {
        const {chartConfig} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <LcCompBg style={baseStyle}>
                <Line supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </LcCompBg>
        );
    }
}
