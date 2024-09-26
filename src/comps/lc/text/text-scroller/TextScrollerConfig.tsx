import React from 'react';
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI";
import {Control} from "../../../../json-schema/SchemaTypes";
import {TextScrollerController} from "./TextScrollerController.ts";
import {ConfigType} from "../../../../designer/right/ConfigContent";

export const TextScrollerConfig: React.FC<ConfigType<TextScrollerController>> = ({controller}) => {

    const config = controller.getConfig()?.style ?? {};

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                key: 'speed',
                type: 'number-input',
                label: '速度',
                value: config.speed,
                config: {
                    min: 1,
                }
            },
            {
                key: 'fontSize',
                type: 'number-input',
                label: '字号',
                value: config.fontSize,
                config: {
                    min: 1,
                    max: 100
                }
            },
            {
                key: 'fontWeight',
                type: 'number-input',
                label: '加粗',
                value: config.fontWeight,
                config: {
                    min: 100,
                    max: 900,
                    step: 100
                }
            },
            {
                key: 'color',
                type: 'color-picker',
                label: '颜色',
                value: config?.color,
                config: {
                    showText: true,
                }
            },
            {
                key: 'fontFamily',
                type: 'select',
                label: '字体',
                value: config.fontFamily,
                config: {
                    options: [
                        {label: '钉钉进步体', value: 'DingTalk JinBuTi'},
                        {label: '抖音美好体', value: 'DouyinSansBold'},
                        {label: '优设标题黑', value: '优设标题黑'},
                        {label: '庞门正道标题', value: '庞门正道标题体免费版'},
                    ],
                }
            }
        ]
    }


    return (
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
    )
}

