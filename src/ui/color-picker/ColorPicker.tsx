import React, {Component} from 'react';
import {ColorPicker as AntdColorPicker, Tooltip} from 'antd';
import './ColorPicker.less';
import {ColorResult} from 'react-color';
import {QuestionCircleOutlined} from "@ant-design/icons";

interface ColorPickerProps {
    //颜色色值（受控）
    value?: string;
    //颜色色值（非受控）
    defaultValue?: string;
    //颜色区域样式（非受控）
    style?: React.CSSProperties;
    //是否显示色值文本（非受控）
    showText?: boolean;
    disabled?: boolean;
    label?: string;
    tip?: string;
    onChange?: (color: string, id?: string) => void;
}

class ColorPicker extends Component<ColorPickerProps> {

    controlled: boolean = false;

    state = {
        color: '#000000ff',
    }

    constructor(props: ColorPickerProps) {
        super(props);
        this.controlled = props.value !== undefined && props.defaultValue === null;
    }

    onChangeComplete = (color: ColorResult) => {
        const {onChange} = this.props;
        // onChange && onChange(type === 'hex' ? hex : rgbColor);
        if (!this.controlled) {
            this.setState({
                color: color.hex,
            });
        }
    };

    render() {
        const {label, tip, showText = false, defaultValue = '#000000', value = '#000000', disabled} = this.props;
        return (
            <div className={'lc-color-picker-container'}>
                {label && <div className={'lc-color-picker-label'}>{label}</div>}
                {tip && <div className={'lc-color-picker-tip'}>
                    <Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;</Tooltip>
                </div>}
                <div className={'lc-color-picker'}>
                    <AntdColorPicker size={'small'} defaultValue={'#fff'} showText={true} disabled={disabled}/>
                </div>
            </div>
        );
    }
}

export default ColorPicker;