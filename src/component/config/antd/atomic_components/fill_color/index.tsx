import React, {Component} from 'react';
import {Select} from "antd";
import '../index.less';
import ColorPicker from "../../../../color_picker/base";
import GroupColorPicker from "../../../../color_picker/group";

const {Option} = Select;

interface FillColorProp {
    fillMode?: string; //0:单色、1：多色、
    groupNumber: number; //分组选择器个数
    updateElemChartSet: (data: any) => void; //更新填充色配置回调
}

/**
 * 图表填充色设置原子组件
 */
class FillColor extends Component<FillColorProp> {

    state = {
        fillMode: '0',
        targetValue: '',
        otherValue: 'rgb(0,255,234)'
    }

    constructor(props: FillColorProp) {
        super(props);
        const {fillMode = '0'} = this.props;
        this.state = {fillMode, targetValue: '', otherValue: 'rgb(0,255,234)'}
    }

    colorChanged = (data: string | string[]) => {
        const {updateElemChartSet} = this.props;
        updateElemChartSet({color: data});
    }

    generateFillColorComp = () => {
        const {fillMode} = this.state;
        const {groupNumber} = this.props;
        if (fillMode === '1') {
            return <GroupColorPicker groupNumber={groupNumber} onChange={this.colorChanged}/>;
        } else {
            return <ColorPicker name={'mainTitleColor'}
                                onChange={this.colorChanged}
                                className={'config-item-value'}/>;
        }
    }

    modeChanged = (value: string) => {
        this.setState({fillMode: value})
    }

    targetValueChanged = (event: any) => {
        this.setState({targetValue: event.target.value})
    }

    render() {
        const {fillMode = "0"} = this.state;
        return (
            <div className={'config-group chart-fill-color'}>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>填充模式：</label>
                    <Select className={'config-item-value'} defaultValue={fillMode} onChange={this.modeChanged}>
                        <Option value={'0'}>单色模式</Option>
                        <Option value={'1'}>多色模式</Option>
                    </Select>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>填充色：</label>
                    {this.generateFillColorComp()}
                </div>
            </div>
        );
    }
}

export default FillColor;