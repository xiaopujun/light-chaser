import React, {Component} from 'react';
import {Popover} from 'antd';
import {ChromePicker,} from 'react-color';
import './index.less';

class ColorPicker extends Component {
    state = {
        color: 'rgba(0,255,192,0.59)',
        colorArea: 'rgba(0,255,192,0.59)'
    };

    onChangeComplete = (color) => {
        const {name, onChange} = this.props;
        const rgbColor = `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
        onChange(name, rgbColor);
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