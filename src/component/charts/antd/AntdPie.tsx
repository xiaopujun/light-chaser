import React, {Component} from 'react';
import {Pie} from "@ant-design/charts";
import './style/AntdPie.less';
import EditTools from "../../edit-tool";

interface AntdPieProps {
    chartConfig?: any;
    elemId?: string;
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
                <EditTools {...this.props} elemId={elemId}/>
                <Pie supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
