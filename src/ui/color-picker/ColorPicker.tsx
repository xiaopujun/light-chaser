import React, {Component} from 'react';
import {Popover, Tooltip} from 'antd';
import './ColorPicker.less';
import {ChromePicker} from 'react-color';
import {colorConversion, rgbaToHex} from '../../utils/ColorUtil';
import {QuestionCircleOutlined} from "@ant-design/icons";

interface ColorPickerProps {
    tip?: string;
    label?: string;
    //颜色色值（受控）
    value?: string;
    //颜色色值（非受控）
    defaultValue?: string;
    //颜色区域样式（非受控）
    style?: React.CSSProperties;
    width?: number;
    height?: number;
    radius?: number;
    border?: string;
    //是否显示色值文本（非受控）
    showText?: boolean;
    disabled?: boolean;
    onChange?: (color: string, id?: string) => void;
}

class ColorPicker extends Component<ColorPickerProps> {

    control: boolean = true;

    state = {
        value: ''
    }

    constructor(props: ColorPickerProps) {
        super(props);
        const {value, defaultValue} = props;
        this.control = !defaultValue && !!value;
    }

    onChangeComplete = (color: any) => {
        const {onChange, value} = this.props;
        const rgbColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
        const hex = rgbaToHex(rgbColor);
        onChange && onChange(hex);
        if (!value) {
            console.log('非受控');
            this.setState({value: hex});
        }
    };

    render() {
        let colorObj = colorConversion((this.control ? this.props.value : this.state.value) || '#000000');
        const {disabled, tip, label, showText, width, height, radius, border} = this.props;
        const content = (disabled ? null :
                <ChromePicker className={'color-picker'}
                              color={colorObj.hex}
                              onChange={this.onChangeComplete}/>
        );
        const showContent = showText ? colorObj.hex : null;
        let _style = {
            width,
            height,
            borderRadius: radius,
            border,
            padding: border && 2,
            backgroundClip: border && 'content-box',
            cursor: disabled ? 'not-allowed' : 'pointer'
        };
        return (
            <div className={'color-pick-container'}>
                {label &&
                <div className={`lc-color-picker-label`}>{label}</div>}
                {tip &&
                <div className={'lc-color-picker-tip'}><Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;
                </Tooltip></div>}
                <Popover content={content} trigger={'click'}>
                    <div style={{backgroundColor: `${colorObj.hex}`, ..._style}} className={'color-area'}>
                        {showText ? <span>{showContent}</span> : null}
                    </div>
                </Popover>
            </div>
        );
    }
}

export default ColorPicker;