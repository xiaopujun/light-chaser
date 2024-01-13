import React, {useState} from "react";
import "./Switch.less";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface SwitchProps extends UIContainerProps {
    onChange?: (data: boolean) => void;
    // 开关状态值（受控）
    value?: boolean;
    // 开关状态值（非受控）
    defaultValue?: boolean;
    disabled?: boolean;
}

export default function Switch(props: SwitchProps) {
    const {value, defaultValue, disabled, onChange, ...containerProps} = props;
    const controlled: boolean = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState<boolean>(controlled ? value : defaultValue);
    const finalValue: boolean = controlled ? value : stateValue;

    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target;
        onChange && onChange(checked);
        if (!controlled)
            setStateValue(checked);
    };

    return (
        <UIContainer {...containerProps} className={'lc-switch'}>
            <div style={{display: 'flex'}}>
                <label className="lc-switch-body">
                    <input disabled={disabled}
                           checked={finalValue}
                           onChange={_onChange} type="checkbox"/>
                    <span/>
                </label>
            </div>
        </UIContainer>
    );
}