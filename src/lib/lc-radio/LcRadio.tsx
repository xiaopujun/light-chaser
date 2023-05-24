import React, {Component} from 'react';
import {Radio} from "antd";
import './LcRadio.less';
import {RadioGroupProps, RadioProps} from "antd/lib/radio/interface";

class LcRadio extends Component<RadioProps & RadioGroupProps & React.RefAttributes<HTMLElement>> {
    render() {
        return (
            <Radio.Group value={this.props.value}
                         defaultValue={this.props.defaultValue}
                         onChange={this.props.onChange}
                         style={this.props.style}
                         size={'small'}
                         className={'lc-radio'}>
                {this.props.children}
            </Radio.Group>
        );
    }
}

export default LcRadio;