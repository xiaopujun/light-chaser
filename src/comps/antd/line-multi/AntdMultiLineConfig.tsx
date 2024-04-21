import React from "react";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI.tsx";
import {Control} from "../../../json-schema/SchemaTypes.ts";
import {ShapeAttrs} from "@antv/g-base";
import {ConfigType} from "../../../designer/right/ConfigContent.tsx";
import AntdCommonLineController from "../../antd-common/line/AntdCommonLineController.ts";
import {LineOptions, ShapeStyle} from "@antv/g2plot";
import {AntdCartesianCoordinateSys} from "../../antd-common/config/AntdFragment.tsx";
import {AntdLegend} from "../../antd-common/config/legend/AntdLegend.tsx";
import AntdCommonUtil from "../../antd-common/AntdCommonUtil.ts";


export default function AntdMultiLineStyleConfig(props: ConfigType<AntdCommonLineController>) {

    const {controller} = props;
    const config = controller.getConfig()!.style!;

    const lineCoordinateSysChange = (config: LineOptions) => {
        controller.update({style: config});
    }

    return (
        <>
            <AntdMultiLineGraphics controller={controller}/>
            <AntdLegend controller={controller}/>
            <AntdCartesianCoordinateSys onChange={lineCoordinateSysChange} config={config}/>
        </>
    );
}

export const AntdMultiLineGraphics = (props: ConfigType<AntdCommonLineController>) => {

    const {controller} = props;
    const config = controller.getConfig()!.style!;
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
                type: 'card-panel',
                label: '线条',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'smooth',
                                type: 'switch',
                                label: '平滑',
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
                                type: 'color-mode',
                                label: '颜色',
                                value: config?.color,
                                config: {
                                    containerStyle: {
                                        gridColumn: '1/3',
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '数据点',
                children: [
                    {
                        key: 'point',
                        type: 'grid',
                        config: {columns: 2},
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
                                type: 'color-mode',
                                label: '颜色',
                                value: (config?.point as ShapeAttrs)?.color,
                                config: {
                                    containerStyle: {
                                        gridColumn: '1/3',
                                    }
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


export const AntdMultiLineFieldMapping: React.FC<ConfigType<AntdCommonLineController>> = ({controller}) => {
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const {xField, yField, seriesField} = controller.getConfig()?.style!;
    const schema: Control = {
        type: 'grid',
        key: 'style',
        config: {columns: 2},
        children: [
            {
                key: 'xField',
                value: xField,
                type: 'select',
                label: 'X字段',
                config: {
                    options,
                }
            },
            {
                value: yField,
                key: 'yField',
                type: 'select',
                label: 'Y字段',
                config: {
                    options,
                }
            },
            {
                value: seriesField,
                key: 'seriesField',
                type: 'select',
                label: '分组字段',
                config: {
                    options,
                }
            }
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}