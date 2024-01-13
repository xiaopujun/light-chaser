import {ChangeEvent, useRef, useState} from 'react';

import './Radio.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface Option {
    label: string;
    value: string;
}

export interface RadioProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    options?: Option[];
    onChange?: (value: string) => void;
}

export default function Radio(props: RadioProps) {
    const {value, defaultValue, disabled, options, onChange, ...containerProps} = props;
    const timestampRef = useRef('radio_' + Math.random().toString(36).substr(2, 9));
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? value : defaultValue);
    const finalValue = controlled ? value : stateValue;

    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange && onChange(value);
        if (!controlled)
            setStateValue(value);
    }

    const generateOptions = () => {
        return options?.map((option: Option, index: number) => {
            let checked = false;
            if (option.value === finalValue)
                checked = true;
            return (
                <label className="radio-button" key={index + ''}
                       style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}}>
                    <input checked={checked} disabled={disabled} onChange={_onChange} value={option.value}
                           name={timestampRef.current}
                           type="radio"/>
                    <div className="radio-circle"/>
                    <span className="radio-label">{option.label}</span>
                </label>
            );
        });
    }

    return (
        <UIContainer {...containerProps} className={'lc-radio'}>
            <div className="radio-buttons">
                {generateOptions()}
            </div>
        </UIContainer>
    );
}


// class Radio extends Component<RadioProps> {
//
//     valueControl: boolean = true;
//     timestamp: string = 'radio_' + Math.random().toString(36).substr(2, 9);
//
//     state = {
//         value: ''
//     }
//
//     constructor(props: RadioProps) {
//         super(props);
//         this.valueControl = props.value !== undefined;
//         this.state = {
//             value: props.value || props.defaultValue || ''
//         }
//     }
//
//     onChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const {onChange} = this.props;
//         onChange && onChange(event.target.value);
//         if (!this.valueControl) {
//             this.setState({
//                 value: event.target.value
//             });
//         }
//     }
//
//     generateOptions = () => {
//         const {options = [], disabled = false} = this.props;
//         return options.map((option: Option, index: number) => {
//             const value = this.valueControl ? this.props.value : this.state.value;
//             let checked = false;
//             if (option.value === value)
//                 checked = true;
//             return (
//                 <label className="radio-button" key={index + ''}
//                        style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}}>
//                     <input checked={checked} disabled={disabled} onChange={this.onChange} value={option.value}
//                            name={this.timestamp}
//                            type="radio"/>
//                     <div className="radio-circle"/>
//                     <span className="radio-label">{option.label}</span>
//                 </label>
//             );
//         });
//     }
//
//     render() {
//         const {label, tip, padding, margin, gridColumn} = this.props;
//         return (
//             <UIContainer label={label} tip={tip} gridColumn={gridColumn} className={'lc-radio'}
//                          padding={padding} margin={margin}>
//                 <div className="radio-buttons">
//                     {this.generateOptions()}
//                 </div>
//             </UIContainer>
//         );
//     }
// }
//
// export default Radio;