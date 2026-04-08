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
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {CarouselController} from "./CarouselController.ts";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const CarouselConfig: React.FC<ConfigType<CarouselController>> = ({controller}) => {

    const config = controller.getConfig()?.style ?? {};

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                type: 'switch',
                key: 'autoplay',
                label: '自动播放',
                value: config.autoplay,
            },
            {
                type: 'number-input',
                key: 'autoplaySpeed',
                label: '播放速度',
                value: config.autoplaySpeed,
            },
            {
                type: 'switch',
                key: 'dots',
                label: '显示按钮',
                value: config.dots,
            },
            {
                type: 'switch',
                key: 'fade',
                label: '淡入淡出',
                value: config.fade,
            },
            {
                type: 'number-input',
                key: 'speed',
                label: '动效速度',
                value: config.speed,
            },
        ]
    }


    return (
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
    )
}

