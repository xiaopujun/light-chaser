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

import React, {useRef} from 'react';
import {AMapController} from "./AMapController.ts";
import {FieldChangeData, LCGUI} from "../../json-schema/LCGUI.tsx";
import {Control} from "../../json-schema/SchemaTypes.ts";
import {ConfigType} from "../../designer/right/ConfigContent.tsx";

export const AMapConfig: React.FC<ConfigType<AMapController>> = ({controller}) => {

    const config = controller.getConfig()?.style;

    const codeRef = useRef<string>(config?.customCode || 'function(container, AMap) {\n\n\n\n\n\n\n\n}');

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment} = fieldChangeData;
        if (id === 'customCode') {
            codeRef.current = data as string;
            return;
        }
        if (id === 'refreshMap')
            controller.update({style: {customCode: codeRef.current}});
        else
            controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                type: 'accordion',
                label: '基础信息',
                children: [
                    {
                        type: "grid",
                        children: [
                            {
                                type: 'input',
                                label: 'KEY',
                                key: 'key',
                                value: config?.key
                            },
                            {
                                type: 'input',
                                label: '密钥',
                                key: 'securityJsCode',
                                value: config?.securityJsCode,
                                config: {
                                    type: "password"
                                }
                            },
                        ]
                    }
                ]
            },
            {
                type: 'accordion',
                label: '自定义地图',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                id: 'customCode',
                                type: 'code-editor',
                                value: codeRef.current,
                                config: {
                                    language: 'javascript',
                                    height: 600,
                                    fullScreen: true
                                }
                            },
                            {
                                type: 'button',
                                id: 'refreshMap',
                                config: {
                                    children: '刷新地图',
                                }
                            }
                        ]
                    },
                ]
            }

        ]
    }


    return (
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
    )
}

