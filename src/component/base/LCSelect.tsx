import React, {Component} from 'react';
import {Select} from "antd";
import './style/LCSelect.less';
import {SelectProps} from "rc-select/lib/Select";

class LcSelect extends Component<SelectProps> {
    render() {
        const {value = '', onChange} = this.props;
        return (
            <div className={'lc-select'}>
                <Select value={value}
                        size={'small'}
                        showArrow={false}
                        onChange={onChange}>
                    {this.props.children}
                </Select>
            </div>
        );
    }
}

export default LcSelect;