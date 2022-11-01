import React, {Component} from 'react';
import {Column} from "@ant-design/charts";
import './style/AntdColumn.less';
import EditTools from "../../edit-tool";

/**
 * 基础柱状图
 */
export default class AntdColumn extends Component<any, any> {

    render() {
        const {LCDesignerStore, elemId} = this.props;
        const {chartConfigs} = LCDesignerStore;
        const config = chartConfigs[elemId + ''];
        const {chartProperties, elemBaseProperties} = config;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...elemBaseProperties}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Column supportCSSTransform={true} className={'grid-chart-item'} {...chartProperties}/>
            </div>
        );
    }
}
