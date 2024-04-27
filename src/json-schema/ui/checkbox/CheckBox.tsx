import './CheckBox.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import React, {ChangeEvent, useState} from "react";

export interface CheckBoxProps extends UIContainerProps {
    value?: boolean;
    defaultValue?: boolean;
    disabled?: boolean;
    onChange?: (value: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = props => {
    const {value, defaultValue, disabled, onChange, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? value : defaultValue);

    const _onChange = (event: ChangeEvent) => {
        const checked = (event.target as HTMLInputElement).checked;
        if (!controlled)
            setStateValue(checked);
        onChange && onChange(checked);
    }

    return (
        <UIContainer className={'lc-checkbox'} {...containerProps}>
            <div style={{width: 18}}>
                <label className="lc-checkbox-container">
                    <input onChange={_onChange} checked={controlled ? value : stateValue} disabled={disabled}
                           type="checkbox"/>
                    <div className="checkmark"/>
                </label>
            </div>
        </UIContainer>
    );
};

export default CheckBox;
