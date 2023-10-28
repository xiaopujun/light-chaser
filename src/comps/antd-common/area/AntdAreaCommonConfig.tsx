import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys} from "../config/AntdFragment";
import {Area, AreaOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractController from "../../../framework/core/AbstractController";
import AntdCommonAreaController, {AntdAreaProps} from "./AntdCommonAreaController";
import {WritableAreaOptions} from "../types";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import AntdCommonUtil from "../AntdCommonUtil";
import {AntdLegend} from "../config/legend/AntdLegend";

class AntdAreaCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const controller: AbstractController<Area, AntdAreaProps> = this.props.controller;
        controller.update({style: {legend}});
    }

    areaCoordinateSysChange = (config: AreaOptions) => {
        const controller: AbstractController<Area, AntdAreaProps> = this.props.controller;
        controller.update({style: config});
    }

    areaGraphicsChange = (config: AreaOptions) => {
        const controller: AbstractController<Area, AntdAreaProps> = this.props.controller;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: AreaOptions = controller.getConfig().style;
        return (
            <>
                <AntdCommonAreaGraphics config={config} onChange={this.areaGraphicsChange}/>
                <AntdLegend controller={controller}/>
                <AntdCartesianCoordinateSys onChange={this.areaCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdAreaCommonStyleConfig};


export interface AntdCommonAreaGraphicsProps {
    config?: WritableAreaOptions;

    onChange(config: WritableAreaOptions): void;
}

export const AntdCommonAreaGraphics: React.FC<AntdCommonAreaGraphicsProps> = ({config, onChange}) => {

    // const areaColorChange = (data: ColorModeValue) => {
    //     const {mode, value, angle = 0} = data;
    //     switch (mode) {
    //         case 'single':
    //             onChange({areaStyle: {fill: value as string}});
    //             break;
    //         case 'multi':
    //             onChange({color: value as string[], areaStyle: {fill: undefined}});
    //             break;
    //         case 'gradient':
    //             onChange({areaStyle: {fill: `l(${angle}) 0:${value[0]} 1:${value[1]}`}});
    //             break;
    //     }
    // }
    //
    // const buildColorModeData = (): ColorModeValue => {
    //     let mode, value: string | string[], angle = 0;
    //     if ((config?.areaStyle as ShapeAttrs)?.fill) {
    //         const fill = (config?.areaStyle as ShapeAttrs).fill as string;
    //         if (fill.startsWith('l')) {
    //             mode = 'gradient';
    //             value = [fill.split(':')[1].split(' ')[0], fill.split(':')[2].split(' ')[0]];
    //             angle = parseInt(fill.split('(')[1].split(')')[0]);
    //         } else {
    //             mode = 'single';
    //             value = fill;
    //         }
    //     } else {
    //         mode = 'multi';
    //         value = config?.color as string[] || ['#fff'];
    //     }
    //     return {mode, value, angle};
    // }

    const _onChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        key: 'style',
        type: 'accordion',
        label: '图形',
        children: [
            {
                type: 'item-panel',
                label: '数据点',
                children: [
                    {
                        type: 'grid',
                        config: {
                            columns: 2
                        },
                        children: [
                            {
                                type: 'input',
                                label: '尺寸',
                                value: 1,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 100
                                }
                            },
                            {
                                type: 'select',
                                label: '形状',
                                value: 'circle',
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
            },
            {
                type: 'item-panel',
                label: '数据线',
                children: [
                    {
                        type: 'grid',
                        config: {
                            columns: 2
                        },
                        children: [
                            {
                                type: 'switch',
                                label: '平滑',
                                value: false,
                            },
                            {
                                type: 'input',
                                label: '宽度',
                                value: 0,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 100
                                }
                            },
                        ]
                    }
                ]
            },
            {
                type: 'item-panel',
                label: '数据面',
                children: [
                    {
                        type: 'grid',
                        config: {
                            columns: 2
                        },
                        children: [
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