import React, {Component} from 'react';
import './style/LcRadialButton.less';

interface LcRadialButtonProps {
    className?: string;
}

class LcRadialButton extends Component<LcRadialButtonProps> {
    render() {
        return (
            <button className={`lc-radial-button ${this.props.className}`}>{this.props.children}</button>
        );
    }
}

export default LcRadialButton;