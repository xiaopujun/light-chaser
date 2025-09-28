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

import {Slider as AntdSlider} from "antd";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface SliderProps extends UIContainerProps {
    value?: number;
    defaultValue?: number;
    max?: number;
    min?: number;
    step?: number;
    onChange?: (value: number) => void;
}

export const Slider = (props: SliderProps) => {
    const {value, defaultValue, max, min, step, onChange, ...containerProps} = props;
    return (
        <UIContainer {...containerProps} className={'lc-slider'}>
            <AntdSlider max={max} min={min} step={step} defaultValue={defaultValue} value={value}
                        onChange={onChange}/>
        </UIContainer>
    )
}

export interface RangeSliderProps extends UIContainerProps {
    value?: number[];
    defaultValue?: number[];
    max?: number;
    min?: number;
    step?: number;
    onChange?: (value: number[]) => void;
}

export const RangeSlider = (props: RangeSliderProps) => {
    const {value, defaultValue, max, min, step, onChange, ...containerProps} = props;
    return (
        <UIContainer {...containerProps} className={'lc-range-slider'}>
            <AntdSlider max={max} min={min} step={step} defaultValue={defaultValue} value={value} range={true}
                        onChange={onChange}/>
        </UIContainer>
    )
}
