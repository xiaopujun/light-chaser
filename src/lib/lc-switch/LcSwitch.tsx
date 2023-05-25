import React, {Component, CSSProperties, PureComponent} from "react";
import "./LcSwitch.less";
import _ from "lodash";

interface LcSwitchProps {
    onChange?: (data: boolean) => void;
    containerStyle?: CSSProperties;
    value?: boolean;
}

class LcSwitch extends Component<LcSwitchProps> {

    shouldComponentUpdate(nextProps: Readonly<LcSwitchProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        let res = !_.isEqual(this.props, nextProps);
        console.log("LcSwitch shouldComponentUpdate", res);
        console.log(this.props, nextProps);
        return res;
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target;
        const {onChange} = this.props;
        onChange && onChange(checked);
    };

    render() {
        const {containerStyle = {top: 2.5}, value} = this.props;
        console.log("LcSwitch render");
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