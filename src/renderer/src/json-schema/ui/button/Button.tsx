import React from 'react';
import {Button as AntdButton, ButtonProps as AntdButtonProps} from 'antd';

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onChange?: () => void;
    type?: AntdButtonProps['type'];
    width?: string | number;
    height?: string | number;
}

export default function Button(props: ButtonProps) {
    const {onChange, onClick, type, width, height, children} = props;

    const _onChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChange && onChange();
        onClick && onClick(e);
    }

    return (
        <AntdButton type={type ?? 'primary'} style={{width: width ?? '100%', height}} onClick={_onChange}
                    className="lc-button">{children}</AntdButton>
    );
}