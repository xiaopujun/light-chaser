import React from 'react';
import {FieldChangeData, LCGUI} from "../../../../json-schema/LCGUI";
import {Control} from "../../../../json-schema/SchemaTypes";
import {DigitalFlipperController} from "./DigitalFlipperController";
import {ConfigType} from "../../../../designer/right/ConfigContent";
import {
    AlignBottomTwo,
    AlignHorizontalCenterTwo,
    AlignLeftTwo,
    AlignRightTwo,
    AlignTopTwo,
    AlignVerticalCenterTwo
} from "@icon-park/react";

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
                value: config?.style?.fontFamily,
                config: {
                    options: [
                        {label: '钉钉进步体', value: 'DingTalk JinBuTi'},
                        {label: '抖音美好体', value: 'DouyinSansBold'},
                        {label: '优设标题黑', value: '优设标题黑'},
                        {label: '庞门正道标题', value: '庞门正道标题体免费版'},
                    ],
                }
            },
            {
                type: "grid",
                label: "对齐",
                config: {
                    columns: 2,
                    containerStyle: {
                        gridColumn: '1/3',
                    },
                },
                children: [
                    {
                        type: 'group-button',
                        key: 'justifyContent',
                        value: config?.style?.justifyContent,
                        config: {
                            items: [
                                {
                                    value: 'flex-start',
                                    content: <AlignLeftTwo theme="filled" size="16"
                                                           strokeWidth={2}
                                                           strokeLinecap="square"/>
                                },
                                {
                                    value: 'center',
                                    content: <AlignHorizontalCenterTwo theme="filled" size="16"
                                                                       strokeWidth={2} strokeLinecap="square"/>
                                },
                                {
                                    value: 'flex-end',
                                    content: <AlignRightTwo theme="filled" size="16"
                                                            strokeWidth={2}
                                                            strokeLinecap="square"/>
                                }
                            ]
                        }
                    },
                    {
                        type: 'group-button',
                        key: 'alignItems',
                        value: config?.style?.alignItems,
                        config: {
                            items: [
                                {
                                    value: 'flex-start',
                                    content: <AlignTopTwo theme="filled" size="16"
                                                          strokeWidth={2}
                                                          strokeLinecap="square"/>
                                },
                                {
                                    value: 'center',
                                    content: <AlignVerticalCenterTwo theme="filled" size="16"
                                                                     strokeWidth={2} strokeLinecap="square"/>
                                },
                                {
                                    value: 'flex-end',
                                    content: <AlignBottomTwo theme="filled" size="16"
                                                             strokeWidth={2}
                                                             strokeLinecap="square"/>
                                }
                            ]
                        }
                    }
                ]
            },
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

