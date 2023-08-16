import React, {Component} from 'react';
import {Popover} from 'antd';
import './BaseColorPicker.less';
import {ChromePicker} from 'react-color';
import {colorConversion, rgbaToHex} from '../../utils/ColorUtil';

interface BaseColorPickerProps {
    //颜色色值类型（非受控）
    type?: 'hex' | 'rgba';
    //颜色色值（受控）
    value?: string;
    //颜色色值（非受控）
    defaultValue?: string;
    //颜色区域样式（非受控）
    style?: React.CSSProperties;
    //是否显示色值文本（非受控）
    showText?: boolean;
    disabled?: boolean;
    onChange?: (color: string, id?: string) => void;
}

class BaseColorPicker extends Component<BaseColorPickerProps> {

    valueControl: boolean = true;

    state: any = {
        value: '',
        rgba: '',
        hex: '',
        style: {},
        showText: false
    }

    constructor(props: BaseColorPickerProps) {
        super(props);
        let {value, defaultValue, type = 'hex', style, showText} = props;
        if (defaultValue !== undefined && value === undefined)
            this.valueControl = false;
        value = value || defaultValue;
        let colorObj = colorConversion(value || '#000000ff');
        this.state = {
            rgba: colorObj.rgba,
            hex: colorObj.hex,
            value: type === 'rgba' ? colorObj.rgba : colorObj.hex,
            style: style,
            showText: showText,
            type: type,
        };
    }

    onChangeComplete = (color: any) => {
        const {onChange} = this.props;
        const {type} = this.state;
        const rgbColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
        const hex = rgbaToHex(rgbColor);
        onChange && onChange(type === 'hex' ? hex : rgbColor);
        if (!this.valueControl) {
            this.setState({
                color: rgbColor,
                hex: hex,
                value: type === 'hex' ? hex : rgbColor,
            });
        }
    };

    render() {
        let colorObj = colorConversion(this.valueControl ? this.props.value || '#000000ff' : this.state.value);
        const {showText = false, type, style} = this.state;
        const {disabled} = this.props;
        const content = (disabled ? null :
                <ChromePicker className={'color-picker'}
                              color={colorObj.hex}
                              onChange={this.onChangeComplete}/>
        );
        const showContent = showText ? (type === 'hex' ? colorObj.hex : colorObj.rgba) : null;
        let _style = disabled ? {...style, ...{cursor: 'not-allowed'}} : {...style, ...{cursor: 'pointer'}};
        return (
            <Popover placement="topLeft" content={content} trigger={'click'}>
                <div style={{backgroundColor: `${colorObj.hex}`, ..._style}} className={'color-area'}>
                    {showText ? <span>{showContent}</span> : null}
                </div>
            </Popover>
        );
    }
}

export default BaseColorPicker;