import React from 'react';
import {AntdCartesianCoordinateSys} from "../config/AntdFragment";
import {LineOptions, ShapeStyle} from "@antv/g2plot";
import AntdCommonLineController from "./AntdCommonLineController";
import AntdCommonUtil from "../AntdCommonUtil";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {ShapeAttrs} from "@antv/g-base";
import {ConfigType} from "../../../designer/right/ConfigContent";
import {AntdBaseDesignerController} from "../AntdBaseDesignerController.ts";


export function AntdLineCommonStyleConfig(props: ConfigType<AntdCommonLineController>) {
    const {controller} = props;
    const config = controller.getConfig()!.style!;

    const lineCoordinateSysChange = (config: LineOptions) => {
        controller.update({style: config});
    }

    return (
        <>
            <AntdLineCommonGraphics controller={controller}/>
            <AntdCartesianCoordinateSys onChange={lineCoordinateSysChange} config={config}/>
        </>
    );
}

export const AntdLineCommonFieldMapping: React.FC<ConfigType<AntdBaseDesignerController>> = ({controller}) => {
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const config = controller.getConfig()?.style;
    const schema: Control = {
        type: 'grid',
        key: 'style',
        children: [
            {
                type: 'select',
                label: 'X字段',
                key: 'xField',
                value: config?.xField,
                config: {
                    options,
                }
            },
            {
                type: 'select',
                label: 'Y字段',
                key: 'yField',
                value: config?.yField,
                config: {
                    options,
                }
            },
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    return <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
}

export function AntdLineCommonGraphics(props: ConfigType<AntdCommonLineController>) {

    const {controller} = props;
    const config = controller.getConfig()?.style;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        type: 'accordion',
        label: '图形',
        key: 'style',
        config: {bodyStyle: {marginTop: 10}},
        children: [
            {
                type: 'sub-accordion',
                label: '线条',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                key: 'smooth',
                                type: 'switch',
                                label: '平滑',
                                tip: '对阶梯图无效',
                                value: config?.smooth,
                            },
                            {
                                key: 'lineStyle',
                                children: [
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '宽度',
                                        value: (config?.lineStyle as ShapeAttrs)?.lineWidth,
                                        config: {
                                            min: 0,
                                            max: 10,
                                        }
                                    }
                                ]
                            },
                            {
                                key: 'color',
                                type: 'color-picker',
                                label: '颜色',
                                value: config?.color,
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
                label: '数据点',
                children: [
                    {
                        key: 'point',
                        type: 'grid',
                        children: [
                            {
                                key: 'size',
                                type: 'number-input',
                                label: '尺寸',
                                value: config?.point?.size,
                                config: {
                                    min: 0,
                                    max: 10,
                                }
                            },
                            {
                                key: 'color',
                                type: 'color-picker',
                                label: '颜色',
                                value: (config?.point as ShapeAttrs)?.color,
                                config: {
                                    showText: true
                                }
                            },
                            {
                                key: 'style',
                                children: [
                                    {
                                        key: 'lineWidth',
                                        type: 'number-input',
                                        label: '描边宽',
                                        value: (config?.point?.style as ShapeStyle)?.lineWidth,
                                        config: {
                                            min: 0
                                        }
                                    },
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '描边色',
                                        value: (config?.point?.style as ShapeStyle)?.stroke,
                                        config: {
                                            showText: true,
                                        }
                                    },
                                ]
                            },
                            {
                                key: 'shape',
                                type: 'select',
                                label: '形状',
                                value: config?.point?.shape,
                                config: {
                                    options: [
                                        {value: 'circle', label: '圈形'},
                                        {value: 'square', label: '方形'},
                                        {value: 'bowtie', label: '领结'},
                                        {value: 'diamond', label: '钻石'},
                                        {value: 'hexagon', label: '六角形'},
                                        {value: 'triangle', label: '三角形'}]
                                }
                            },
                        ]
                    }
                ]
            },
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}
