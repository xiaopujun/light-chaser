import React, {Component} from 'react';
import './style/LCNumberInput.less';

interface LCNumberInputProps {
    id?: string;
    onChange?: (data: number, id: string) => void;
    step?: number;
    max?: number;
    min?: number;
}

export default class LCNumberInput extends Component<LCNumberInputProps> {

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e?.target?.value, e?.target?.id);
    }

    render() {
        const {id, step, max, min} = this.props;
        return (
            <div className={'lc-number-input'}>
                <input id={id} onChange={this.onChange} type={'number'} {...{step, max, min}}/>
            </div>
        );
    }
}
