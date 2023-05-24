import React, {Component, InputHTMLAttributes} from 'react';
import './LcUnderLineInput.less';

interface LcUnderLineInputProps extends React.InputHTMLAttributes<HTMLInputElement & InputHTMLAttributes<any>> {
    containStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    lineStyle?: React.CSSProperties;
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
        const {containStyle, inputStyle, lineStyle} = this.props;
        return (
            <div className={'lc-underline-input-container'} style={containStyle}>
                <input {...this.props}
                       onChange={this.onChange}
                       className={'lc-underline-input'}
                       style={inputStyle}/>
                <span className={'lc-underline-span'} style={lineStyle}/>
            </div>
        );
    }
}

export default LcUnderLineInput;