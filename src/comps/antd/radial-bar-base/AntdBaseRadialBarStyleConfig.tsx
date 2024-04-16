import React from 'react';
import AntdBaseRadialBarController from "./AntdBaseRadialBarController.ts";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../../antd-common/AntdCommonUtil";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {ShapeAttrs} from "@antv/g-base";

export default function AntdBaseRadialBarStyleConfig(props: ConfigType<AntdBaseRadialBarController>) {
    const {controller} = props;
    const config = controller.getConfig()!.style;
    const label = (config?.xAxis as any)?.label;

    const schema: Control[] = [
        {
            type: 'card-panel',
            label: '图形',
            children: [
                {
                    type: 'grid',
                    key: 'style',
                    config: {columns: 2},
                    children: [
                        {
                            type: 'number-input',
                            key: 'radius',
                            label: '外径',
                            config: {
                                min: 0.1,
                                max: 1,
                                step: 0.01
                            },
                            value: config?.radius
                        },
                        {
                            type: 'number-input',
                            key: 'innerRadius',
                            label: '内径',
                            config: {
                                min: 0.1,
                                max: 1,
                                step: 0.01
                            },
                            value: config?.innerRadius
                        },
                        {
                            type: 'number-input',
                            key: 'maxBarWidth',
                            label: '柱宽',
                            config: {
                                min: 0,
                            },
                            value: config?.maxBarWidth
                        },
                        {
                            key: 'barStyle',
                            children: [
                                {
                                    type: 'select',
                                    key: 'lineCap',
                                    label: '圆角',
                                    value: config?.barStyle?.lineCap,
                                    config: {
                                        options: [
                                            {label: '圆角', value: 'round'},
                                            {label: '直角', value: 'butt'},
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            type: 'color-mode',
                            key: 'color',
                            label: '颜色',
                            config: {
                                containerStyle: {
                                    gridColumn: '1/3'
                                }
                            },
                            value: config?.color
                        },
                        {
                            type: 'number-input',
                            key: 'startAngle',
                            label: '起始角度',
                            id: 'startAngle',
                            config: {
                                step: 1,
                                suffix: '°'
                            },
                            value: (config?.startAngle || 0) / Math.PI * 180
                        },
                        {
                            type: 'number-input',
                            key: 'endAngle',
                            label: '起始角度',
                            id: 'startAngle',
                            config: {
                                step: 1,
                                suffix: '°'
                            },
                            value: (config?.endAngle || 0) / Math.PI * 180
                        },
                        {
                            type: 'number-input',
                            key: 'maxAngle',
                            label: '最大旋角',
                            config: {
                                min: -360,
                                max: 360,
                                step: 1,
                                suffix: '°'
                            },
                            value: config?.maxAngle
                        },
                        {
                            type: 'select',
                            key: 'type',
                            label: '图形类型',
                            config: {
                                options: [
                                    {label: '线形', value: 'line'},
                                    {label: '柱形', value: ''},
                                ]
                            },
                            value: config?.type
                        },
                    ]
                }
            ]
        },
        {
            type: 'card-panel',
            label: '文本',
            key: 'style',
            children: [
                {
                    type: 'grid',
                    key: 'xAxis',
                    config: {columns: 2},
                    children: [
                        {
                            key: 'label',
                            children: [
                                {
                                    key: 'rotate',
                                    type: 'number-input',
                                    label: '角度',
                                    value: label.rotate || 0,
                                    config: {
                                        min: 0,
                                        step: 0.1,
                                        max: 360,
                                    }
                                },
                                {
                                    key: 'offset',
                                    type: 'number-input',
                                    label: '偏移',
                                    value: label.offset || 0,
                                },
                                {
                                    key: 'style',
                                    children: [
                                        {
                                            key: 'fontSize',
                                            type: 'number-input',
                                            label: '字号',
                                            value: (label.style as ShapeAttrs)?.fontSize || 12,
                                            config: {
                                                min: 1,
                                                max: 50,
                                            }
                                        },
                                        {
                                            key: 'fontWeight',
                                            type: 'number-input',
                                            label: '粗细',
                                            value: (label.style as ShapeAttrs)?.fontWeight || 500,
                                            config: {
                                                min: 100,
                                                step: 100,
                                                max: 900,
                                            }
                                        },
                                        {
                                            key: 'fill',
                                            type: 'color-picker',
                                            label: '颜色',
                                            value: (label.style as ShapeAttrs)?.fill || '#1c1c1c',
                                            config: {
                                                showText: true,
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        let {dataFragment, data, id} = fieldChangeData;
        if (id === 'startAngle') {
            controller.update({style: {startAngle: data as number / 180 * Math.PI}})
        } else {
            controller.update(dataFragment)
        }
    }
    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    );
}

export const AntdRadialBarFieldMapping: React.FC<ConfigType<AntdBaseRadialBarController>> = ({controller}) => {
    const config = controller.config?.style;
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const schema: Control = {
        type: 'grid',
        key: 'style',
        config: {columns: 2},
        children: [
            {
                type: 'select',
                key: 'xField',
                label: 'x字段',
                value: config?.xField,
                config: {options}
            },
            {
                type: 'select',
                key: 'yField',
                label: 'y字段',
                value: config?.yField,
                config: {options}
            },
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }


    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}
