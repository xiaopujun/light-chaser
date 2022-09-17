import React, {Component} from 'react';
import {Select} from "antd";
import ColorPicker from "../../color_picker/BaseColorPicker";
import LCNumberInput from "../../base/LCNumberInput";

const {Option} = Select;

interface BorderSetProps {
    onChange?: () => void;
    updateElemBaseSet?: (data: any) => void;
}

export default class BorderSet extends Component<BorderSetProps> {

    borderTypeChanged = () => {

    }

    borderStyleChanged = (style: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderStyle: style});
    }
    borderWidthChanged = (width: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderWidth: `${width}px`});
    }
    borderColorChanged = (color: any) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderColor: color});
    }
    borderRadiusChanged = (radius: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderRadius: `${radius}px`});
    }

    render() {
        return (
            <>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>边框类型：</label>
                    <Select defaultValue={'BaseBorder'} style={{width: '60%'}}
                            onChange={this.borderTypeChanged}>
                        <Option value="BaseBorder">基础边框</Option>
                        <Option value="FourAngleGlow">四角辉光</Option>
                    </Select>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>样式：</label>
                    <Select defaultValue={'solid'} style={{width: '60%'}} onChange={this.borderStyleChanged}>
                        <Option value="dotted">点</Option>
                        <Option value="dashed">虚线</Option>
                        <Option value="solid">实线</Option>
                    </Select>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>颜色：</label>
                    <ColorPicker
                        onChange={this.borderColorChanged}
                        className={'config-item-value'}/>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>宽度：</label>
                    <div style={{width: '60%'}} className={'config-item-value'}>
                        <LCNumberInput id={'baseBorderWidth'} onChange={this.borderWidthChanged}/> px
                    </div>
                </div>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>圆角：</label>
                    <div style={{width: '60%'}} className={'config-item-value'}>
                        <LCNumberInput id={'baseBorderRadius'} onChange={this.borderRadiusChanged}/> px
                    </div>
                </div>
            </>
        );
    }
}
