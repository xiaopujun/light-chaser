import React, {Component} from 'react';
import './style/LCTextInput.less';

interface LCTextInputProps {
    onChange?: (data: string) => void;
}

export default class LCTextInput extends Component<LCTextInputProps> {

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e.target.value);
    }

    render() {
        return (
            <input className={'lc-text-input'} type={'text'} onChange={this.onChange}/>
        );
    }
}
