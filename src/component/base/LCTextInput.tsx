import React, {Component} from 'react';
import './style/LCTextInput.less';

interface LCTextInputProps {
    onChange?: (data: string) => void;
    defaultValue?: string | number;
    readonly?: boolean;
    value?: string;
    width?: number | string;
    height?: number | string;
}

export default class LCTextInput extends Component<LCTextInputProps> {

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e.target.value);
    }

    render() {
        const {value, readonly, width, height} = this.props;
        return (
            <div className={'lc-text-input'} style={{height, width}}>
                <input className={'lc-input'}
                       style={{height, width}}
                       value={value || ''}
                       type={'text'}
                       readOnly={readonly || false}
                       onChange={this.onChange}/>
                <span className="bottom"/>
                <span className="right"/>
                <span className="top"/>
                <span className="left"/>
            </div>

        );
    }
}
