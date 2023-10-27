import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {BaseIframe} from "./BaseIframe";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";

export const BaseIframeStyleConfig: React.FC<ConfigType<BaseIframe>> = ({controller}) => {

    const {src} = (controller as BaseIframe).getConfig()?.style!;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                key: 'src',
                type: 'input',
                label: '地址',
                value: src,
            },
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

