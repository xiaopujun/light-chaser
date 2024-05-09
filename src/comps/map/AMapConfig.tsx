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
            {
                type: 'card-panel',
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
                id: 'refreshMap',
                config: {
                    children: '刷新地图',
                    style: {
                        width: '100%'
                    }
                }
            }
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

