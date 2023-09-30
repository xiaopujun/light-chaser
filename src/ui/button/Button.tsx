import React, {Component} from 'react';
import './Button.less';

class Button extends Component<React.ButtonHTMLAttributes<HTMLButtonElement>> {
    render() {
        return (
            <button {...this.props} className="lc-button">{this.props.children}</button>
        );
    }
}

export default Button;