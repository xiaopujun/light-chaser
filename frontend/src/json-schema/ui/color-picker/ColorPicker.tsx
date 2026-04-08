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

import {ColorPicker as AntdColorPicker} from 'antd';
import './ColorPicker.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface ColorPickerProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    showText?: boolean;
    disabled?: boolean;
    onChange?: (color: string) => void;
}

export default function ColorPicker(props: ColorPickerProps) {
    const {value, defaultValue, showText, disabled, onChange, ...containerProps} = props;

    const _onChange = (color: any) => {
        const value = color.toHexString();
        onChange && onChange(value);
    };

    return (
        <UIContainer {...containerProps} className={'lc-color-pick'}>
            <AntdColorPicker
                size={'small'}
                format={'hex'}
                disabled={disabled}
                value={value}
                defaultValue={defaultValue}
                showText={showText}
                onChange={_onChange}
            />
        </UIContainer>
    );
}