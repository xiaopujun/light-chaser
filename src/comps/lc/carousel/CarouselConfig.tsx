import React from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {CarouselController} from "./CarouselController.ts";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const CarouselConfig: React.FC<ConfigType<CarouselController>> = ({controller}) => {

    const config = controller.getConfig()?.style!;

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
                type: 'switch',
                key: 'autoplay',
                label: '自动播放',
                value: config.autoplay,
            },
            {
                type: 'number-input',
                key: 'autoplaySpeed',
                label: '播放速度',
                value: config.autoplaySpeed,
            },
            {
                type: 'switch',
                key: 'dots',
                label: '显示按钮',
                value: config.dots,
            },
            {
                type: 'switch',
                key: 'fade',
                label: '淡入淡出',
                value: config.fade,
            },
            {
                type: 'number-input',
                key: 'speed',
                label: '动效速度',
                value: config.speed,
            },
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

