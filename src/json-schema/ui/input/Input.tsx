import {ChangeEvent} from 'react';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {Input as AntdInput} from 'antd';


export interface InputProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (data: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}

export default function Input(props: InputProps) {
    const {
        value, defaultValue, onChange, placeholder,
        type, disabled, ...containerProps
    } = props;

    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.value);
    }

    return (
        <UIContainer {...containerProps}>
            <AntdInput value={value}
                       placeholder={placeholder}
                       type={type}
                       style={{width: '100%'}}
                       defaultValue={defaultValue}
                       disabled={disabled}
                       className={'lc-input'}
                       onChange={_onChange}/>
        </UIContainer>
    );
}