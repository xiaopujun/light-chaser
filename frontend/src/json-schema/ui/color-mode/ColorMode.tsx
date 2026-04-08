/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {useRef, useState} from 'react';
import './ColorMode.less';
import ColorPicker from "../color-picker/ColorPicker";
import Select from "../select/Select";
import ColorsPicker from "../colors-picker/ColorsPicker";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export type ColorModeType = 'single' | 'multi';

export interface ColorModeValue {
    mode: ColorModeType;
    color: string | string[];
}

export interface ColorModeProps extends UIContainerProps {
    value?: string | string[];
    defaultValue?: string | string[];
    onChange?: (value: string | string[]) => void;
}

export default function ColorMode(props: ColorModeProps) {
    const {value, defaultValue, onChange, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? value : defaultValue);
    const [mode, setMode] = useState<ColorModeType>(Array.isArray(controlled ? value : defaultValue) ? 'multi' : 'single');
    const finalValue = controlled ? value : stateValue;
    const _singleValueRef = useRef('#252525');
    const _multiValueRef = useRef(['#252525']);

    const modeChange = (_mode: string) => {
        let tempValue: string | string[] = '#252525';
        if (_mode === 'multi')
            tempValue = _multiValueRef.current;
        if (_mode === 'single')
            tempValue = _singleValueRef.current;
        onChange && onChange(tempValue);
        if (!controlled) {
            setStateValue(tempValue);
            setMode(_mode as ColorModeType);
        }
    }

    const colorChange = (value: string | string[]) => {
        onChange && onChange(value);
        if (!controlled)
            setStateValue(value);
    }
    return (
        <UIContainer {...containerProps}>
            <div className={"lc-color-mode"}>
                <div className={'mode-select'} style={{width: 80}}>
                    <Select value={mode}
                            onChange={(mode: string) => modeChange(mode as ColorModeType)}
                            options={[
                                {value: 'single', label: '单色'},
                                {value: 'multi', label: '多色'},
                            ]}/>
                </div>
                {
                    mode === 'single' &&
                    <ColorPicker
                        value={finalValue as string}
                        onChange={colorChange}
                        showText={true}/>
                }
                {mode === 'multi' &&
                <ColorsPicker onChange={colorChange} canAdd={true}
                              value={(finalValue as string[]) || ['#a9a9a9']}/>}
            </div>
        </UIContainer>
    )
}


// class ColorMode extends Component<ColorModeProps> {
//
//     _generalValue: string = '#252525';
//     _multiValue: string[] = ['#252525'];
//     controlled: boolean = false;
//     state: { value: string | string[] } = {value: '#252525'}
//
//     constructor(props: ColorModeProps) {
//         super(props);
//         const {value, defaultValue} = props!;
//         this.controlled = !!value && !defaultValue;
//         const _value = value || defaultValue || '#000000';
//         this.state = {value: _value}
//     }
//
//     modeChange = (_mode: string) => {
//         let {value} = this.state;
//         switch (_mode) {
//             case 'general':
//                 value = this._generalValue;
//                 break;
//             case 'multi':
//                 value = this._multiValue;
//                 break;
//         }
//         const {onChange} = this.props;
//         onChange && onChange(value);
//         if (!this.controlled) {
//             this.setState({value});
//         }
//     }
//
//     colorChange = (value: string | string[]) => {
//         const {onChange} = this.props;
//         onChange && onChange(value);
//         if (!this.controlled) {
//             this.setState({value});
//         }
//     }
//
//     buildColorModeValue = (color: string | string[]) => {
//         if (Array.isArray(color))
//             return {color, mode: 'multi'};
//         else
//             return {color, mode: 'general'};
//     }
//
//     render() {
//         const {value: stateValue} = this.state;
//         const {padding, margin, tip, label, value: propValue, gridColumn} = this.props;
//         const {color, mode} = this.buildColorModeValue(this.controlled ? propValue! : stateValue);
//         return (
//             <UIContainer tip={tip} label={label} margin={margin} padding={padding} gridColumn={gridColumn}>
//                 <div className={"lc-color-mode"}>
//                     <div className={'mode-select'} style={{width: 80}}>
//                         <Select value={mode || 'general'}
//                                 onChange={(mode: string) => this.modeChange(mode as ColorModeType)}
//                                 options={[
//                                     {value: 'general', label: '单色'},
//                                     {value: 'multi', label: '多色'},
//                                 ]}/>
//                     </div>
//                     {
//                         mode === 'general' &&
//                         <ColorPicker
//                             value={color as string}
//                             onChange={this.colorChange}
//                             width={100}
//                             height={16}
//                             showText={true}/>
//                     }
//                     {mode === 'multi' &&
//                     <ColorsPicker onChange={this.colorChange} canAdd={true}
//                                   value={(color as string[]) || ['#a9a9a9']}/>}
//                 </div>
//             </UIContainer>
//         );
//     }
// }
//
// export default ColorMode;