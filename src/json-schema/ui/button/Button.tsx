import React from 'react';
import './Button.less';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    children?: React.ReactNode;
    onChange?: () => void;
}

export default function Button(props: ButtonProps) {
    const {onChange, onClick, ...rest} = props;

    const _onChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChange && onChange();
        onClick && onClick(e);
    }

    return (
        <button {...rest} onClick={_onChange} className="lc-button">{props.children}</button>
    );
}