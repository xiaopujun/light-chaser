import React, {Component} from 'react';
import {Column} from "@ant-design/charts";
import './index.less';
import EditTools from "../../../edit-tool";

/**
 * 基础柱状图
 */
export default class AntdColumn extends Component<any, any> {

    render() {
        const {dataXDesigner, elemId} = this.props;
        const {chartConfigMap} = dataXDesigner;
        const config = chartConfigMap?.get(elemId);
        const {chartProperties, elemBasePeoperties} = config;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...elemBasePeoperties}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Column className={'grid-chart-item'} {...chartProperties}/>
            </div>
        );
    }
}
