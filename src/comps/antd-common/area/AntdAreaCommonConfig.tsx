import React, {Component} from 'react';
import {AntdCartesianCoordinateSys} from "../config/AntdFragment";
import {Area, AreaOptions, ShapeStyle} from "@antv/g2plot";
import AbstractController from "../../../framework/core/AbstractController";
import AntdCommonAreaController, {AntdAreaProps} from "./AntdCommonAreaController";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import AntdCommonUtil from "../AntdCommonUtil";
import {AntdLegend} from "../config/legend/AntdLegend";
import {ShapeAttrs} from "@antv/g-base";
import {ConfigType} from "../../../designer/right/ConfigContent";

class AntdAreaCommonStyleConfig extends Component<ConfigType<AntdCommonAreaController>> {

    areaCoordinateSysChange = (config: AreaOptions) => {
        const controller: AbstractController<Area, AntdAreaProps> = this.props.controller;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config = controller.getConfig()?.style;
        return (
            <>
                <AntdCommonAreaGraphics controller={controller}/>
                <AntdLegend controller={controller}/>
                <AntdCartesianCoordinateSys onChange={this.areaCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdAreaCommonStyleConfig};

export const AntdCommonAreaGraphics = (props: ConfigType<AntdCommonAreaController>) => {
    const {controller} = props;
    const config = controller.getConfig()?.style;

    const _onChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    const schema: Control = {
        type: 'accordion',
        label: '图形',
        key: 'style',
        config: {
            bodyStyle: {
                marginTop: 10
            }
        },
        children: [
            {
                type: 'card-panel',
                label: '数据点',
                key: 'point',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'size',
                                type: 'number-input',
                                label: '尺寸',
                                value: config?.point?.size || 0,
                                config: {
                                    min: 0,
                                    max: 100
                                }
                            },
                            {
                                key: 'shape',
                                type: 'select',
                                label: '形状',
                                value: config?.point?.shape || 'circle',
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
                                key: 'color',
                                type: 'color-mode',
                                label: '颜色',
                                value: config?.point?.color || '#1c1c1c',
                                config: {
                                    containerStyle: {
                                        gridColumn: '1/3'
                                    }
                                }
                            },
                        ]
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '数据线',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'smooth',
                                type: 'switch',
                                label: '平滑',
                                value: config?.smooth || false,
                            },
                            {
                                key: 'line',
                                children: [
                                    {
                                        key: 'style',
                                        children: [
                                            {
                                                key: 'lineWidth',
                                                type: 'number-input',
                                                label: '宽度',
                                                value: (config?.line?.style as ShapeAttrs)?.lineWidth || 0,
                                                config: {
                                                    min: 0,
                                                    max: 100
                                                }
                                            },
                                        ]
                                    },
                                    {
                                        key: 'color',
                                        type: 'color-mode',
                                        label: '颜色',
                                        value: config?.line?.color as string || '#fff',
                                        config: {
                                            containerStyle: {
                                                gridColumn: '1/3'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'card-panel',
                label: '数据面',
                children: [
                    {
                        type: 'grid',
                        children: [
                            {
                                type: 'color-mode',
                                label: '颜色',
                                key: 'color',
                                value: config?.color || '#1c1c1c',
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={_onChange}/>
    )
}


export const AntdAreaFieldMapping: React.FC<ConfigType<AntdCommonAreaController>> = ({controller}) => {
    const options = AntdCommonUtil.getDataFieldOptions(controller);

    const schema: Control = {
        type: 'grid',
        config: {
            columns: 2,
        },
        children: [
            {
                type: 'select',
                label: 'X字段',
                value: 'country',
                config: {
                    options,
                }
            },
            {
                type: 'select',
                label: 'Y字段',
                config: {
                    options,
                }
            },
            {
                type: 'select',
                label: '分组字段',
                config: {
                    options,
                }
            }
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}

export const AntdAreaCommonFieldMapping: React.FC<ConfigType> = (props) => {
    const {controller} = props;
    const config = controller.config.style;
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const schema: Control = {
        key: 'style',
        type: 'grid',
        config: {columns: 2},
        children: [
            {
                key: 'xField',
                type: 'select',
                label: 'X字段',
                value: config.xField,
                config: {
                    options,
                }
            },
            {
                key: 'yField',
                type: 'select',
                label: 'Y字段',
                value: config.yField,
                config: {
                    options,
                }
            },
            {
                key: 'seriesField',
                type: 'select',
                label: '分组字段',
                value: config.seriesField,
                config: {
                    options,
                }
            }
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        controller.update(fieldChangeData.dataFragment);
    }

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}