import React, {Component} from 'react';
import './ColorMode.less';
import ColorPicker from "../color-picker/ColorPicker";
import Select from "../select/Select";
import ColorsPicker from "../colors-picker/ColorsPicker";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export type ColorModeType = 'general' | 'multi';

export interface ColorModeValue {
    mode: ColorModeType;
    color: string | string[];
}

export interface ColorModeProps extends UIContainerProps {
    value?: string | string[];
    defaultValue?: string | string[];
    onChange?: (value: string | string[]) => void;
}

class ColorMode extends Component<ColorModeProps> {

    _generalValue: string = '#252525';
    _multiValue: string[] = ['#252525'];
    controlled: boolean = false;
    state: { value: string | string[] } = {value: '#252525'}

    constructor(props: ColorModeProps) {
        super(props);
        const {value, defaultValue} = props!;
        this.controlled = !!value && !defaultValue;
        const _value = value || defaultValue || '#000000';
        this.state = {value: _value}
    }

    modeChange = (_mode: string) => {
        let {value} = this.state;
        switch (_mode) {
            case 'general':
                value = this._generalValue;
                break;
            case 'multi':
                value = this._multiValue;
                break;
        }
        const {onChange} = this.props;
        onChange && onChange(value);
        if (!this.controlled) {
            this.setState({value});
        }
    }

    colorChange = (value: string | string[]) => {
        const {onChange} = this.props;
        onChange && onChange(value);
        if (!this.controlled) {
            this.setState({value});
        }
    }

    buildColorModeValue = (color: string | string[]) => {
        if (Array.isArray(color))
            return {color, mode: 'multi'};
        else
            return {color, mode: 'general'};
    }

    render() {
        const {value: stateValue} = this.state;
        const {padding, margin, tip, label, value: propValue, gridColumn} = this.props;
        const {color, mode} = this.buildColorModeValue(this.controlled ? propValue! : stateValue);
        return (
            <UIContainer tip={tip} label={label} margin={margin} padding={padding} gridColumn={gridColumn}>
                <div className={"lc-color-mode"}>
                    <div className={'mode-select'} style={{width: 80}}>
                        <Select value={mode || 'general'}
                                onChange={(mode: string) => this.modeChange(mode as ColorModeType)}
                                options={[
                                    {value: 'general', label: '单色&渐变'},
                                    {value: 'multi', label: '多色'},
                                ]}/>
                    </div>
                    {
                        mode === 'general' &&
                        <ColorPicker
                            value={color as string}
                            onChange={this.colorChange}
                            width={100}
                            showBorder={true}
                            radius={2}
                            showText={true}/>
                    }
                    {mode === 'multi' &&
                    <ColorsPicker onChange={this.colorChange} canAdd={true}
                                  value={(color as string[]) || ['#a9a9a9']}/>}
                </div>
            </UIContainer>
        );
    }
}

export default ColorMode;