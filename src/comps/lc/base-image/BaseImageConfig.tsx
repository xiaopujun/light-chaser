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

import React, {useState} from "react";
import BaseImageController from "./BaseImageController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const BaseImageStyleConfig: React.FC<ConfigType<BaseImageController>> = ({controller}) => {
    const {style} = controller.getConfig()!;
    const {type, onLineUrl, localUrl, opacity} = style!;

    const [, setCount] = useState(0);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment, reRender} = fieldChangeData;
        if (id === 'localUrl') {
            const {hash, url} = data as Record<string, any>;
            controller.update({style: {localUrl: url, hash}});
        } else {
            controller.update(dataFragment);
        }
        if (reRender)
            setCount(count => count + 1);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                key: 'type',
                type: 'radio',
                label: '来源',
                value: type,
                reRender: true,
                config: {
                    options: [
                        {label: '本地', value: 'local'},
                        {label: '在线', value: 'online'},
                    ],
                }
            },
            {
                key: 'onLineUrl',
                rules: "{type} === 'online'",
                type: 'input',
                label: '链接',
                value: onLineUrl,
            },
            {
                id: 'localUrl',
                key: 'localUrl',
                rules: "{type} === 'local'",
                type: 'image-upload',
                label: '上传',
                value: localUrl,
                config: {
                    accept: 'image/*',
                    size: 3,
                }
            },
            {
                key: 'opacity',
                type: 'number-input',
                label: '透明度',
                value: opacity,
                config: {
                    min: 0,
                    max: 1,
                    step: 0.1
                }
            }
        ]
    }

    return (
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
    )
}
