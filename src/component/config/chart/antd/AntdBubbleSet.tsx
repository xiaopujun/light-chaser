import React, {Component} from 'react';
import {Select, Slider} from "antd";
import FillColor from "./atomic_components/FillColor";
import RightAngleCoordinates from "./atomic_components/RightAngleCoordinates";
import {getAntdDataSortCount} from "../../../../utils/AntdBarUtil";

const {Option} = Select;

interface AntdBubbleSetProps {
    updateChartProps?: (data: any) => void;
    activated?: any;
    chartProps?: any;
}


class AntdBubbleSet extends Component<AntdBubbleSetProps> {

    fillColorChanged = (color: string | string[]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({color: color});
    }

    pointSizeChanged = (range: [number, number]) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            size: range
        })
    }

    shapeChanged = (shape: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            shape: shape
        });
    }


    render() {
        const {updateChartProps, activated, chartProps} = this.props;
        let paletteCount = getAntdDataSortCount(chartProps.data, 'continent');
        return (
            <div className={'elem-chart-config'}>

                {/*图形填充色设置*/}
                <FillColor paletteCount={paletteCount} onChange={this.fillColorChanged}/>
                {/*点样式设置*/}
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>点元素尺寸：</label>
                        <Slider defaultValue={[1, 20]} max={20} min={0}
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

export default AntdBubbleSet;