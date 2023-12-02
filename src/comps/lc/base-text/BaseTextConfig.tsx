import React from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {BaseTextController} from "./BaseTextController";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const BaseTextStyleConfig: React.FC<ConfigType<BaseTextController>> = ({controller}) => {

    const {data, style} = controller.getConfig()!;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment!);
    }

    const schema: Control = {
        type: 'grid',
        config: {columns: 2},
        children: [
            {
                key: 'data',
                children: [
                    {
                        key: 'staticData',
                        children: [
                            {
                                key: 'data',
                                type: 'input',
                                label: '内容',
                                value: data?.staticData?.data,
                            },
                        ]
                    }
                ]
            },
            {
                key: 'style',
                children: [
                    {
                        key: 'fontSize',
                        type: 'input',
                        label: '字号',
                        value: style?.fontSize,
                        config: {
                            type: 'number',
                            min: 1,
                        }
                    },
                    {
                        key: 'fontWeight',
                        type: 'input',
                        label: '粗细',
                        value: style?.fontWeight,
                        config: {
                            type: 'number',
                            min: 100,
                            max: 900,
                            step: 100
                        }
                    },
                    {
                        key: 'color',
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
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}
