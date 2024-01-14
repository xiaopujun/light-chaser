import React, {Component} from 'react';
import {AntdCartesianCoordinateSys} from "../config/AntdFragment";
import {Scatter, ScatterOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractController from "../../../framework/core/AbstractController";
import AntdCommonScatterController, {AntdScatterProps} from "./AntdCommonScatterController";
import {WritableScatterOptions} from "../types";
import {AntdBaseDesignerController} from "../AntdBaseDesignerController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../AntdCommonUtil";
import {AntdLegend} from "../config/legend/AntdLegend";
import {ShapeAttrs} from "@antv/g-base";
import {ConfigType} from "../../../designer/right/ConfigContent";

class AntdScatterCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const controller = this.props.controller as AntdCommonScatterController;
        controller.update({style: {legend}});
    }

    scatterCoordinateSysChange = (config: ScatterOptions) => {
        const controller = this.props.controller as AntdCommonScatterController;
        controller.update({style: config});
    }

    scatterGraphicsChange = (config: ScatterOptions) => {
        const controller: AbstractController<Scatter, AntdScatterProps> = this.props.controller;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: ScatterOptions = controller.getConfig().style;
        return (
            <>
                <AntdCommonScatterGraphics config={config} onChange={this.scatterGraphicsChange}/>
                <AntdLegend controller={controller}/>
                <AntdCartesianCoordinateSys onChange={this.scatterCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdScatterCommonStyleConfig};


export interface AntdCommonScatterGraphicsProps {
    config?: WritableScatterOptions;

    onChange(config: WritableScatterOptions): void;
}

export const AntdCommonScatterGraphics: React.FC<AntdCommonScatterGraphicsProps> = ({config, onChange}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        onChange(fieldChangeData.dataFragment);
    }

    const schema: Control = {
        type: 'accordion',
        label: '图形',
        children: [
            {
                type: 'grid',
                config: {columns: 2},
                children: [
                    {
                        key: 'size',
                        type: 'number-input',
                        label: '尺寸',
                        value: config?.size,
                        config: {
                            min: 0,
                            max: 100,
                        }
                    },
                    {
                        key: 'shape',
                        type: 'select',
                        label: '形状',
                        value: config?.shape,
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
                        key: 'pointStyle',
                        children: [
                            {
                                key: 'lineWidth',
                                type: 'number-input',
                                label: '线宽',
                                value: (config?.pointStyle as ShapeAttrs)?.lineWidth,
                                config: {
                                    min: 0,
                                    max: 10,
                                }
                            },
                            {
                                key: 'stroke',
                                type: 'color-picker',
                                label: '描边色',
                                value: (config?.pointStyle as ShapeAttrs)?.stroke,
                                config: {
                                    width: '100%',
                                    radius: 3,
                                    showBorder: true,
                                    showText: true,
                                    height: 16,
                                    hideControls: true
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
                            gridColumn: '1/3',
                        }
                    },
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export const AntdScatterFieldMapping: React.FC<ConfigType<AntdBaseDesignerController>> = ({controller}) => {

    const config = controller.getConfig()?.style;

    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const schema: Control = {
        type: 'grid',
        key: 'style',
        config: {columns: 2},
        children: [
            {
                key: 'xField',
                type: 'select',
                label: 'X字段',
                value: config?.xField,
                config: {
                    options,
                }
            },
            {
                key: 'colorField',
                type: 'select',
                label: '颜色字段',
                value: config?.colorField,
                config: {
                    options,
                }
            },
            {
                key: 'yField',
                type: 'select',
                label: 'Y字段',
                value: config?.yField,
                config: {
                    options,
                }
            },
            {
                key: 'sizeField',
                type: 'select',
                label: '尺寸字段',
                value: config?.sizeField,
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