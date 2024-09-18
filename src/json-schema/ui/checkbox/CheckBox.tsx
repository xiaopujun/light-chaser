import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import React, {useState} from "react";
import {Checkbox as AntdCheckBox} from 'antd';
import {CheckboxChangeEvent} from "antd/es/checkbox/Checkbox";

export interface CheckBoxProps extends UIContainerProps {
    value?: boolean;
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = props => {
    const {value, defaultValue, onChange, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? value : defaultValue);

    const _onChange = (event: CheckboxChangeEvent) => {
        const checked = (event.target as HTMLInputElement).checked;
        if (!controlled)
            setStateValue(checked);
        onChange && onChange(checked);
    }

    return (
        <UIContainer className={'lc-checkbox'} {...containerProps}>
            <AntdCheckBox checked={controlled ? value : stateValue} onChange={_onChange}/>
        </UIContainer>
    );
};

export default CheckBox;
