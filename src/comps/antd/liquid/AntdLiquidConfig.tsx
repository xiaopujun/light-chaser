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

import {ConfigType} from "../../../designer/right/ConfigContent";
import {Control} from "../../../json-schema/SchemaTypes.ts";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI.tsx";
import AntdLiquidController from "./AntdLiquidController.ts";
import {StatisticText} from "@antv/g2plot";
import {ShapeAttrs} from "@antv/g-base";


export default function AntdLiquidConfig(props: ConfigType<AntdLiquidController>) {

    const {controller} = props;
    const config = controller.getConfig()?.style;

    const schema: Control = {
        key: 'style',
        children: [
            {
                type: 'sub-accordion',
                label: '基础样式',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                type: 'select',
                                key: 'shape',
                                label: '形状',
                                value: config?.shape,
                                config: {
                                    options: [
                                        {label: '圆', value: 'circle'},
                                        {label: '钻石', value: 'diamond'},
                                        {label: '三角', value: 'triangle'},
                                        {label: '别针', value: 'pin'},
                                        {label: '矩形', value: 'rect'},
                                    ]
                                }
                            },
                            {
                                type: 'number-input',
                                key: 'radius',
                                label: '半径',
                                value: config?.radius,
                                config: {
                                    min: 0.1,
                                    max: 1,
                                    step: 0.01,
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type: 'sub-accordion',
                label: '水波样式',
                key: 'liquidStyle',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                key: 'fill',
                                type: 'color-picker',
                                label: '颜色',
                                value: (config?.liquidStyle as ShapeAttrs)?.fill,
                                config: {
                                    showText: true
                                }
                            },
                            {
                                key: 'stroke',
                                type: 'color-picker',
                                label: '描边色',
                                value: (config?.liquidStyle as ShapeAttrs)?.stroke,
                                config: {
                                    showText: true
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type: 'sub-accordion',
                label: '图形样式',
                key: 'shapeStyle',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                key: 'fill',
                                type: 'color-picker',
                                label: '颜色',
                                value: (config?.liquidStyle as ShapeAttrs)?.fill,
                                config: {
                                    showText: true
                                }
                            },

                        ]
                    }
                ]
            },
            {
                type: 'sub-accordion',
                label: '外边框',
                key: 'outline',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                key: 'border',
                                type: 'number-input',
                                label: '宽度',
                                value: config?.outline?.border,
                                config: {
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                }
                            },
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: (config?.outline?.style as ShapeAttrs)?.stroke,
                                        config: {
                                            showText: true
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'sub-accordion',
                label: '水波',
                key: 'wave',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                type: 'number-input',
                                key: 'length',
                                label: '长度',
                                value: config?.wave?.length,
                                config: {
                                    min: 10,
                                }
                            },
                            {
                                type: 'number-input',
                                key: 'count',
                                label: '数量',
                                value: config?.wave?.count,
                                config: {
                                    min: 1,
                                    max: 10,
                                }
                            }
                        ]
                    }
                ]
            },
            {
                key: 'statistic',
                type: 'sub-accordion',
                label: '标题',
                children: [
                    {
                        key: 'title',
                        type: 'grid',
                        children: [
                            {
                                key: 'content',
                                type: 'input',
                                label: '内容',
                                value: (config?.statistic?.title as StatisticText)?.content,
                            },
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'fontSize',
                                        type: 'number-input',
                                        label: '字号',
                                        value: ((config?.statistic?.title as StatisticText)?.style as ShapeAttrs)?.fontSize || 12,
                                        config: {
                                            min: 0,
                                            max: 100,
                                        }
                                    },
                                    {
                                        key: 'fontWeight',
                                        type: 'number-input',
                                        label: '加粗',
                                        value: ((config?.statistic?.title as StatisticText)?.style as ShapeAttrs)?.fontWeight || 500,
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
                                        value: ((config?.statistic?.title as StatisticText)?.style as ShapeAttrs)?.color,
                                        config: {
                                            showText: true,
                                        }
                                    }
                                ]
                            },
                            {
                                key: 'offsetX',
                                type: 'number-input',
                                label: 'x偏移',
                                value: (config?.statistic?.title as StatisticText)?.offsetX || 0,
                            },
                            {
                                key: 'offsetY',
                                type: 'number-input',
                                label: 'y偏移',
                                value: (config?.statistic?.title as StatisticText)?.offsetY || 0,
                            },
                        ]
                    }
                ]
            },
            {
                key: 'statistic',
                type: 'sub-accordion',
                label: '内容',
                children: [
                    {
                        key: 'content',
                        type: 'grid',
                        children: [
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'fontSize',
                                        type: 'number-input',
                                        label: '字号',
                                        value: ((config?.statistic?.content as StatisticText)?.style as ShapeAttrs)?.fontSize || 12,
                                        config: {
                                            min: 0,
                                            max: 100,
                                        }
                                    },
                                    {
                                        key: 'fontWeight',
                                        type: 'number-input',
                                        label: '加粗',
                                        value: ((config?.statistic?.content as StatisticText)?.style as ShapeAttrs)?.fontWeight || 500,
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
                                        value: ((config?.statistic?.content as StatisticText)?.style as ShapeAttrs)?.color,
                                        config: {
                                            showText: true,
                                        }
                                    }
                                ]
                            },
                            {
                                key: 'offsetX',
                                type: 'number-input',
                                label: 'x偏移',
                                value: (config?.statistic?.content as StatisticText)?.offsetX || 0,
                            },
                            {
                                key: 'offsetY',
                                type: 'number-input',
                                label: 'y偏移',
                                value: (config?.statistic?.content as StatisticText)?.offsetY || 0,
                            },
                        ]
                    }
                ]
            },
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    return <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>;
}