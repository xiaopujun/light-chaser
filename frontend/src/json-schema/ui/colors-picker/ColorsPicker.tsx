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

import {useRef, useState} from 'react';
import './ColorsPicker.less';
import ColorPicker from "../color-picker/ColorPicker";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface ColorsPickerProp extends UIContainerProps {
    value?: string[];
    defaultValue?: string[];
    canAdd?: boolean;
    onChange?: (data: string[]) => void;
}

export default function ColorsPicker(props: ColorsPickerProp) {
    const {value, defaultValue, canAdd, onChange, ...containerProps} = props;
    const controlled = value !== undefined && defaultValue === undefined;
    const [stateValue, setStateValue] = useState(controlled ? value : defaultValue);
    const [stateCanAdd, setStateCanAdd] = useState(!!canAdd);
    const finalValue = controlled ? value : stateValue;
    const maxRef = useRef<number>(5);

    const _onChange = (color: string, id: number) => {
        const tempValue = [...finalValue!];
        tempValue[id] = color;
        onChange && onChange(tempValue);
        if (!controlled)
            setStateValue(tempValue);
    }

    const addColor = () => {
        const tempValue = [...finalValue!];
        if (tempValue?.length >= maxRef.current)
            return;
        tempValue.push('#a9a9a9');
        if (tempValue.length === maxRef.current)
            setStateCanAdd(false);
        setStateValue(tempValue);
        onChange && onChange(tempValue);
    }

    const delColor = (id: number) => {
        const tempValue = [...finalValue!];
        tempValue.splice(id, 1);
        if (tempValue.length < maxRef.current)
            setStateCanAdd(true);
        setStateValue(tempValue);
        onChange && onChange(tempValue);
    }

    return (
        <UIContainer {...containerProps}>
            <div className={'colors-picker'}>
                {finalValue?.map((item: string, i: number) => {
                    return (
                        <div className={"colors-item"} key={i + ''}>
                            <ColorPicker value={item} onChange={(color: string) => _onChange(color, i)}/>
                            <span onClick={() => delColor(i)}><label>×</label></span>
                        </div>
                    )
                })}
                {stateCanAdd &&
                    <div onClick={addColor} className={'colors-pick-add-btn'}><div className="add-icon">+</div></div>}            </div>
        </UIContainer>
    )
}