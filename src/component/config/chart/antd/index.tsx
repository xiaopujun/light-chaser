import React, {Component, Suspense} from 'react';
import getChartsConfig from "./ComponentSetInit";
import Loading from "../../../loading/Loading";
import {Spin} from "antd";

/**
 * 图表配置组件，该组件需要根据不同的组件类型、子类型，渲染不同的组件配置页面
 * 是所有组件属性配置页面的总分发控制枢纽
 */
class ElemChartSet extends Component<any> {

    render() {
        const {LCDesignerStore} = this.props;
        const {type} = LCDesignerStore?.active;
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