import React, {Component, CSSProperties} from 'react';
import './LcSwitch.less';

interface LcSwitchProps {
    onChange?: (data: boolean) => void;
    containerStyle?: CSSProperties;
    value?: boolean;
}

class LcSwitch extends Component<LcSwitchProps> {

    state: any = {
        value: false
    }

    constructor(props: LcSwitchProps) {
        super(props);
        const {value = false} = this.props;
        this.state = {value};
    }

    onChange = (e: any) => {
        const {onChange} = this.props;
        onChange && onChange(e.target.checked);
        this.setState({value: e.target.checked});
    }

    render() {
        const {containerStyle = {top: 2.5}} = this.props;
        const {value} = this.state;
        return (
            <div className="lc-switch" style={{...containerStyle}}>
                <label className="lc-switch-label">
                    <input checked={value} onChange={this.onChange} type="checkbox"/><span/>
                </label>
            </div>
        );
    }
}

export default LcSwitch;