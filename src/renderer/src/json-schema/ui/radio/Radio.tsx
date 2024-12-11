import {useState} from 'react';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {Radio as AntdRadio, RadioChangeEvent} from 'antd';

export interface RadioOption {
    label: string;
    value: string;
}

export interface RadioProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    options?: RadioOption[];
    onChange?: (value: string) => void;
}

export default function Radio(props: RadioProps) {
    const {value, defaultValue, disabled, options, onChange, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? value : defaultValue);
    const finalValue = controlled ? value : stateValue;

    const _onChange = (event: RadioChangeEvent) => {
        const value = event.target.value;
        onChange && onChange(value);
        if (!controlled)
            setStateValue(value);
    }

    return (
        <UIContainer {...containerProps} className={'lc-radio'}>
            <AntdRadio.Group value={finalValue} onChange={_onChange} disabled={disabled} size={'small'}>
                {
                    options?.map((option: RadioOption, index: number) => {
                        return <AntdRadio key={index} value={option.value}>{option.label}</AntdRadio>
                    })
                }
            </AntdRadio.Group>
        </UIContainer>
    );
}