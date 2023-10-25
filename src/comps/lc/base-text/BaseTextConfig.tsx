import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";

export const BaseTextStyleConfig: React.FC<ConfigType> = ({controller}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'grid',
        config: {columns: 2},
        children: [
            {
                type: 'input',
                label: '内容',
                value: '',
            },
            {
                type: 'input',
                label: '字号',
                value: 12,
                config: {
                    type: 'number',
                    min: 0,
                    max: 100,
                }
            },
            {
                type: 'input',
                label: '粗细',
                value: 500,
                config: {
                    type: 'number',
                    min: 100,
                    max: 900,
                    step: 100
                }
            },
            {
                type: 'color-picker',
                label: '颜色',
                value: '#1c1c1c',
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
