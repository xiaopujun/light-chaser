import React, {Component} from 'react';
import {AntdCartesianCoordinateSys} from "../config/AntdFragment";
import {Column, ColumnOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractController from "../../../framework/core/AbstractController";
import {AntdColumnProps} from "./AntdCommonColumnController";
import {WritableColumnOptions} from "../types";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../AntdCommonUtil";
import {AntdLegend} from "../config/legend/AntdLegend";
import {ConfigType} from "../../../designer/right/ConfigContent";

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
                <AntdLegend controller={controller}/>
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

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {id, data, dataFragment} = fieldChangeData;
        if (id === 'columnColor') {
            if (data && Array.isArray(data)) {
                //多色
                onChange({color: data as string[], columnStyle: {fill: undefined}})
            } else if (data && typeof data === 'string' && data.indexOf('gradient') !== -1) {
                //渐变
            } else {
                //单色
                onChange({columnStyle: {fill: data as string}})
            }
        } else {
            onChange(dataFragment);
        }
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
                        key: 'maxColumnWidth',
                        type: 'number-input',
                        label: '宽度',
                        value: 12,
                        config: {
                            min: 0,
                            max: 100,
                        }
                    },

                ]
            },
            {
                type: 'grid',
                children: [
                    {
                        id: 'columnColor',
                        type: 'color-mode',
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
    const {xField, yField, seriesField} = controller.getConfig().style;
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
                value: xField,
                config: {
                    options,
                }
            },
            {
                key: 'yField',
                type: 'select',
                label: 'Y字段',
                value: yField,
                config: {
                    options,
                }
            },
            {
                key: 'seriesField',
                type: 'select',
                label: '分组字段',
                value: seriesField,
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