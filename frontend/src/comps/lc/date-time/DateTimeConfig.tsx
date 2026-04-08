/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import React from 'react';
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {DateTimeController} from "./DateTimeController.ts";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {
    AlignBottomTwo,
    AlignHorizontalCenterTwo,
    AlignLeftTwo,
    AlignRightTwo,
    AlignTopTwo,
    AlignVerticalCenterTwo
} from "@icon-park/react";

export const DateTimeConfig: React.FC<ConfigType<DateTimeController>> = ({controller}) => {

    const config = controller.getConfig()?.style ?? {};

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        type: 'grid',
        children: [
            {
                key: 'style',
                children: [
                    {
                        key: 'fontSize',
                        type: 'number-input',
                        label: '字号',
                        value: config?.fontSize,
                        config: {min: 1}
                    },
                    {
                        key: 'fontWeight',
                        type: 'number-input',
                        label: '加粗',
                        value: config?.fontWeight || 400,
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
                        value: config?.fontFamily,
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
                        key: 'letterSpacing',
                        type: 'number-input',
                        label: '字距',
                        value: config?.letterSpacing,
                        config: {
                            step: 0.1
                        }
                    },
                    {
                        type: "select",
                        label: "模板",
                        key: 'formatType',
                        value: config?.formatType,
                        config: {
                            options: [
                                {label: '-', value: '0'},
                                {label: '/', value: '1'},
                                {label: 'CN', value: '2'},
                            ]
                        }
                    },
                    {
                        label: "水平对齐",
                        type: 'group-button',
                        key: 'justifyContent',
                        value: config?.justifyContent,
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
                        label: "垂直对齐",
                        type: 'group-button',
                        key: 'alignItems',
                        value: config?.alignItems,
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
            }
        ]
    }


    return (
        <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
    )
}

