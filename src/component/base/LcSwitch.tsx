import React, {Component} from 'react';
import './style/LcSwitch.less';

interface LcSwitchProps {
    onChange?: (data: boolean) => void;
}

class LcSwitch extends Component<LcSwitchProps> {

    onChange = (e: any) => {
        let {onChange} = this.props;
        onChange && onChange(e.target.checked);
    }

    render() {
        return (
            <div className="lc-switch">
                <label className="lc-switch-label">
                    <input onChange={this.onChange} type="checkbox"/><span/>
                </label>
            </div>
        );
    }
}

export default LcSwitch;