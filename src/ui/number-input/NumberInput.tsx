import React, {ChangeEvent, Component, InputHTMLAttributes} from 'react';
import './NumberInput.less';

export interface NumberInputProps extends Pick<InputHTMLAttributes<HTMLInputElement>,
    "step" | "min" | "max" | "required" | "value" | "defaultValue"> {
    //值改变时的回调
    onChange?: (data: number) => void;
}

/**
 * 下滑线输入框
 */
class NumberInput extends Component<NumberInputProps> {

    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if (!event.target.checkValidity()) {
            event.target.reportValidity()
            return;
        }
        const {onChange} = this.props;
        onChange && onChange(Number(event.target.value));
    }

    render() {
        const {onChange, ...rest} = this.props;
        return (
            <div className={'number-input-container'}>
                <input type={'number'}
                       {...rest}
                       onChange={this.onChange}
                       className={'number-input'}
                />
                <span className={'number-input-span'}/>
            </div>
        );
    }
}

export default NumberInput;