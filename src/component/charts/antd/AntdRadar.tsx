import React, {Component} from 'react';
import {Radar} from "@ant-design/charts";
import './style/AntdRadar.less';
import EditTools from "../../edit-tool";

interface AntdRadarProps {
    chartConfig?: any;
    elemId?: string;
}

/**
 * 基础柱状图
 */
export default class AntdRadar extends Component<AntdRadarProps> {

    state = {
        data: []
    }

    render() {
        const {chartConfig, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Radar supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
