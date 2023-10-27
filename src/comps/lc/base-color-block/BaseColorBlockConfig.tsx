import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {BaseColorBlock} from "./BaseColorBlock";

export const BaseColorBlockConfig: React.FC<ConfigType<BaseColorBlock>> = ({controller}) => {

    const {background} = controller.getConfig()?.style!;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        config: {columns: 2},
        children: [
            {
                key: 'background',
                type: 'color-picker',
                label: '颜色',
                value: background,
                config: {
                    width: '100%',
                    radius: 3,
                    showBorder: true,
                    showText: true,
                    height: 16,
                    hideControls: true
                }
            }
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

