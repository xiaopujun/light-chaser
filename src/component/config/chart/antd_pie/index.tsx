import React, {Component} from 'react';
import {Collapse, Select, Slider} from "antd";
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";
import Legend from "../../antd/atomic_components/legned";
import RightAngleCoordinates from "../../antd/atomic_components/right_angle_coordinates";

class AntdPieSet extends Component<any> {

    outRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            radius: radius
        })
    }
    innerRadiusChanged = (radius: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            innerRadius: radius
        })
    }
    startAngleChanged = (angle: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            startAngle: Math.PI * angle
        })
    }
    endAngleChanged = (angle: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            endAngle: Math.PI * angle
        })
    }

    render() {
        const {updateElemChartSet, dataXDesigner} = this.props;
        const {active} = dataXDesigner;
        const {chartConfigMap} = dataXDesigner;
        let chartConfig = chartConfigMap.get(active?.id);
        let colorPickerNumber = chartConfig.chartProperties.data.length;
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor updateElemChartSet={updateElemChartSet} groupNumber={colorPickerNumber}/>
                    {/*图例配置*/}
                    <Legend updateElemChartSet={updateElemChartSet}/>


                    <div className={'config-group chart-fill-color'}>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>外半径：</label>
                            <Slider defaultValue={0.75} max={1} min={0.01} step={0.01} style={{width: '60%'}}
                                    onChange={this.outRadiusChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>内半径：</label>
                            <Slider defaultValue={0.75} max={1} min={0} step={0.01} style={{width: '60%'}}
                                    onChange={this.innerRadiusChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>起始角度：</label>
                            <Slider defaultValue={0} max={2} min={0} step={0.1} style={{width: '60%'}}
                                    onChange={this.startAngleChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>结束角度：</label>
                            <Slider defaultValue={0} max={2} min={0} step={0.1} style={{width: '60%'}}
                                    onChange={this.endAngleChanged}
                                    className={'config-item-value'}/>
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default AntdPieSet;