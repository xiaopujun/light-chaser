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

import {useState} from 'react';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {Radio as AntdRadio, RadioChangeEvent} from 'antd';

export interface RadioOption {
    label: string;
    value: string;
}

export interface RadioProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    options?: RadioOption[];
    onChange?: (value: string) => void;
}

export default function Radio(props: RadioProps) {
    const {value, defaultValue, disabled, options, onChange, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? value : defaultValue);
    const finalValue = controlled ? value : stateValue;

    const _onChange = (event: RadioChangeEvent) => {
        const value = event.target.value;
        onChange && onChange(value);
        if (!controlled)
            setStateValue(value);
    }

    return (
        <UIContainer {...containerProps} className={'lc-radio'}>
            <AntdRadio.Group value={finalValue} onChange={_onChange} disabled={disabled} size={'small'}>
                {
                    options?.map((option: RadioOption, index: number) => {
                        return <AntdRadio key={index} value={option.value}>{option.label}</AntdRadio>
                    })
                }
            </AntdRadio.Group>
        </UIContainer>
    );
}