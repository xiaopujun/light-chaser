import React, {Component} from 'react';
import {Pie} from "@ant-design/charts";
import './index.less';
import EditTools from "../../../edit-tool";

/**
 * 基础柱状图
 */
export default class AntdPie extends Component<any, any> {

    render() {
        const {LCDesigner, elemId} = this.props;
        const {chartConfigMap} = LCDesigner;
        const config = chartConfigMap?.get(elemId);
        const {chartProperties, elemBaseProperties} = config;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...elemBaseProperties}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Pie className={'grid-chart-item'} {...chartProperties}/>
            </div>
        );
    }
}
