import React, {Component} from 'react';
import {Select} from "antd";
import './style/LCSelect.less';

interface LcSelectProps {
    onChange?: (data: any) => void;
    value?: string | number | undefined;
}

class LcSelect extends Component<LcSelectProps> {
    render() {
        const {value = '', onChange} = this.props;
        return (
            <div className={'lc-select'}>
                <Select value={value} size={'small'}
                        showArrow={false}
                        onChange={onChange}>
                    {this.props.children}
                </Select>
            </div>
        );
    }
}

export default LcSelect;