import React, {ChangeEvent, Component, InputHTMLAttributes} from 'react';
import './Input.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface InputProps extends Pick<InputHTMLAttributes<HTMLInputElement>,
    "minLength" | "maxLength" | "required" | "value" | "defaultValue" | "disabled" | "type">, UIContainerProps {
    onChange?: (data: string | number) => void;
    prefix?: string;
    suffix?: string;
}

/**
 * 下滑线输入框
 */
class Input extends Component<InputProps> {

    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if (!event.target.checkValidity()) {
            event.target.reportValidity()
            return;
        }
        const {onChange, type} = this.props;
        onChange && onChange(type === 'number' ? Number(event.target.value) : event.target.value);
    }

    render() {
        const {onChange, label, prefix, suffix, tip, ...rest} = this.props;
        return (
            <UIContainer label={label} tip={tip} className={'lc-input'}>
                <div className={'lc-input-content'}>
                    {prefix && <div className={'lc-input-prefix'}>{prefix}&nbsp;</div>}
                    <div className={'lc-input-body'}>
                        <input {...rest} onChange={this.onChange} className={'lc-input'}/>
                        <span className={'lc-input-span'}/>
                    </div>
                    {suffix && <div className={'lc-input-suffix'}>&nbsp;{suffix}</div>}
                </div>
            </UIContainer>
        );
    }
}

export default Input;