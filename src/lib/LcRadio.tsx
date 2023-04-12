import React, {Component} from 'react';
import {Radio} from "antd";
import './style/LcRadio.less';
import {RadioGroupProps, RadioProps} from "antd/lib/radio/interface";

class LcRadio extends Component<RadioProps & RadioGroupProps & React.RefAttributes<HTMLElement>> {
    render() {
        return (
            <Radio.Group defaultValue={this.props.defaultValue}
                         onChange={this.props.onChange}
                         style={this.props.style}
                         className={'lc-radio'}>
                {this.props.children}
            </Radio.Group>
        );
    }
}

export default LcRadio;