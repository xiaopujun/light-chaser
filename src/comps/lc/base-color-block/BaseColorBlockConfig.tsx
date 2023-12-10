import React from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {BaseColorBlockController} from "./BaseColorBlockController";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const BaseColorBlockConfig: React.FC<ConfigType<BaseColorBlockController>> = ({controller}) => {

    const {background, borderWidth, borderColor, borderStyle, borderRadius} = controller.getConfig()?.style!;

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
                label: '背景色',
                value: background,
                config: {
                    width: '100%',
                    radius: 3,
                    showBorder: true,
                    showText: true,
                    height: 16,
                    hideControls: true
                }
            },
            {
                key: 'borderWidth',
                type: 'input',
                label: '边框宽',
                value: borderWidth,
                config: {
                    width: '100%',
                    type: 'number',
                    min: 0,
                    max: 10,
                    step: 1
                }
            },
            {
                key: 'borderColor',
                type: 'color-picker',
                label: '边框色',
                value: borderColor,
                config: {
                    width: '100%',
                    radius: 3,
                    showBorder: true,
                    showText: true,
                    height: 16,
                    hideControls: true
                }
            },
            {
                key: 'borderStyle',
                type: 'select',
                label: '样式',
                value: borderStyle,
                config: {
                    options: [
                        {label: '实线', value: 'solid'},
                        {label: '虚线', value: 'dashed'},
                        {label: '点线', value: 'dotted'},
                        {label: '双线', value: 'double'},
                        {label: '3D凹槽', value: 'groove'},
                        {label: '3D垄状', value: 'ridge'},
                        {label: '3D内嵌', value: 'inset'},
                        {label: '3D外嵌', value: 'outset'},
                        {label: '无边框', value: 'none'},
                    ]
                }
            },
            {
                key: 'borderRadius',
                type: 'input',
                label: '圆角',
                value: borderRadius,
                config: {
                    width: '100%',
                    type: 'number',
                    min: 0,
                }
            },
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

