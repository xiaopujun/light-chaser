import React from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {HlsPlayerController} from "./HlsPlayerController.ts";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const HlsPlayerConfig: React.FC<ConfigType<HlsPlayerController>> = ({controller}) => {

    const config = controller.getConfig()?.style;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        type: 'grid',
        key: 'style',
        children: [
            {
                type: 'input',
                label: '视频流地址',
                key: 'url',
                value: config?.url,
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

