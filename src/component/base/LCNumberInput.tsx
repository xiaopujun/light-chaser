import React, {Component, InputHTMLAttributes} from 'react';
import './style/LCNumberInput.less';

export default class LCNumberInput extends Component<React.InputHTMLAttributes<HTMLInputElement & InputHTMLAttributes<any>>> {

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e);
    }

    render() {
        const {style} = this.props;
        return (
            <div className={'lc-number-input'} style={style}>
                <input {...this.props}
                       onChange={this.onChange}
                       type={'number'}/>
                <span className="bottom"/>
                <span className="right"/>
                <span className="top"/>
                <span className="left"/>
            </div>
        );
    }
}
