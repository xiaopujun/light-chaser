import React from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {ScreenReferenceController} from "./ScreenReferenceController.ts";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const ScreenReferenceConfig: React.FC<ConfigType<ScreenReferenceController>> = ({controller}) => {

    const config = controller.getConfig()?.style;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        type: "grid",
        key: "style",
        children: [
            {
                key: "screenId",
                type: "input",
                label: "大屏ID",
                value: config?.screenId,
            }
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

