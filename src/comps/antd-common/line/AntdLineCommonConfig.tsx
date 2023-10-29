import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys} from "../config/AntdFragment";
import {LineOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AntdCommonLineController from "./AntdCommonLineController";
import AntdCommonUtil from "../AntdCommonUtil";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {AntdLegend} from "../config/legend/AntdLegend";
import {WritableLineOptions} from "../types";
import {ShapeAttrs} from "@antv/g-base";

class AntdLineCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const controller = this.props.controller as AntdCommonLineController;
        controller.update({style: {legend}});
    }

    lineCoordinateSysChange = (config: LineOptions) => {
        const controller = this.props.controller as AntdCommonLineController;
        controller.update({style: config});
    }

    lineGraphicsChange = (config: LineOptions) => {
        const controller = this.props.controller as AntdCommonLineController;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: LineOptions = controller.getConfig().style;
        return (
            <>
                <AntdLineCommonGraphics onChange={this.lineGraphicsChange} config={config}/>
                <AntdLegend controller={controller}/>
                <AntdCartesianCoordinateSys onChange={this.lineCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdLineCommonStyleConfig};


export const AntdLineFieldMapping: React.FC<ConfigType<AntdCommonLineController>> = ({controller}) => {
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


export interface AntdLineCommonGraphicsProps {
    config?: WritableLineOptions;

    onChange(config: WritableLineOptions): void;
}

export const AntdLineCommonGraphics: React.FC<AntdLineCommonGraphicsProps> = ({config, onChange}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        onChange(dataFragment);
    }

    const schema: Control = {
        type: 'accordion',
        label: '图形',
        children: [
            {
                type: 'item-panel',
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
                                        type: 'input',
                                        label: '宽度',
                                        value: (config?.lineStyle as ShapeAttrs)?.lineWidth,
                                        config: {
                                            type: 'number',
                                            min: 0,
                                            max: 10,
                                        }
                                    },
                                    {
                                        key: 'stroke',
                                        type: 'color-picker',
                                        label: '颜色',
                                        value: (config?.lineStyle as ShapeAttrs)?.stroke,
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
                        ]
                    }
                ]
            },
            {
                type: 'item-panel',
                label: '数据点',
                children: [
                    {
                        key: 'point',
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'size',
                                type: 'input',
                                label: '尺寸',
                                value: config?.point?.size,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 10,
                                }
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
                            {
                                key: 'color',
                                type: 'color-picker',
                                label: '颜色',
                                value: (config?.point as ShapeAttrs)?.color,
                                config: {
                                    width: '100%',
                                    radius: 3,
                                    showBorder: true,
                                    showText: true,
                                    height: 16,
                                    hideControls: true
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