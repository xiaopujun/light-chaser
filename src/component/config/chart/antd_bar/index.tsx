import React, {Component} from 'react';
import {Collapse} from "antd";
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";
import Legend from "../../antd/atomic_components/legned";
import RightAngleCoordinates from "../../antd/atomic_components/right_angle_coordinates";
import BarWidth from "../../antd/atomic_components/bar_width";
import {getAntdDataSortCount} from "../../../../utils/AntdBarUtil";


class AntdBarSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }

    groupColorChanged = (value: any) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            color: value
        })
    }


    render() {
        const {updateElemChartSet, LCDesigner} = this.props;
        const {active} = LCDesigner;
        const {chartConfigMap} = LCDesigner;
        let chartConfig = chartConfigMap.get(active?.id);
        let paletteCount = 1;
        switch (active?.subType) {
            case 'AntdBaseBar':
            case 'AntdZoneBar':
                //单条的计算条数个数
                paletteCount = chartConfig.chartProperties.data.length;
                break;
            case 'AntdGroupBar':
            case 'AntdPercentBar':
            case 'AntdStackBar':
                //分组的计算分组个数
                paletteCount = getAntdDataSortCount(chartConfig.chartProperties.data, 'type');
                break;
        }
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor onChange={this.fillColorChanged} paletteCount={paletteCount}/>
                    {/*图例配置*/}
                    <Legend chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                    {/*条形图单条宽度配置*/}
                    <BarWidth updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}

export default AntdBarSet;