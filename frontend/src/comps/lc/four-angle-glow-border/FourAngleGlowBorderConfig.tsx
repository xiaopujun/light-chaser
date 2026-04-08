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
import {FourAngleGlowBorderController} from "./FourAngleGlowBorderController";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const FourAngleGlowBorderConfig: React.FC<ConfigType<FourAngleGlowBorderController>> = ({controller}) => {
    const config = controller.getConfig()?.style;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                key: 'width',
                type: 'number-input',
                label: '宽度',
                value: config?.width,
                config: {min: 0, max: 10}
            },
            {
                key: 'length',
                type: 'number-input',
                label: '长度',
                value: config?.length,
                config: {min: 0, max: 100}
            },
            {
                key: 'radius',
                type: 'number-input',
                label: '圆角',
                value: config?.radius,
                config: {min: 0, max: 100}
            },
            {
                key: 'color',
                type: 'color-picker',
                label: '颜色',
                value: config?.color,
                config: {
                    showText: true
                }
            }
        ]
    }

    return (
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
    )
}

