import React, {Component} from 'react';
import {Select} from "antd";
import './style/index.less';
import ColorPicker from "../../../../color_picker/BaseColorPicker";
import GroupColorPicker from "../../../../color_picker/GroupColorPicker";

const {Option} = Select;

interface FillColorProp {
    fillMode?: string; //0:单色、1：多色、
    colorCount?: number;
    colors?: string[];
    onChange?: (data: string | string[]) => void;//回调函数
}

/**
 * 配置项原子组件 - 图表填充色设置
 */
class FillColor extends Component<FillColorProp> {

    state: any = {
        fillMode: '0',
        colors: [],
    }

    constructor(props: FillColorProp) {
        super(props);
        const {fillMode = '0', colors} = this.props;
        this.state = {fillMode, colors: colors || ['rgb(0,255,234)']};
    }


    colorChanged = (data: string | string[]) => {
        const {onChange} = this.props;
        onChange && onChange(data);
    }

    generateFillColorComp = () => {
        const {fillMode, colors = ['rgb(0,255,234)']} = this.state;
        if (fillMode === '1') {
            return <GroupColorPicker value={colors} onChange={this.colorChanged}/>;
        } else {
            return <ColorPicker name={'mainTitleColor'}
                                color={colors[0]}
                                onChange={this.colorChanged}
                                className={'lc-config-item-value'}/>;
        }
    }

    modeChanged = (value: string) => {
        if (value === '1') {
            //多色模式
            const {colorCount = 1} = this.props;
            let colorArr = [];
            for (let i = 0; i < colorCount; i++)
                colorArr.push('#00d8f9')
            this.setState({fillMode: value, colors: colorArr})
        } else {
            //单色模式
            this.setState({fillMode: value, colors: ['#00d8f9']})
        }
    }


    render() {
        const {fillMode = "0"} = this.state;
        return (
            <div className={'config-group chart-fill-color'}>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>填充模式：</label>
                    <Select className={'lc-config-item-value lc-select'} value={fillMode}
                            onChange={this.modeChanged}>
                        <Option value={'0'}>单色模式</Option>
                        <Option value={'1'}>多色模式</Option>
                    </Select>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>填充色：</label>
                    {this.generateFillColorComp()}
                </div>
            </div>
        );
    }
}

export default FillColor;