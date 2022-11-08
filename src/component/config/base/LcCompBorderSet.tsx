import React, {Component} from 'react';
import './style/BorderSet.less';
import {Select} from "antd";
import ColorPicker from "../../color_picker/BaseColorPicker";
import LCNumberInput from "../../base/LCNumberInput";

const {Option} = Select;

interface LcCompBorderSetProps {
    updateBaseStyle?: (data: any) => void;
    borderStyle?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
}

export default class LcCompBorderSet extends Component<LcCompBorderSetProps> {

    borderStyleChanged = (style: string) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({borderStyle: style});
    }

    borderWidthChanged = (width: number) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({borderWidth: `${width}px`});
    }

    borderColorChanged = (color: any) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({borderColor: color});
    }

    borderRadiusChanged = (radius: number) => {
        const {updateBaseStyle} = this.props;
        updateBaseStyle && updateBaseStyle({borderRadius: `${radius}px`});
    }

    render() {
        const {borderColor = 'rgb(0,249,188)', borderRadius = 0, borderStyle = 'solid', borderWidth = 0} = this.props;
        return (
            <>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>边框类型：</label>
                    <Select defaultValue={borderStyle} className={'lc-config-item-value lc-select'}
                            onChange={this.borderStyleChanged}>
                        <Option value="dotted">点</Option>
                        <Option value="dashed">虚线</Option>
                        <Option value="solid">实线</Option>
                    </Select>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>边框颜色：</label>
                    <ColorPicker color={borderColor}
                                 onChange={this.borderColorChanged}
                                 className={'lc-config-item-value'}/>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>边框宽度：</label>
                    <div className={'lc-config-item-value'}>
                        <div className={'lc-input-container'}>
                            <LCNumberInput id={'baseBorderWidth'} value={borderWidth}
                                           onChange={this.borderWidthChanged}/>
                            <span>&nbsp;px</span>
                        </div>
                    </div>
                </div>
                <div className={'lc-config-item'}>
                    <label className={'lc-config-item-label'}>边框圆角：</label>
                    <div className={'lc-config-item-value lc-input-container'}>
                        <div className={'lc-input-container'}>
                            <LCNumberInput id={'baseBorderRadius'} value={borderRadius}
                                           onChange={this.borderRadiusChanged}/>
                            <span>&nbsp;px</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
