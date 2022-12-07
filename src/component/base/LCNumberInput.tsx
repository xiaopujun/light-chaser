import React, {Component} from 'react';
import './style/LCNumberInput.less';

interface LCNumberInputProps {
    id?: string;
    onChange?: (data: number, id: string) => void;
    step?: number;
    max?: number;
    min?: number;
    width?: number;
    value?: number;
    readonly?: boolean;
}

export default class LCNumberInput extends Component<LCNumberInputProps> {

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e?.target?.value, e?.target?.id);
    }

    render() {
        const {id, step, max, min, width, value, readonly = false} = this.props;
        return (
            <div className={'lc-number-input'} style={{width}}>
                <input id={id}
                       style={{width}}
                       value={value}
                       onChange={this.onChange}
                       readOnly={readonly}
                       type={'number'} {...{
                    step, max, min
                }}
                />
            </div>
        );
    }
}
