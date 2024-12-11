import {useState} from "react";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {Switch as AntdSwitch} from 'antd';

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
    const [stateValue, setStateValue] = useState<boolean>(!!(controlled ? value : defaultValue));
    const finalValue: boolean = !!(controlled ? value : stateValue);

    const _onChange = (checked: boolean) => {
        onChange && onChange(checked);
        if (!controlled)
            setStateValue(checked);
    };

    return (
        <UIContainer {...containerProps} className={'lc-switch'}>
            <AntdSwitch disabled={disabled} checked={finalValue} onChange={_onChange}/>
        </UIContainer>
    );
}