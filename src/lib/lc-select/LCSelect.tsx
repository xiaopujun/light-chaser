import React, {Component} from 'react';
import {Select, SelectProps} from "antd";
import './LCSelect.less';

class LcSelect extends Component<SelectProps> {
    render() {
        return (
            <div className={'lc-select'}>
                <Select {...this.props}
                        size={'small'}
                        showArrow={false}>
                    {this.props.children}
                </Select>
            </div>
        );
    }
}

export default LcSelect;