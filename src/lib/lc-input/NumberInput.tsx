import React, {Component} from 'react';
import './NumberInput.less';
import {InputNumber, InputNumberProps} from "antd";

class NumberInput extends Component<InputNumberProps> {
    render() {
        return (
            <InputNumber className={'lc-input-number'} {...this.props}/>
        );
    }
}

export default NumberInput;