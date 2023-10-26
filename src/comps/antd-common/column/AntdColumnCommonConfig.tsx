import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Column, ColumnOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractController from "../../../framework/core/AbstractController";
import {AntdColumnProps} from "./AntdCommonColumn";
import {WritableColumnOptions} from "../types";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../AntdCommonUtil";

class AntdColumnCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const controller: AbstractController<Column, AntdColumnProps> = this.props.controller;
        controller.update({style: {legend}});
    }

    barGraphicsChange = (config: ColumnOptions) => {
        const controller: AbstractController<Column, AntdColumnProps> = this.props.controller;
        controller.update({style: config});
    }

    barCoordinateSysChange = (config: ColumnOptions) => {
        const controller: AbstractController<Column, AntdColumnProps> = this.props.controller;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: ColumnOptions = controller.getConfig().style;
        return (
            <>
                <AntdColumnGraphics onChange={this.barGraphicsChange} config={config}/>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.barCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdColumnCommonStyleConfig};


export interface AntdColumnGraphicsProps {
    config?: WritableColumnOptions;

    onChange(config: WritableColumnOptions): void;
}

export const AntdColumnGraphics: React.FC<AntdColumnGraphicsProps> = ({config, onChange}) => {

    // const barColorChange = (data: ColorModeValue) => {
    //     const {mode, value} = data;
    //     switch (mode) {
    //         case 'single':
    //             onChange({columnStyle: {fill: value as string}});
    //             break;
    //         case 'multi':
    //             onChange({color: value, columnStyle: {fill: undefined}});
    //             break;
    //         case 'gradient':
    //             onChange({columnStyle: {fill: `l(0) 0:${value[0]} 1:${value[1]}`}});
    //             break;
    //     }
    // }
    //
    // const buildColorModeData = (): ColorModeValue => {
    //     let mode = 'single', value: string | string[] = '#fff';
    //     if ((config?.columnStyle as ShapeAttrs)?.fill) {
    //         const fill = (config?.columnStyle as ShapeAttrs).fill as string;
    //         if (fill.startsWith('l')) {
    //             mode = 'gradient';
    //             value = [fill.split(':')[1].split(' ')[0], fill.split(':')[2].split(' ')[0]];
    //         } else {
    //             mode = 'single';
    //             value = fill;
    //         }
    //     } else if (config?.color) {
    //         mode = 'multi';
    //         value = config?.color as string[];
    //     }
    //     return {mode, value};
    // }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

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
                        type: 'input',
                        label: '宽度',
                        value: 12,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 100,
                        }
                    },
                    {
                        type: 'color-picker',
                        label: '颜色',
                        value: '#1c1c1c',
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
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )

}


export const AntdColumnCommonFieldMapping: React.FC<ConfigType> = (props) => {
    const {controller} = props;
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