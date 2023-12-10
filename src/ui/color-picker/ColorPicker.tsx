import {Component} from 'react';
import {Popover} from 'antd';
import './ColorPicker.less';
import {GradientColorPicker} from "./GradientColorPicker";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import ColorUtil from "../../utils/ColorUtil";

interface ColorPickerProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    width?: number | string;
    height?: number | string;
    radius?: number;
    showBorder?: boolean;
    hideControls?: boolean;
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

    onChangeComplete = (color: string) => {
        const {onChange} = this.props;
        if (color.indexOf('gradient') === -1 && color.indexOf('rgba') !== -1)
            color = ColorUtil.rgbaToHex(color);
        onChange && onChange(color);
        if (!this.control) {
            this.setState({value: color});
        }
    };

    render() {
        const color = this.control ? this.props.value : this.state.value;
        const {disabled, tip, label, showText, width, height, radius, showBorder, hideControls} = this.props;
        let hex = null;
        if (showText && color?.indexOf('gradient') === -1 && color?.indexOf('rgba') !== -1) {
            hex = ColorUtil.colorConversion(color).hex;
        } else if (showText && color?.indexOf('#') !== -1) {
            hex = color;
        }
        const _style = {
            width,
            height,
            borderRadius: radius,
            cursor: disabled ? 'not-allowed' : 'pointer'
        };
        return (
            <UIContainer tip={tip} label={label} className={'lc-color-pick'}>
                <Popover content={(disabled ? null :
                    <div style={{padding: 4}}>
                        <GradientColorPicker value={color} onChange={this.onChangeComplete}
                                             hideControls={hideControls}/>
                    </div>)} trigger={'click'}>
                    <div className={`${showBorder && 'color-picker-border'}`}>
                        <div style={{background: `${color}`, ..._style}}
                             className={'color-area'}>
                            {showText ? <span>{hex}</span> : null}
                        </div>
                    </div>
                </Popover>
            </UIContainer>
        );
    }
}

export default ColorPicker;