import React, {Component} from 'react';
import {Liquid} from "@ant-design/charts";
import './style/AntdLiquid.less';
import EditTools from "../../edit-tool";

interface AntdLiquidProps {
    chartConfig?: any;
    elemId?: string;
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
                <EditTools {...this.props} elemId={elemId}/>
                <Liquid supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
