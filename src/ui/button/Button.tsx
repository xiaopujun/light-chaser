import React, {Component} from 'react';
import './Button.less';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    onChange?: () => void;
}

class Button extends Component<ButtonProps> {

    onChange = () => {
        const {onChange} = this.props;
        onChange && onChange();
    }

    render() {
        return (
            <button {...this.props} onClick={this.onChange} className="lc-button">{this.props.children}</button>
        );
    }
}

export default Button;