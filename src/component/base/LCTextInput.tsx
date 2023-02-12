import React, {Component} from 'react';
import './style/LCTextInput.less';

export default class LCTextInput extends Component<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e.target.value);
    }

    render() {
        const {readOnly, style} = this.props;
        return (
            <div className={'lc-text-input'} style={{height: style?.height, width: style?.width}}>
                <input className={'lc-input'}
                       style={style}
                       defaultValue={this.props.defaultValue}
                       type={'text'}
                       readOnly={readOnly || false}
                       onChange={this.onChange}/>
                <span className="bottom"/>
                <span className="right"/>
                <span className="top"/>
                <span className="left"/>
            </div>

        );
    }
}
