import React, {Component} from 'react';
import {Collapse} from "antd";
import FillColor from "./atomic_components/FillColor";
import Legend from "./atomic_components/Legned";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import ColumnWidth from "./atomic_components/ColumnWidth";

class AntdFoldLineSet extends Component<any> {

    state: any = {
        data: []
    }

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color})
    }

    render() {
        const {updateElemChartSet, LCDesignerStore} = this.props;
        const {active, chartConfigMap} = LCDesignerStore;
        let chartConfig = chartConfigMap.get(active?.id);
        return (
            <div className={'elem-chart-config'}>

                    {/*图形填充色设置*/}
                    <FillColor paletteCount={1} onChange={this.fillColorChanged}/>
                    {/*图例配置*/}
                    <Legend chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                    {/*条形图单条宽度配置*/}
                    <ColumnWidth updateElemChartSet={updateElemChartSet}/>

            </div>
        );
    }
}

export default AntdFoldLineSet;