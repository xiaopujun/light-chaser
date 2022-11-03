import React, {Component} from 'react';
import {Radar} from "@ant-design/charts";
import './style/AntdRadar.less';
import EditTools from "../../edit-tool";

/**
 * 基础柱状图
 */
export default class AntdRadar extends Component<any, any> {

    state = {
        data: []
    }

    render() {
        const {LCDesignerStore, elemId} = this.props;
        const {chartConfigs} = LCDesignerStore;
        const config = chartConfigs[elemId + ''];
        const {chartProps, baseStyle} = config;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Radar supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
