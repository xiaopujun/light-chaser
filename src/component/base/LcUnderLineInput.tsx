import React, {Component} from 'react';
import './style/LcUnderLineInput.less';

interface LcUnderLineInputProps {
    type?: string;
    containStyle?: any;
    inputStyle?: any;
    lineStyle?: any;
}

/**
 * 下滑线输入框
 */
class LcUnderLineInput extends Component<LcUnderLineInputProps> {
    render() {
        const {type = 'text', containStyle, inputStyle, lineStyle} = this.props;
        return (
            <div className={'lc-underline-input-container'} style={containStyle}>
                <input className={'lc-underline-input'} type={type} style={inputStyle}/>
                <span className={'lc-underline-span'} style={lineStyle}/>
            </div>

        );
    }
}

export default LcUnderLineInput;