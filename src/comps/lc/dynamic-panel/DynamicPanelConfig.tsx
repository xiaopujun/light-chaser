import React from 'react';
import {DynamicPanelController} from "./DynamicPanelController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const DynamicPanelStyleConfig: React.FC<ConfigType<DynamicPanelController>> = ({controller}) => {

    const {src} = (controller as DynamicPanelController).getConfig()?.style ?? {};

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
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
    )
}

