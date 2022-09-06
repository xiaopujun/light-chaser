import React, {Component} from 'react';
import {Collapse, Select, Slider} from "antd";
import FillColor from "../../atomic_components/fill_color";
import RightAngleCoordinates from "../../atomic_components/right_angle_coordinates";
import {getAntdDataSortCount} from "../../../../../utils/AntdBarUtil";

const {Option} = Select;

class AntdBubbleSet extends Component<any> {

    fillColorChanged = (color: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: color});
    }

    pointSizeChanged = (range: [number, number]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            size: range
        })
    }

    shapeChanged = (shape: string) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            shape: shape
        });
    }


    render() {
        const {updateElemChartSet, LCDesignerStore} = this.props;
        const {active, chartConfigMap} = LCDesignerStore;
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
                            <Slider defaultValue={[1, 20]} max={20} min={0} style={{width: '60%'}}
                                    range={true}
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

export default AntdBubbleSet;