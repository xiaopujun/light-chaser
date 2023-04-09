import React from 'react';
import {Bar} from "@ant-design/charts";
import LcCompBg from "../../LcCompBg";
import {AbstractChart} from "../../interface/AbstractChart";

interface AntdBarProps {
    elemId?: string;
    chartConfig?: any;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
}

/**
 * 基础条形图
 */
export default class AntdBaseBar extends AbstractChart<AntdBarProps> {

    render() {
        const {chartConfig} = this.props;
        if (!chartConfig)
            return null;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <LcCompBg style={baseStyle}>
                <Bar supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </LcCompBg>
        );
    }
}
