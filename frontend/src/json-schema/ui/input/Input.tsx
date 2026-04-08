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

import {ChangeEvent} from 'react';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {Input as AntdInput} from 'antd';


export interface InputProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (data: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}

export default function Input(props: InputProps) {
    const {
        value, defaultValue, onChange, placeholder,
        type, disabled, ...containerProps
    } = props;

    const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event.target.value);
    }

    return (
        <UIContainer {...containerProps}>
            <AntdInput value={value}
                       placeholder={placeholder}
                       type={type}
                       style={{width: '100%', height: 28}}
                       defaultValue={defaultValue}
                       disabled={disabled}
                       className={'lc-input'}
                       onChange={_onChange}/>
        </UIContainer>
    );
}