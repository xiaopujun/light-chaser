import {UIContainer, UIContainerProps} from "../ui-container/UIContainer.tsx";
import {InputNumber as AntdNumberInput} from 'antd';

export interface NumberInputProps extends UIContainerProps {
    value?: number;
    defaultValue?: number;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (data: number) => void;
}

export default function NumberInput(props: NumberInputProps) {
    const {
        value, defaultValue, min,
        max, step, disabled, onChange, ...containerProps
    } = props;

    const _onChange = (value: number | null) => {
        if (!value)
            return;
        onChange && onChange(value);
    }

    return (
        <UIContainer {...containerProps} className={'lc-number-input'}>
            <AntdNumberInput
                style={{width: '100%'}}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
                onChange={_onChange}/>
        </UIContainer>
    );
}