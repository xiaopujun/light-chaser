import React, {useState} from "react";
import BaseImageController from "./BaseImageController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const BaseImageStyleConfig: React.FC<ConfigType<BaseImageController>> = ({controller}) => {
    const {style} = controller.getConfig()!;
    let {type, onLineUrl, localUrl} = style!;

    const [, setCount] = useState(0);

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment, reRender} = fieldChangeData;
        if (id === 'localUrl') {
            const {hashCode, value} = data as Record<string, any>;
            controller.update({style: {localUrl: value, hashCode}});
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
                id: 'imageType',
                key: 'type',
                type: 'radio',
                label: '来源',
                value: type,
                reRender: true,
                config: {
                    options: [
                        {label: '本地', value: 'local'},
                        {label: '在线', value: 'online'},
                    ]
                }
            },
            {
                key: 'onLineUrl',
                rules: "{type} === 'online'",
                type: 'input',
                label: '链接',
                value: localUrl
            },
            {
                id: 'localUrl',
                key: 'localUrl',
                rules: "{type} === 'local'",
                type: 'image-upload',
                label: '上传',
                value: onLineUrl
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}
