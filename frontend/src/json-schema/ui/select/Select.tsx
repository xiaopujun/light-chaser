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

import React from "react";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import {Select as AntdSelect} from 'antd';

export interface ISelectOption {
    label: string;
    value: string;
}

interface SelectProps extends UIContainerProps {
    // 选中的值（受控）
    value?: string;
    // 默认选中的值（非受控）
    defaultValue?: string;
    // 选项列表（非受控）
    options: ISelectOption[];
    disabled?: boolean;
    // 占位符（非受控）
    placeholder?: string;
    // 选中值改变时的回调
    onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = (props) => {
    const {value, defaultValue, options, disabled = false, placeholder = "请选择", onChange, ...containerProps} = props;

    return (
        <UIContainer {...containerProps} className="lc-select">
            <AntdSelect value={value} defaultValue={defaultValue} options={options} disabled={disabled}
                        placeholder={placeholder}
                        style={{width: "100%"}}
                        onChange={onChange}/>
        </UIContainer>
    );
};
export default Select;