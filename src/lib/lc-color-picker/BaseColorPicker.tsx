import React, {Component} from 'react';
import {Popover} from 'antd';
import {ChromePicker} from 'react-color';
import './BaseColorPicker.less';
import {colorConversion, rgbaToHex} from "../../utils/ColorUtil";

interface BaseColorPickerProps {
    onChange?: (color: any, e: Event, id: number | string | undefined) => void;
    type?: 'hex' | 'rgba';
    value?: string;
    style?: React.CSSProperties;
    showText?: boolean;
    name?: string;
    id?: number | string;
}


class BaseColorPicker extends Component<BaseColorPickerProps> {
    state = {
        rgba: 'rgba(0,0,0,1)',
        hex: '#000000'
    };

    constructor(props: BaseColorPickerProps) {
        super(props);
        const {value = '#000000ff'} = props;
        const color = colorConversion(value);
        this.state = {
            rgba: color.rgba,
            hex: color.hex
        }
    }

    onChangeComplete = (color: any, event: any) => {
        const {onChange, id, type = 'hex'} = this.props;
        const rgbColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
        const hex = rgbaToHex(rgbColor);
        if (type === 'hex') {
            onChange && onChange(hex, event, id);
        } else {
            onChange && onChange(rgbColor, event, id);
        }
        this.setState({
            color: rgbColor,
            hex: hex
        })
    }

    render() {
        const {hex, rgba} = this.state;
        const {style, showText = false, type = 'hex'} = this.props;
        const content = (<ChromePicker className={'color-picker'} color={hex}
                                       onChange={this.onChangeComplete}/>)
        const showContent = showText ? type === 'hex' ? hex : rgba : null;
        return (
            <Popover placement="topLeft" content={content} trigger={'click'}>
                <div style={{backgroundColor: `${hex}`, ...style}}
                     className={'color-area'}>
                    {showText ? <span>{showContent}</span> : null}
                </div>
            </Popover>

        )
    }
}

export default BaseColorPicker;