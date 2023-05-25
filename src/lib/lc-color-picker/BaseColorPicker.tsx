import React, {Component} from 'react';
import {Popover} from 'antd';
import {ChromePicker} from 'react-color';
import './BaseColorPicker.less';
import {colorConversion, rgbaToHex} from '../../utils/ColorUtil';

interface BaseColorPickerProps {
    onChange?: (color: any, e: Event, id: number | string | undefined) => void;
    type?: 'hex' | 'rgba';
    value?: string;
    defaultValue?: string;
    style?: React.CSSProperties;
    showText?: boolean;
    name?: string;
    id?: number | string;
}

interface BaseColorPickerState {
    rgba: string;
    hex: string;
    color: string;
}

class BaseColorPicker extends Component<BaseColorPickerProps, BaseColorPickerState> {
    static defaultProps = {
        defaultValue: '#000000ff',
    };

    constructor(props: BaseColorPickerProps) {
        super(props);
        const {value, defaultValue} = props;
        const colorValue = value !== undefined ? value : defaultValue;
        const colorObj = colorConversion(colorValue || '');
        this.state = {
            rgba: colorObj.rgba,
            hex: colorObj.hex,
            color: colorValue || '#000000ff',
        };
    }

    componentDidUpdate(prevProps: BaseColorPickerProps) {
        const {value} = this.props;
        if (value !== undefined && value !== prevProps.value) {
            const color = colorConversion(value);
            this.setState({
                rgba: color.rgba,
                hex: color.hex,
                color: value,
            });
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
            hex: hex,
        });
    };

    render() {
        console.log('BaseColorPicker render');
        const {hex, rgba, color} = this.state;
        const {style, showText = false, type = 'hex'} = this.props;
        const content = (
            <ChromePicker className={'color-picker'}
                          color={hex}
                          onChange={this.onChangeComplete}/>
        );
        const showContent = showText ? (type === 'hex' ? hex : rgba) : null;
        return (
            <Popover placement="topLeft" content={content} trigger={'click'}>
                <div style={{backgroundColor: `${color}`, ...style}}
                     className={'color-area'}>
                    {showText ? <span>{showContent}</span> : null}
                </div>
            </Popover>
        );
    }
}

export default BaseColorPicker;