import React, {Component} from 'react';
import {Select, Slider} from "antd";
import ColorPicker from "../../color_picker/BaseColorPicker";
import LCNumberInput from "../../base/LCNumberInput";

const {Option} = Select;
export default class LCBaseBorderSet extends Component<any> {
    borderStyleChanged = (style: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({borderStyle: style});
    }
    borderWidthChanged = (width: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({borderWidth: `${width}px`});
    }
    borderColorChanged = (color: any) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({borderColor: color});
    }
    borderRadiusChanged = (radius: number) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet({borderRadius: `${radius}px`});
    }

    render() {
        return (
            <>

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