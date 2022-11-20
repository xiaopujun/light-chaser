import React, {Component} from 'react';
import {Select, Slider} from "antd";
import LCNumberInput from "../../../../base/LCNumberInput";

const {Option} = Select;

interface PointSetProps {
    updateChartProps?: (data: any) => void;
    pointSize?: [number];
    pointShape?: string;
}

/**
 * 点系统设置
 */
class PointSet extends Component<PointSetProps> {

    shapeChanged = (shape: string) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({
            shape: shape
        });
    }

    pointSizeChanged = (size: number) => {
        const {updateChartProps} = this.props;
        updateChartProps && updateChartProps({size: [1, size]})
    }

    render() {
        const {pointSize = [1, 1], pointShape} = this.props;
        return (
            <>
                <div className={'config-group'}>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>点元素尺寸：</label>
                        <span className={'lc-input-container'}>
                            <LCNumberInput value={pointSize[1]} onChange={this.pointSizeChanged} min={0} step={1}/>
                        </span>
                    </div>
                    <div className={'lc-config-item'}>
                        <label className={'lc-config-item-label'}>点元素形状：</label>
                        <Select className={'lc-config-item-value lc-select'} value={pointShape}
                                onChange={this.shapeChanged}>
                            <Option value={''}>请选择</Option>
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
            </>
        );
    }
}

export default PointSet;