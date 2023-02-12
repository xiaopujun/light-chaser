import React, {Component} from 'react';
import {Bar} from "@ant-design/charts";
import LcCompBg from "../../LcCompBg";

interface AntdBarProps {
    elemId?: string;
    chartConfig?: any;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
}

/**
 * 基础条形图
 */
export default class AntdGroupBar extends Component<AntdBarProps> {

    render() {
        const {chartConfig} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <LcCompBg style={baseStyle}>
                <Bar supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </LcCompBg>
        );
    }
}
