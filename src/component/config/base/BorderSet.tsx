import React, {Component} from 'react';
import './style/BorderSet.less';
import {Select} from "antd";
import ColorPicker from "../../color_picker/BaseColorPicker";
import LCNumberInput from "../../base/LCNumberInput";

const {Option} = Select;

export default class BorderSet extends Component<any> {

    borderTypeChanged = (data: string) => {
        const {updateElemBaseSet} = this.props;
        updateElemBaseSet && updateElemBaseSet({borderType: data});
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
        const {LCDesignerStore} = this.props;
        const {chartConfigs, active} = LCDesignerStore;
        return (
            <>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>边框线条：</label>
                    <Select defaultValue={'solid'} className={'lc-config-item-value lc-select'}
                            onChange={this.borderStyleChanged}>
                        <Option value="dotted">点</Option>
                        <Option value="dashed">虚线</Option>
                        <Option value="solid">实线</Option>
                    </Select>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>边框颜色：</label>
                    <ColorPicker
                        onChange={this.borderColorChanged}
                        className={'lc-config-item-value'}/>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>边框宽度：</label>
                    <div className={'lc-config-item-value'}>
                        <div className={'lc-input-container'}>
                            <LCNumberInput id={'baseBorderWidth'} onChange={this.borderWidthChanged}/>
                            <span>&nbsp;px</span>
                        </div>
                    </div>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>边框圆角：</label>
                    <div className={'lc-config-item-value lc-input-container'}>
                        <div className={'lc-input-container'}>
                            <LCNumberInput id={'baseBorderRadius'} onChange={this.borderRadiusChanged}/>
                            <span>&nbsp;px</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
