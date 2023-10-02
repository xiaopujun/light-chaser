import React, {Component} from "react";
import "./Switch.less";
import {Tooltip} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";

interface SwitchProps {
    onChange?: (data: boolean) => void;
    // 开关状态值（受控）
    value?: boolean;
    // 开关状态值（非受控）
    defaultValue?: boolean;
    disabled?: boolean;
    label?: string;
    tip?: string;
}

class Switch extends Component<SwitchProps> {

    valueControl: boolean = true;

    state: any = {
        value: false,
    }

    constructor(props: SwitchProps) {
        super(props);
        const {value, defaultValue} = this.props;
        if (defaultValue !== undefined && value === undefined)
            this.valueControl = false;
        this.state = {value: value || defaultValue || false};
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target;
        const {onChange} = this.props;
        onChange && onChange(checked);
        if (!this.valueControl)
            this.setState({value: checked});
    };

    render() {
        const {disabled = false, tip, label} = this.props;
        return (
            <div className="lc-switch-container">
                {label && <div className={'lc-switch-label'}>{label}</div>}
                {tip && <div className={'lc-switch-tip'}>
                    <Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;</Tooltip>
                </div>}
                <label className="lc-switch-body">
                    <input disabled={disabled}
                           checked={this.valueControl ? this.props.value || false : this.state.value || false}
                           onChange={this.handleChange} type="checkbox"/>
                    <span/>
                </label>
            </div>
        );
    }
}

export default Switch;