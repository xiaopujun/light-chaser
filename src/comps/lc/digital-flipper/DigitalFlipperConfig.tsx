import React from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {DigitalFlipperController} from "./DigitalFlipperController";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const DigitalFlipperConfig: React.FC<ConfigType<DigitalFlipperController>> = ({controller}) => {

    const config = controller.getConfig();

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        type: 'grid',
        key: 'style',
        config: {columns: 2},
        children: [
            {
                key: 'fontSize',
                type: 'number-input',
                label: '字号',
                value: config?.style?.fontSize,
                config: {min: 0},
            },
            {
                key: 'fontWeight',
                type: 'number-input',
                label: '粗细',
                value: config?.style?.fontWeight,
                config: {min: 0, max: 900, step: 100},
            },
            {
                key: 'color',
                type: 'color-picker',
                label: '颜色',
                value: config?.style?.color,
                config: {showText: true}
            },
            {
                key: 'type',
                type: 'select',
                label: '类型',
                tip: '该设置项效果请刷新预览界面查看',
                value: config?.style?.type,
                config: {
                    options: [
                        {label: '滑动', value: 'slide'},
                        {label: '跳动', value: 'caper'},
                    ]
                }
            },
            {
                key: 'fontFamily',
                type: 'select',
                label: '字体',
                value: '',
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
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

