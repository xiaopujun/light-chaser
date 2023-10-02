import React, {ChangeEvent, Component, InputHTMLAttributes} from 'react';
import './Input.less';
import {Tooltip} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";

export interface InputProps extends Pick<InputHTMLAttributes<HTMLInputElement>,
    "minLength" | "maxLength" | "required" | "value" | "defaultValue" | "disabled" | "type"> {
    onChange?: (data: string | number) => void;
    label?: string;
    layout?: 'horizontal' | 'vertical';
    tip?: string;
    prefix?: string;
    suffix?: string;
}

/**
 * 下滑线输入框
 */
class Input extends Component<InputProps> {

    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if (!event.target.checkValidity()) {
            event.target.reportValidity()
            return;
        }
        const {onChange, type} = this.props;
        onChange && onChange(type === 'number' ? Number(event.target.value) : event.target.value);
    }

    render() {
        const {onChange, label, prefix, suffix, layout, tip, ...rest} = this.props;
        return (
            <div className={`lc-input-container ${(layout && layout === 'vertical') ?
                'lc-input-layout-vertical' : ''}`}>
                {label &&
                <div className={`lc-input-label ${(layout && layout === 'vertical') ? '' : 'label-layout-horizontal'}`}>
                    {label}
                </div>}
                {tip && <div className={'lc-input-tip'}>
                    <Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;</Tooltip>
                </div>}
                {prefix && <div className={'lc-input-prefix'}>{prefix}&nbsp;</div>}
                <div className={'lc-input-body'}>
                    <input {...rest} onChange={this.onChange} className={'lc-input'}/>
                    <span className={'lc-input-span'}/>
                </div>
                {suffix && <div className={'lc-input-suffix'}>&nbsp;{suffix}</div>}
            </div>
        );
    }
}

export default Input;