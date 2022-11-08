import React, {Component} from 'react';
import {Select, Slider} from "antd";
import './style/AntdScatterSet.less';
import FillColor from "./atomic_components/FillColor";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";

const {Option} = Select;


interface AntdScatterSetProps {
    updateChartProps?: (data: any) => void;
    chartProps?: any;
    activated?: any;
}

export default class AntdScatterSet extends Component<AntdScatterSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            pointStyle: {
                fill: color,
            },
        });
    }

    shapeChanged = (shape: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            shape: shape
        });
    }

    pointSizeChanged = (range: [number, number]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            size: range
        })
    }

    curveRendering = (data: boolean) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            smooth: data
        })
    }

    render() {
        const {updateChartProps, activated, chartProps} = this.props;
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
                <RightAngleCoordinates chartProps={chartProps} updateChartProps={updateChartProps}/>

            </div>
        );
    }
}
