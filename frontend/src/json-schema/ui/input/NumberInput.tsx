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

import {UIContainer, UIContainerProps} from "../ui-container/UIContainer.tsx";
import {InputNumber as AntdNumberInput} from 'antd';

export interface NumberInputProps extends UIContainerProps {
    value?: number;
    defaultValue?: number;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (data: number) => void;
}

export default function NumberInput(props: NumberInputProps) {
    const {
        value, defaultValue, min,
        max, step, disabled, onChange, ...containerProps
    } = props;

    const _onChange = (value: number | null) => {
        if (!value)
            return;
        onChange && onChange(value);
    }

    return (
        <UIContainer {...containerProps} className={'lc-number-input'}>
            <AntdNumberInput
                style={{width: '100%'}}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
                onChange={_onChange}/>
        </UIContainer>
    );
}