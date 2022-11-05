import React, {Component, Suspense} from 'react';
import getChartsConfig from "./ComponentSetInit";
import {Spin} from "antd";


interface ElemChartSetProps {
    updateElemChartSet?: (data: any) => void;
    chartProps?: any;
    active?: any;
}

/**
 * 图表配置组件，该组件需要根据不同的组件类型、子类型，渲染不同的组件配置页面
 * 是所有组件属性配置页面的总分发控制枢纽
 */
class ElemChartSet extends Component<ElemChartSetProps> {

    render() {
        const {active} = this.props;
        const {type} = active;
        let ChartsConfig = getChartsConfig(type);
        return (
            <Suspense fallback={<Spin tip={'loading'}/>}>
                <div>
                    <ChartsConfig {...this.props}/>
                </div>
            </Suspense>

        );
    }
}

export default ElemChartSet;