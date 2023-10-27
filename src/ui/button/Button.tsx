import React, {Component} from 'react';
import './Button.less';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    onChange?: () => void;
}

class Button extends Component<ButtonProps> {

    onChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {onChange, onClick} = this.props;
        onChange && onChange();
        onClick && onClick(e);
    }

    render() {
        return (
            <button {...this.props} onClick={this.onChange} className="lc-button">{this.props.children}</button>
        );
    }
}

export default Button;