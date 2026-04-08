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

import AbstractDesignerController from "../../../../framework/core/AbstractDesignerController.ts";
import {useRef} from "react";
import ObjectUtil from "../../../../utils/ObjectUtil.ts";
import {globalMessage} from "../../../../framework/message/GlobalMessage.tsx";
import {Control} from "../../../../json-schema/SchemaTypes.ts";
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI.tsx";

export interface StaticDataConfigProps {
    controller: AbstractDesignerController;
    data: any;
}

export function StaticDataConfig(props: StaticDataConfigProps) {
    const {data, controller} = props;
    const dataRef = useRef(data);
    const flashStaticData = () => {
        if (typeof dataRef.current === 'string') {
            const finalData = ObjectUtil.stringToJsObj(dataRef.current)
            if (!finalData)
                globalMessage.messageApi?.error('格式错误，请检查');
            else {
                controller.update({data: {staticData: finalData}}, {reRender: false});
                controller.changeData(finalData)
            }
        }
    }

    const schema: Control = {
        type: 'grid',
        config: {gridGap: '10px'},
        children: [
            {
                type: 'code-editor',
                config: {
                    height: 500,
                },
                value: JSON.stringify(dataRef.current, null, 2) || '',
            },
            {
                id: 'doStaticSave',
                type: 'button',
                config: {
                    children: '保存并刷新数据',
                }
            }
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data} = fieldChangeData;
        if (id === 'doStaticSave')
            flashStaticData();
        else {
            dataRef.current = data;
        }
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
}