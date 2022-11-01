import React, {Component} from 'react';
import {Gauge} from "@ant-design/charts";
import './style/AntdGauge.less';
import EditTools from "../../edit-tool";

/**
 * 基础柱状图
 */
export default class AntdGauge extends Component<any, any> {

    render() {
        const {LCDesignerStore, elemId} = this.props;
        const {chartConfigs} = LCDesignerStore;
        const config = chartConfigs[elemId + ''];
        const {chartProperties, elemBaseProperties} = config;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...elemBaseProperties}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Gauge supportCSSTransform={true} className={'grid-chart-item'} {...chartProperties}/>
            </div>
        );
    }
}
