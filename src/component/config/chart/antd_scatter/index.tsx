import React, {Component} from 'react';
import {Collapse, Select, Slider} from "antd";
import './index.less';
import FillColor from "../../antd/atomic_components/fill_color";
import RightAngleCoordinates from "../../antd/atomic_components/right_angle_coordinates";

const {Option} = Select;

export default class AntdScatterSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            pointStyle: {
                fill: color,
            },
        });
    }

    shapeChanged = (shape: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            shape: shape
        });
    }

    pointSizeChanged = (size: number) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            size: size
        })
    }

    curveRendering = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            smooth: data
        })
    }

    render() {
        const {updateElemChartSet, dataXDesigner} = this.props;
        const {active, chartConfigMap} = dataXDesigner;
        let chartConfig = chartConfigMap.get(active?.id);
        return (
            <div className={'elem-chart-config'}>
                <Collapse className={'chart-config-collapse'} bordered={false}>
                    {/*图形填充色设置*/}
                    <FillColor onChange={this.fillColorChanged} paletteCount={1}/>
                    {/*点样式设置*/}
                    <div className={'config-group'}>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>点元素尺寸：</label>
                            <Slider defaultValue={5} max={20} min={0} style={{width: '60%'}}
                                    onChange={this.pointSizeChanged}
                                    className={'config-item-value'}/>
                        </div>
                        <div className={'config-item'}>
                            <label className={'config-item-label'}>点元素形状：</label>
                            <Select className={'config-item-value'} defaultValue={'circle'}
                                    onChange={this.shapeChanged}>
                                <Option value={'circle'}>circle</Option>
                                <Option value={'square'}>square</Option>
                                <Option value={'bowtie'}>bowtie</Option>
                                <Option value={'diamond'}>diamond</Option>
                                <Option value={'hexagon'}>hexagon</Option>
                                <Option value={'triangle'}>triangle</Option>
                                <Option value={'triangle-down'}>triangle-down</Option>
                            </Select>
                        </div>
                    </div>
                    {/*直角坐标系配置*/}
                    <RightAngleCoordinates chartConfig={chartConfig} updateElemChartSet={updateElemChartSet}/>
                </Collapse>
            </div>
        );
    }
}
