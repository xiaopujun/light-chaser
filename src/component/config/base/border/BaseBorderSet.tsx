import React, {Component} from 'react';
import {Select} from "antd";
import ColorPicker from "../../../color_picker/BaseColorPicker";
import LCNumberInput from "../../../base/LCNumberInput";
import './style/BaseBorderSet.less';

const {Option} = Select;

export default class BaseBorderSet extends Component<any> {

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
            <div className={'lc-base-border-set'}>
                <div className={'config-item'}>
                    <label className={'config-item-label'}>样式：</label>
                    <Select defaultValue={'solid'} className={'lc-select'} onChange={this.borderStyleChanged}>
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
                s
            </div>
        );
    }
}