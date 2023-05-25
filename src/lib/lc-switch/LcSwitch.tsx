import React, {Component, CSSProperties} from "react";
import "./LcSwitch.less";

interface LcSwitchProps {
    onChange?: (data: boolean) => void;
    containerStyle?: CSSProperties;
    value?: boolean;
}

class LcSwitch extends Component<LcSwitchProps> {

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target;
        const {onChange} = this.props;
        onChange && onChange(checked);
    };

    render() {
        const {containerStyle = {top: 2.5}, value} = this.props;
        return (
            <div className="lc-switch" style={{...containerStyle}}>
                <label className="lc-switch-label">
                    <input checked={value} onChange={this.handleChange} type="checkbox"/>
                    <span/>
                </label>
            </div>
        );
    }
}

export default LcSwitch;