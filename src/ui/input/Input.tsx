import {ChangeEvent, Component} from 'react';
import './Input.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface InputProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    prefix?: string;
    suffix?: string;
    minLength?: number;
    maxLength?: number;
    disabled?: boolean;
    onChange?: (data: string) => void;
}

export default function Input(props: InputProps) {
    const {
        value, defaultValue, prefix, suffix,
        minLength, maxLength, disabled, onChange, ...containerProps
    } = props;

    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {onChange} = this.props;
        onChange && onChange(event.target.value);
    }

    return (
        <UIContainer {...containerProps}>
            <div className={'lc-input-content'}>
                {prefix && <div className={'lc-input-prefix'}>{prefix}&nbsp;</div>}
                <div className={'lc-input-body'}>
                    <input value={value}
                           defaultValue={defaultValue}
                           minLength={minLength}
                           maxLength={maxLength}
                           disabled={disabled}
                           className={'lc-input'}
                           onChange={_onChange}/>
                </div>
                {suffix && <div className={'lc-input-suffix'}>&nbsp;{suffix}</div>}
            </div>
        </UIContainer>
    );
}