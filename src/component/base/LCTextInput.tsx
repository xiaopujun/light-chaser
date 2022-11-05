import React, {Component} from 'react';
import './style/LCTextInput.less';

interface LCTextInputProps {
    onChange?: (data: string) => void;
    defaultValue?: string | number;
}

export default class LCTextInput extends Component<LCTextInputProps> {

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e.target.value);
    }

    render() {
        return (
            <input className={'lc-text-input'} defaultValue={this.props.defaultValue} type={'text'}
                   onChange={this.onChange}/>
        );
    }
}
