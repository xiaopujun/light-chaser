import React, {ChangeEvent, Component, InputHTMLAttributes} from 'react';
import './UnderLineInput.less';

interface UnderLineInputProps extends InputHTMLAttributes<HTMLInputElement> {
    containStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    lineStyle?: React.CSSProperties;
    //值改变时的回调
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 下滑线输入框
 */
class UnderLineInput extends Component<UnderLineInputProps> {

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {onChange} = this.props;
        onChange && onChange(e);
    }

    render() {
        const {containStyle, inputStyle, lineStyle, onChange, ...rest} = this.props;
        return (
            <div className={'lc-underline-input-container'} style={containStyle}>
                <input {...rest}
                       onChange={this.onChange}
                       className={'lc-underline-input'}
                       style={inputStyle}/>
                <span className={'lc-underline-span'} style={lineStyle}/>
            </div>
        );
    }
}

export default UnderLineInput;