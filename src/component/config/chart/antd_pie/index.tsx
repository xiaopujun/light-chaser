import React, {Component} from 'react';
import {Collapse} from "antd";
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";
import Legend from "../../antd/atomic_components/legned";
import PolarCoordinateSystem from "../../antd/atomic_components/polar_coordinate";

class AntdPieSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }


    render() {
        const {updateElemChartSet, LCDesigner} = this.props;
        const {active} = LCDesigner;
        const {chartConfigMap} = LCDesigner;
        let chartConfig = chartConfigMap.get(active?.id);
        let colorPickerNumber = chartConfig.chartProperties.data.length;
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor onChange={this.fillColorChanged} paletteCount={colorPickerNumber}/>
                    {/*图例配置*/}
                    <Legend chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                    {/*极坐标系*/}
                    <PolarCoordinateSystem updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}

export default AntdPieSet;