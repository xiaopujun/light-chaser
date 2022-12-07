import React, {Component} from 'react';
import './style/LCTextInput.less';

interface LCTextInputProps {
    onChange?: (data: string) => void;
    defaultValue?: string | number;
    readonly?: boolean;
    value?: string;
}

export default class LCTextInput extends Component<LCTextInputProps> {

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e.target.value);
    }

    render() {
        const {value, readonly} = this.props;
        return (
            <input className={'lc-text-input'}
                   value={value || ''}
                   type={'text'}
                   readOnly={readonly || false}
                   onChange={this.onChange}/>
        );
    }
}
