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

import {ReactNode, useState} from "react";
import "./GroupButton.less";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface BtnItemType {
    value: string;
    content: ReactNode | string;
}

export interface GroupButtonProps extends UIContainerProps {
    items: Array<BtnItemType>;
    onChange?: (value: string) => void;
    value?: string;
    defaultValue?: string;
}

export const GroupButton = (props: GroupButtonProps) => {
    const {items, onChange, value, defaultValue, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [data, setData] = useState(controlled ? value : defaultValue);
    const finalValue = controlled ? value : data;

    return (
        <UIContainer {...containerProps} className={'group-button'}>
            <div className={'group-btn-body'}>
                {items.map((item, index) => {
                    const {value, content} = item;
                    return (
                        <div key={index}
                             className={`group-btn-item ${finalValue === value ? 'group-btn-item-active' : ''}`}
                             onClick={(e) => {
                                 e.stopPropagation();
                                 if (!controlled)
                                     setData(value);
                                 onChange && onChange(value);
                             }}>{content}</div>
                    )
                })}
            </div>
        </UIContainer>
    );
}
