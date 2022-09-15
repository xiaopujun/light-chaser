import React, {Component} from 'react';
import {Collapse} from "antd";
import './style/AntdAreaSet.less';
import FillColor from "../atomic_components/fill_color";
import RightAngleCoordinates from "../atomic_components/right_angle_coordinates";

class AntdAreaSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }

    render() {
        const {updateElemChartSet, LCDesignerStore} = this.props;
        const {active} = LCDesignerStore;
        const {chartConfigMap} = LCDesignerStore;
        let chartConfig = chartConfigMap.get(active?.id);
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor onChange={this.fillColorChanged} paletteCount={1}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}

export default AntdAreaSet;