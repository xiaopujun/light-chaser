import React, {Component} from 'react';
import './style/LcUnderLineInput.less';

interface LcUnderLineInputProps {
    name?: string;
    type?: string;
    value?: string | number;
    containStyle?: any;
    inputStyle?: any;
    lineStyle?: any;
    onChange?: (e: any) => void;
}

/**
 * 下滑线输入框
 */
class LcUnderLineInput extends Component<LcUnderLineInputProps> {

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e);
    }

    render() {
        const {type = 'text', containStyle, inputStyle, lineStyle, name, value} = this.props;
        return (
            <div className={'lc-underline-input-container'} style={containStyle}>
                <input name={name}
                       type={type}
                       value={value}
                       onChange={this.onChange}
                       className={'lc-underline-input'}
                       placeholder={'请输入'}
                       style={inputStyle}/>
                <span className={'lc-underline-span'} style={lineStyle}/>
            </div>

        );
    }
}

export default LcUnderLineInput;