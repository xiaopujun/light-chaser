import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";

export const BaseColorBlockConfig: React.FC<ConfigType> = ({controller}) => {

    // const buildColorModeData = (): ColorModeValue => {
    //     const {background} = (controller as BaseColorBlock).getConfig()?.style!;
    //     let mode = ColorModeType.SINGLE, value: string[] | string = ["#fff"], angle = 0;
    //     if (background) {
    //         if (background.indexOf('linear-gradient') > -1) {
    //             mode = ColorModeType.LINER_GRADIENT;
    //             value = [background.match(/#(\w+)/g)?.[0] || '#fff', background.match(/#(\w+)/g)?.[1] || '#fff'];
    //             angle = Number(background.match(/(\d+)deg/)?.[1]) || 0;
    //         } else if (background.indexOf('radial-gradient') > -1) {
    //             mode = ColorModeType.RADIAL_GRADIENT;
    //             value = [background.match(/#(\w+)/g)?.[0] || '#fff', background.match(/#(\w+)/g)?.[1] || '#fff'];
    //         } else if (background.indexOf('#') > -1) {
    //             mode = ColorModeType.SINGLE;
    //             value = background;
    //         }
    //     }
    //     return {mode, value, angle}
    // }
    //
    // const colorChange = (data: ColorModeValue) => {
    //     const {mode, value, angle} = data;
    //     let background = '';
    //     switch (mode) {
    //         case ColorModeType.SINGLE:
    //             background = value as string;
    //             break;
    //         case ColorModeType.LINER_GRADIENT:
    //             background = `linear-gradient(${angle}deg,${(value as string[]).join(',')})`;
    //             break;
    //         case ColorModeType.RADIAL_GRADIENT:
    //             background = `radial-gradient(${(value as string[]).join(',')})`;
    //             break;
    //     }
    //     controller.update({style: {background}});
    // }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'grid',
        config: {columns: 2},
        children: [
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

