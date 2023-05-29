import React, {Component, CSSProperties} from "react";
import "./LcSwitch.less";

interface LcSwitchProps {
    onChange?: (data: boolean) => void;
    // 容器样式(非受控)
    containerStyle?: CSSProperties;
    // 开关状态值（受控）
    value?: boolean;
    // 开关状态值（非受控）
    defaultValue?: boolean;
    disabled?: boolean;
}

class LcSwitch extends Component<LcSwitchProps> {

    valueControl: boolean = true;

    state: any = {
        value: undefined,
        defaultValue: undefined
    }

    constructor(props: LcSwitchProps) {
        super(props);
        const {value, defaultValue} = this.props;
        if (defaultValue !== undefined && value === undefined)
            this.valueControl = false;
        this.state = {value, defaultValue};
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target;
        const {onChange} = this.props;
        onChange && onChange(checked);
        if (!this.valueControl)
            this.setState({value: checked});
    };

    render() {
        const {containerStyle = {top: 2.5}, disabled = false} = this.props;
        return (
            <div className="lc-switch" style={{...containerStyle}}>
                <label className="lc-switch-label" style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}}>
                    <input disabled={disabled}
                           checked={this.valueControl ? this.props.value : this.state.value}
                           onChange={this.handleChange} type="checkbox"/>
                    <span/>
                </label>
            </div>
        );
    }
}

export default LcSwitch;