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

import React, {ChangeEvent, useState} from 'react';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {Input as AntdInput} from 'antd';

const {TextArea: AntdTextArea} = AntdInput;

export interface TextAreaProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (data: string) => void;
}

/**
 * 下滑线输入框
 */
export const TextArea: React.FC<TextAreaProps> = (props) => {
    const {value, defaultValue, ...rest} = props;
    const control = !!value && !defaultValue;
    const [text, setText] = useState(defaultValue);

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.stopPropagation();
        const {onChange} = props;
        onChange && onChange(event.target.value);
        if (!control)
            setText(event.target.value);
    }

    return (
        <UIContainer {...rest}>
            <div className={'lc-text-area-container'}>
                <AntdTextArea value={control ? value : text} onChange={onChange}/>
            </div>
        </UIContainer>
    );
}

export default TextArea;