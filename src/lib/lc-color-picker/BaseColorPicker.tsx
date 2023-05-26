import React, {Component} from 'react';
import {Popover} from 'antd';
import {ChromePicker} from 'react-color';
import './BaseColorPicker.less';
import {colorConversion, rgbaToHex} from '../../utils/ColorUtil';
import {isEqual, omit} from "lodash";

interface BaseColorPickerProps {
    onChange?: (color: any) => void;
    type?: 'hex' | 'rgba';
    value?: string;
    defaultValue?: string;
    style?: React.CSSProperties;
    showText?: boolean;
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

    shouldComponentUpdate(nextProps: Readonly<BaseColorPickerProps>, nextState: Readonly<BaseColorPickerState>, nextContext: any): boolean {
        return !isEqual(omit(this.props, ['onChange']), omit(nextProps, ['onChange']));
    }

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

    onChangeComplete = (color: any) => {
        const {onChange, type = 'hex'} = this.props;
        const rgbColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
        const hex = rgbaToHex(rgbColor);
        if (type === 'hex') {
            onChange && onChange(hex);
        } else {
            onChange && onChange(rgbColor);
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