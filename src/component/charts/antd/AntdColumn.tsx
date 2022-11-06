import React, {Component} from 'react';
import {Column} from "@ant-design/charts";
import './style/AntdColumn.less';
import EditTools from "../../edit-tool";

interface AntdColumnProps {
    chartConfig?: any;
    elemId?: string;
}

/**
 * 基础柱状图
 */
export default class AntdColumn extends Component<AntdColumnProps> {

    render() {
        const {chartConfig, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Column supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
