import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigContent";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {BaseTableController} from "./BaseTableController";

export const BaseTableStyleConfig: React.FC<ConfigType<BaseTableController>> = ({controller}) => {

    const {columns, header, body} = controller.getConfig()?.style || {};
    const [, setCount] = React.useState(0);

    const schema: Control = {
        key: 'style',
        children: [
            {
                key: 'header',
                type: 'accordion',
                label: '表头',
                children: [
                    {
                        type: 'grid',
                        config: {
                            columns: 2
                        },
                        children: [
                            {
                                key: 'height',
                                type: 'input',
                                label: '高度',
                                value: header?.height,
                                config: {
                                    type: 'number',
                                    min: 0,
                                }
                            },
                            {
                                key: 'background',
                                type: 'color-picker',
                                label: '背景',
                                value: header?.background,
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
                                key: 'color',
                                type: 'color-picker',
                                label: '字色',
                                value: header?.color,
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
                                key: 'fontSize',
                                type: 'input',
                                label: '字号',
                                value: header?.fontSize,
                                config: {
                                    type: 'number',
                                    min: 0,
                                }
                            },
                            {
                                key: 'fontWeight',
                                type: 'input',
                                label: '加粗',
                                value: header?.fontWeight,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 900,
                                    step: 100
                                }
                            }
                        ]
                    }
                ]
            },
            {
                key: 'body',
                type: 'accordion',
                label: '表体',
                children: [
                    {
                        type: 'grid',
                        config: {
                            columns: 2
                        },
                        children: [
                            {
                                key: 'background',
                                type: 'color-picker',
                                label: '背景',
                                value: body?.background,
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
                                key: 'color',
                                type: 'color-picker',
                                label: '字色',
                                value: body?.color,
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
                                key: 'fontSize',
                                type: 'input',
                                label: '字号',
                                value: body?.fontSize,
                                config: {
                                    type: 'number',
                                    min: 0,
                                }
                            },
                            {
                                key: 'fontWeight',
                                type: 'input',
                                label: '加粗',
                                value: body?.fontWeight,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 900,
                                    step: 100
                                }
                            },
                            {
                                type: 'switch',
                                label: '轮播',
                                key: 'enableCarousel',
                                reRender: true,
                                value: body?.enableCarousel,
                            },
                            {
                                rules: "{enableCarousel}==='true'",
                                type: 'input',
                                label: '速度',
                                key: 'carouselSpeed',
                                value: body?.carouselSpeed,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 100,
                                    step: 0.1
                                }
                            },
                            {
                                type: 'input',
                                label: '页行数',
                                key: 'pageSize',
                                value: body?.pageSize,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 100
                                }
                            },
                        ]
                    }
                ]
            },
            {
                key: 'columns',
                type: 'control-group',
                label: '表格列',
                value: columns,
                config: {
                    itemName: '列',
                    template: {
                        type: 'grid',
                        config: {
                            columns: 2
                        },
                        children: [
                            {
                                key: 'key',
                                type: 'input',
                                label: '列字段名',
                                value: 'newColumn',
                            },
                            {
                                key: 'width',
                                type: 'input',
                                label: '列宽',
                                config: {
                                    type: 'number',
                                    min: 0,
                                }
                            },
                            {
                                key: 'label',
                                type: 'input',
                                label: '列显示名',
                                value: '新建字段',
                            },
                            {
                                key: 'textAlign',
                                type: 'select',
                                label: '对齐',
                                value: 'center',
                                config: {
                                    options: [
                                        {label: '左对齐', value: 'left'},
                                        {label: '居中', value: 'center'},
                                        {label: '右对齐', value: 'right'},
                                    ]
                                }
                            }
                        ]
                    }
                }
            }
        ]
    };

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment, reRender} = fieldChangeData;
        controller.update(dataFragment);
        if (reRender) setCount(count => count + 1);
    }
    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}
