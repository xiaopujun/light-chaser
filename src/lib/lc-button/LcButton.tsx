import React, {Component} from 'react';
import './LcButton.less';

class LcButton extends Component<React.ButtonHTMLAttributes<HTMLButtonElement>> {
    render() {
        return (
            <button {...this.props} className="lc-button">{this.props.children}</button>
        );
    }
}

export default LcButton;