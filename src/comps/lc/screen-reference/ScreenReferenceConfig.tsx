import React from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {ScreenReferenceController} from "./ScreenReferenceController.ts";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {globalMessage} from "../../../framework/message/GlobalMessage.tsx";
import URLUtil from "../../../utils/URLUtil.ts";

export const ScreenReferenceConfig: React.FC<ConfigType<ScreenReferenceController>> = ({controller}) => {

    const config = controller.getConfig()?.style;
    const {id: projectId} = URLUtil.parseUrlParams();

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment, data} = fieldChangeData;
        if (data === projectId) {
            globalMessage?.messageApi?.error("大屏ID不能引用自身");
            return;
        }
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

