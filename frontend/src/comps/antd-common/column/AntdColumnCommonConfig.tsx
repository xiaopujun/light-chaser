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

import React, {Component} from 'react';
import {AntdCartesianCoordinateSys} from "../config/AntdFragment";
import {Column, ColumnOptions} from "@antv/g2plot";
import AbstractController from "../../../framework/core/AbstractController";
import {AntdColumnProps} from "./AntdCommonColumnController";
import {WritableColumnOptions} from "../types";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../AntdCommonUtil";
import {AntdLegend} from "../config/legend/AntdLegend";
import {ConfigType} from "../../../designer/right/ConfigContent";

class AntdColumnCommonStyleConfig extends Component<ConfigType> {

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
                    {
                        key: 'columnStyle',
                        children: [
                            {
                                key: 'radius',
                                type: 'number-input',
                                label: '圆角',
                                value: (config?.columnStyle as any)?.radius,
                                config: {
                                    min: 1,
                                    max: 100,
                                }
                            }
                        ]

                    },
                    {
                        id: 'columnColor',
                        type: 'color-mode',
                        label: '颜色',
                        value: '#1c1c1c',
                    }
                ]
            },
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

    return <div style={{padding: 10}}><LCGUI schema={schema} onFieldChange={onFieldChange}/></div>
}