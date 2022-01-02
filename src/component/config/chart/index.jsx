import React, {Component} from 'react';
import AntdBarConfig from './antd-bar';

/**
 * 图表配置组件，该组件需要根据不同的组件类型、子类型，渲染不同的组件配置页面
 * 是所有组件属性配置页面的总分发控制枢纽
 */
class ChartConfig extends Component {
    render() {
        const {currentActive} = this.props?.layoutDesigner;
        const {activeId, activeType, activeSubType} = currentActive;
        return (
            <AntdBarConfig {...this.props}/>
        );
    }
}

export default ChartConfig;