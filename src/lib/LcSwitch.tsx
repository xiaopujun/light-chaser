import React, {Component, CSSProperties} from 'react';
import './style/LcSwitch.less';

interface LcSwitchProps {
    onChange?: (data: boolean) => void;
    containerStyle?: CSSProperties;
}

class LcSwitch extends Component<LcSwitchProps> {

    onChange = (e: any) => {
        let {onChange} = this.props;
        onChange && onChange(e.target.checked);
    }

    render() {
        const {containerStyle = {top: 2.5}} = this.props;
        return (
            <div className="lc-switch" style={{...containerStyle}}>
                <label className="lc-switch-label">
                    <input onChange={this.onChange} type="checkbox"/><span/>
                </label>
            </div>
        );
    }
}

export default LcSwitch;