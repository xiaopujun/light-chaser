import React, {Component} from 'react';
import {Popover} from 'antd';
import {ChromePicker} from 'react-color';
import './style/BaseColorPicker.less';
import {BaseProps} from "../../types/BaseType";

interface ColorPickerProps extends BaseProps {
    onChange?: (color: any, e: Event, id: number | string | undefined) => void;
    color?: string;
    value?: string;
    style?: any;
    showText?: boolean;
    id?: number | string;
}


class ColorPicker extends Component<ColorPickerProps> {
    state = {
        color: 'rgb(0,249,188)',
        colorArea: 'rgb(0,255,192)',
        hex: ''
    };

    constructor(props: ColorPickerProps) {
        super(props);
        const {value = 'rgb(0,249,188)'} = props;
        this.state = {
            color: value,
            colorArea: value,
            hex: ''
        }
    }


    onChangeComplete = (color: any, event: any) => {
        const {onChange, id} = this.props;
        const rgbColor = `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
        onChange && onChange(rgbColor, event, id);
        this.setState({
            color: color.rgb,
            colorArea: rgbColor,
            hex: color.hex
        })
    }


    render() {
        const {colorArea, color, hex} = this.state;
        const {style, showText = false} = this.props;
        const content = (<ChromePicker className={'color-picker'} color={color}
                                       onChange={this.onChangeComplete}/>)
        return (
            <Popover placement="topLeft" content={content} trigger={'click'}>
                <div style={{backgroundColor: `${colorArea}`, ...style}}
                     className={'color-area'}>
                    {showText ? <span>{hex}</span> : null}
                </div>
            </Popover>

        )
    }
}

export default ColorPicker;