import React, {Component} from 'react';
import getChartsConfig from "../../../init/ComponentSetInit";

/**
 * 图表配置组件，该组件需要根据不同的组件类型、子类型，渲染不同的组件配置页面
 * 是所有组件属性配置页面的总分发控制枢纽
 */
class ElemChartSet extends Component<any> {
    generateConfig = () => {
        const {dataXDesigner} = this.props;
        const {subType} = dataXDesigner?.active;
        let ChartsConfig = getChartsConfig(subType);
        return <ChartsConfig {...this.props}/>
    }

    render() {
        return (
            <div>
                {this.generateConfig()}
            </div>
        );
    }
}

export default ElemChartSet;