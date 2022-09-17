import React, {Component} from 'react';
import {Collapse, Select, Slider} from "antd";
import './style/AntdScatterSet.less';
import FillColor from "./atomic_components/FillColor";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";

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

    pointSizeChanged = (range: [number, number]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            size: range
        })
    }

    curveRendering = (data: boolean) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({
            smooth: data
        })
    }

    render() {
        const {updateElemChartSet, LCDesignerStore} = this.props;
        const {active, chartConfigMap} = LCDesignerStore;
        let chartConfig = chartConfigMap.get(active?.id);
        return (
            <div className={'elem-chart-config'}>

                {/*图形填充色设置*/}
                <FillColor onChange={this.fillColorChanged} paletteCount={1}/>
                {/*点样式设置*/}
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>点元素尺寸：</label>
                        <Slider defaultValue={[1, 10]} max={20} min={0}
                                range={true}
                                onChange={this.pointSizeChanged}
                                className={'lc-config-item-value'}/>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>点元素形状：</label>
                        <Select className={'lc-config-item-value'} defaultValue={'circle'}
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

            </div>
        );
    }
}
