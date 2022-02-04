import React, {Component} from 'react';
import {Popover} from 'antd';
import {ChromePicker} from 'react-color';
import './index.less';
import {BaseProps} from "../../../types/Base";

interface ColorPickerProps extends BaseProps {
    onChange?: (color: any, e: Event, id: number | string | undefined) => void;
    id?: number | string;
}


class ColorPicker extends Component<ColorPickerProps> {
    state = {
        color: 'rgba(0,255,192,0.59)',
        colorArea: 'rgba(0,255,192,0.59)'
    };

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
                                       onChangeComplete={this.onChangeComplete}/>)
        return (
            <Popover placement="topLeft" content={content} trigger={'click'}>
                <div style={{backgroundColor: `${colorArea}`}}
                     className={'color-area'}></div>
            </Popover>

        )
    }
}

export default ColorPicker;