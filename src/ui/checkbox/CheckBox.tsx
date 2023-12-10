import './CheckBox.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import React, {ChangeEvent, useState} from "react";

export interface CheckBoxProps extends UIContainerProps {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = props => {
    const {value, defaultValue, disabled, onChange, ...rest} = props;
    const control = !!value && !defaultValue;
    const [checked, setChecked] = useState(value || defaultValue || false);

    const _value = control ? value : checked;

    const _onChange = (event: ChangeEvent) => {
        const checked = (event.target as HTMLInputElement).checked;
        if (control) {
            onChange && onChange(checked);
        } else {
            setChecked(checked);
            onChange && onChange(checked);
        }
    }

    return (
        <UIContainer className={'lc-checkbox'} {...rest}>
            <div style={{width: 18}}>
                <label className="lc-checkbox-container">
                    <input onChange={_onChange} checked={_value} disabled={disabled} type="checkbox"/>
                    <div className="checkmark"/>
                </label>
            </div>
        </UIContainer>
    );
};
