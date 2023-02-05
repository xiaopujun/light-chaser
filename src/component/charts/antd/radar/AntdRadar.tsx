import React, {Component} from 'react';
import {Radar} from "@ant-design/charts";
import LcCompBg from "../../LcCompBg";

interface AntdRadarProps {
    chartConfig?: any;
    elemId?: string;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
}

/**
 * 基础柱状图
 */
export default class AntdRadar extends Component<AntdRadarProps> {

    state = {
        data: []
    }

    render() {
        const {chartConfig} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <LcCompBg style={baseStyle}>
                <Radar supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </LcCompBg>
        );
    }
}
