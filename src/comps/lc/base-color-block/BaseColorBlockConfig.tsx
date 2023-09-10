import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {BaseColorBlock} from "./BaseColorBlock";
import ColorMode, {ColorModeType, ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import ConfigItemTB from "../../../lib/lc-config-item/ConfigItemTB";

export const BaseColorBlockConfig: React.FC<ConfigType> = ({instance}) => {

    const buildColorModeData = (): ColorModeValue => {
        const {background} = (instance as BaseColorBlock).getConfig()?.style!;
        let mode = ColorModeType.SINGLE, value: string[] | string = ["#fff"], angle = 0;
        if (background) {
            if (background.indexOf('linear-gradient') > -1) {
                mode = ColorModeType.LINER_GRADIENT;
                value = [background.match(/#(\w+)/g)?.[0] || '#fff', background.match(/#(\w+)/g)?.[1] || '#fff'];
                angle = Number(background.match(/(\d+)deg/)?.[1]) || 0;
            } else if (background.indexOf('radial-gradient') > -1) {
                mode = ColorModeType.RADIAL_GRADIENT;
                value = [background.match(/#(\w+)/g)?.[0] || '#fff', background.match(/#(\w+)/g)?.[1] || '#fff'];
            } else if (background.indexOf('#') > -1) {
                mode = ColorModeType.SINGLE;
                value = background;
            }
        }
        return {mode, value, angle}
    }

    const colorChange = (data: ColorModeValue) => {
        const {mode, value, angle} = data;
        let background = '';
        switch (mode) {
            case ColorModeType.SINGLE:
                background = value as string;
                break;
            case ColorModeType.LINER_GRADIENT:
                background = `linear-gradient(${angle}deg,${(value as string[]).join(',')})`;
                break;
            case ColorModeType.RADIAL_GRADIENT:
                background = `radial-gradient(${(value as string[]).join(',')})`;
                break;
        }
        instance.update({style: {background}});
    }

    return (
        <>
            <ConfigItemTB title={'颜色'} contentStyle={{width: '100%'}}>
                <ColorMode exclude={[ColorModeType.MULTI]} data={buildColorModeData()} onChange={colorChange}/>
            </ConfigItemTB>
        </>
    )
}

