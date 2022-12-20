import React, {Component} from 'react';
import {Popover} from 'antd';
import {ChromePicker} from 'react-color';
import './style/BaseColorPicker.less';
import {BaseProps} from "../../types/BaseType";

interface ColorPickerProps extends BaseProps {
    onChange?: (color: any, e: Event, id: number | string | undefined) => void;
    color?: string;
    value?: string;
    id?: number | string;
}


class ColorPicker extends Component<ColorPickerProps> {
    state = {
        color: 'rgb(0,249,188)',
        colorArea: 'rgb(0,255,192)'
    };

    constructor(props: ColorPickerProps) {
        super(props);
        const {value = 'rgb(0,249,188)'} = props;
        this.state = {
            color: value,
            colorArea: value
        }
    }


    onChangeComplete = (color: any, event: any) => {
        const {onChange, id} = this.props;
        const rgbColor = `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
        onChange && onChange(rgbColor, event, id);
        this.setState({
            color: color.rgb,
            colorArea: rgbColor
        })
    }


    render() {
        const {colorArea, color} = this.state;
        const content = (<ChromePicker className={'color-picker'} color={color}
                                       onChange={this.onChangeComplete}/>)
        return (
            <Popover placement="topLeft" content={content} trigger={'click'}>
                <div style={{backgroundColor: `${colorArea}`}}
                     className={'color-area'}/>
            </Popover>

        )
    }
}

export default ColorPicker;