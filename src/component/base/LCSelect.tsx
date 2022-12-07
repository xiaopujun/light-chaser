import React, {Component} from 'react';
import {Select} from "antd";
import {OptionProps} from "antd/es/mentions";

const {Option} = Select;

interface LcOptionProps extends OptionProps {
    content?: string;
}

interface LcSelectProps {
    onChange?: (data: any) => void;
    value?: string | number | undefined;
    options?: Array<OptionProps>;
}

class LcSelect extends Component<LcSelectProps> {
    render() {
        const {value = '', onChange, options = []} = this.props;
        return (
            <Select value={value} className={'lc-config-item-value lc-select'}
                    onChange={onChange}>
                {options.map((item: LcOptionProps, index: number) => {
                    return <Option key={index + ''} value={item.value}>{item?.content}</Option>
                })}
            </Select>
        );
    }
}

export default LcSelect;