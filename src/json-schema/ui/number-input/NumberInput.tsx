import {ChangeEvent} from 'react';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import './NumberInput.less';

export interface NumberInputProps extends UIContainerProps {
    value?: number;
    defaultValue?: number;
    prefix?: string;
    suffix?: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (data: number) => void;
}

export default function NumberInput(props: NumberInputProps) {
    const {
        value, defaultValue, prefix, suffix, min,
        max, step, disabled, onChange, ...containerProps
    } = props;

    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(Number(event.target.value));
    }

    return (
        <UIContainer {...containerProps}>
            <div className={'lc-number-input-content'}>
                {prefix && <div>{prefix}&nbsp;</div>}
                <div className={'lc-number-input-body'}>
                    <input value={value}
                           defaultValue={defaultValue}
                           disabled={disabled}
                           min={min}
                           max={max}
                           step={step}
                           type={'number'}
                           className={'lc-number-input'}
                           onChange={_onChange}/>
                </div>
                {suffix && <div>&nbsp;{suffix}</div>}
            </div>
        </UIContainer>
    );
}