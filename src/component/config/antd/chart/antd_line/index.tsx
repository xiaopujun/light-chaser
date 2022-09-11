import React, {Component} from 'react';
import {Collapse} from "antd";
import FillColor from "../../atomic_components/fill_color";
import Legend from "../../atomic_components/legned";
import RightAngleCoordinates from "../../atomic_components/right_angle_coordinates";
import ColumnWidth from "../../atomic_components/column_width";

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
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor paletteCount={1} onChange={this.fillColorChanged}/>
                    {/*图例配置*/}
                    <Legend chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                    {/*条形图单条宽度配置*/}
                    <ColumnWidth updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}

export default AntdFoldLineSet;