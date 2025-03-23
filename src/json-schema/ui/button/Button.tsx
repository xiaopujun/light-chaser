/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

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