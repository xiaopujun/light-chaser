import React, {ChangeEvent, Component, InputHTMLAttributes} from 'react';
import './StringInput.less';

export interface StringInputProps extends Pick<InputHTMLAttributes<HTMLInputElement>,
    "minLength" | "maxLength" | "required" | "value" | "defaultValue" | "disabled"> {
    //值改变时的回调
    onChange?: (data: string) => void;
}

/**
 * 下滑线输入框
 */
class StringInput extends Component<StringInputProps> {

    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if (!event.target.checkValidity()) {
            event.target.reportValidity()
            return;
        }
        const {onChange} = this.props;
        onChange && onChange(event.target.value);
    }

    render() {
        const {onChange, ...rest} = this.props;
        return (
            <div className={'string-input-container'}>
                <input {...rest}
                       onChange={this.onChange}
                       className={'string-input'}
                />
                <span className={'string-input-span'}/>
            </div>
        );
    }
}

export default StringInput;