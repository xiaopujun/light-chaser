import {Component} from 'react';
import {ColorPicker as AntdColorPicker} from 'antd';
import './ColorPicker.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {Color} from "antd/es/color-picker/color";

interface ColorPickerProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    width?: number | string;
    height?: number | string;
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
        this.state = {value: defaultValue || value || '#00e9ff'};
    }

    onChangeComplete = (color: Color) => {
        const {onChange} = this.props;
        const value = color.toHexString();
        onChange && onChange(value);
        if (!this.control) {
            this.setState({value});
        }
    };

    render() {
        const color = this.control ? this.props.value : this.state.value;
        const {disabled, tip, label, showText} = this.props;
        return (
            <UIContainer tip={tip} label={label} className={'lc-color-pick'}>
                <AntdColorPicker
                    size={'small'}
                    format={'hex'}
                    disabled={disabled}
                    value={color}
                    onChangeComplete={this.onChangeComplete}
                />
                {showText && <span className={'text-area'}>{color?.toUpperCase()}</span>}
            </UIContainer>
        );
    }
}

export default ColorPicker;