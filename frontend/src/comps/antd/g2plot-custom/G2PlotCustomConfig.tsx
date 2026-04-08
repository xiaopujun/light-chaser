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

import {useRef} from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {AMapController} from "../../map/AMapController.ts";


export default function G2PlotCustomConfig(props: ConfigType<AMapController>) {
    const {controller} = props;
    const config = controller.getConfig()?.style;

    const codeRef = useRef<string>(config?.customCode || '');

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment} = fieldChangeData;
        if (id === 'customCode') {
            codeRef.current = data as string;
            return;
        }
        if (id === 'refreshChart')
            controller.update({style: {customCode: codeRef.current}});
        else
            controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                type: 'card-panel',
                label: 'G2Plot代码',
                tip: '请参考G2Plot官方文档复制粘贴并调试代码',
                config: {
                    contentStyle: {
                        padding: 0
                    }
                },
                children: [
                    {
                        id: 'customCode',
                        type: 'code-editor',
                        value: codeRef.current,
                        config: {
                            language: 'javascript',
                            height: 600
                        }
                    }
                ]
            },
            {
                type: 'button',
                id: 'refreshChart',
                config: {
                    children: '刷新图表',
                }
            }
        ]
    }


    return (
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
    )
}
