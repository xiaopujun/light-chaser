import React, {Component} from 'react';
import {Collapse, Slider} from "antd";
import FillColor from "../../antd/atomic_components/fill_color";
import RightAngleCoordinates from "../../antd/atomic_components/right_angle_coordinates";
import {getAntdDataSortCount} from "../../../../utils/AntdBarUtil";

class AntdBubbleSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }


    render() {
        const {updateElemChartSet, LCDesigner} = this.props;
        const {active, chartConfigMap} = LCDesigner;
        let chartConfig = chartConfigMap.get(active?.id);
        let paletteCount = getAntdDataSortCount(chartConfig.chartProperties.data, 'continent');
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor paletteCount={paletteCount} onChange={this.fillColorChanged}/>
                    {/*点样式设置*/}
                    <div className={'config-group'}>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>点元素尺寸：</label>
                            <Slider defaultValue={5} max={20} min={0} style={{width: '60%'}}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>点元素形状：</label>

                        </div>
                    </div>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}

export default AntdBubbleSet;