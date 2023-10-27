import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
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
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
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

    // const scatterColorChange = (data: ColorModeValue) => {
    //     const {mode, value} = data;
    //     switch (mode) {
    //         case 'single':
    //             onChange({color: value});
    //             break;
    //         case 'multi':
    //             onChange({color: value as string[]});
    //             break;
    //     }
    // }
    //
    // const buildColorModeData = (): ColorModeValue => {
    //     let mode = 'single', value: string | string[] = '#fff';
    //     if ((config?.color)) {
    //         let multi = Array.isArray(config?.color);
    //         if (multi) {
    //             mode = 'multi';
    //             value = config?.color as string[] || ['#fff'];
    //         } else {
    //             mode = 'single';
    //             value = config?.color as string;
    //         }
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
                        label: '尺寸',
                        value: 5,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 100,
                        }
                    },
                    {
                        type: 'input',
                        label: '线宽',
                        value: 2,
                        config: {
                            type: 'number',
                            min: 0,
                            max: 10,
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
                    },
                    {
                        type: 'color-picker',
                        label: '描边色',
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
        <>
            <LCGUI schema={schema} onFieldChange={onFieldChange}/>
            {/*<Accordion title={'图形'}>*/}
            {/*    <ConfigCard title={'数据点'}>*/}
            {/*        <ConfigItem title={'尺寸'}>*/}
            {/*            <UnderLineInput defaultValue={config?.size as number || 5}*/}
            {/*                            type={'number'} min={0}*/}
            {/*                            onChange={(event) =>*/}
            {/*                                onChange({size: parseInt(event.target.value)})}/>*/}
            {/*        </ConfigItem>*/}
            {/*        <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: 'calc(100% - 38px)'}}>*/}
            {/*            <ColorMode onChange={scatterColorChange} data={buildColorModeData()}*/}
            {/*                       exclude={[ColorModeType.LINER_GRADIENT, ColorModeType.RADIAL_GRADIENT]}/>*/}
            {/*        </ConfigItem>*/}
            {/*        <ConfigItem title={'形状'}>*/}
            {/*            <Select options={[*/}
            {/*                {value: 'circle', label: '圈形'},*/}
            {/*                {value: 'square', label: '方形'},*/}
            {/*                {value: 'bowtie', label: '领结'},*/}
            {/*                {value: 'diamond', label: '钻石'},*/}
            {/*                {value: 'hexagon', label: '六角形'},*/}
            {/*                {value: 'triangle', label: '三角形'}]}*/}
            {/*                    defaultValue={config?.shape as string || 'circle'}*/}
            {/*                    onChange={(value) => onChange({shape: value})}/>*/}
            {/*        </ConfigItem>*/}
            {/*        <ConfigItem title={'描边色'}>*/}
            {/*            <CfgItemBorder width={'100%'}>*/}
            {/*                <BaseColorPicker*/}
            {/*                    defaultValue={(config?.pointStyle as ShapeStyle)?.stroke as string || '#fff'}*/}
            {/*                    style={{width: '100%', height: '15px', borderRadius: 2}}*/}
            {/*                    showText={true}*/}
            {/*                    onChange={(value) =>*/}
            {/*                        onChange({pointStyle: {stroke: value}})}/>*/}
            {/*            </CfgItemBorder>*/}
            {/*        </ConfigItem>*/}
            {/*        <ConfigItem title={'线宽'}>*/}
            {/*            <UnderLineInput defaultValue={(config?.pointStyle as ShapeStyle)?.lineWidth as number || 0}*/}
            {/*                            type={'number'} min={0}*/}
            {/*                            onChange={(event) =>*/}
            {/*                                onChange({pointStyle: {lineWidth: parseInt(event.target.value)}})}/>*/}
            {/*        </ConfigItem>*/}
            {/*    </ConfigCard>*/}
            {/*</Accordion>*/}
        </>
    )
}

export const AntdScatterFieldMapping: React.FC<ConfigType<AntdBaseDesignerController>> = ({controller}) => {
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
                label: '颜色字段',
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
                label: '尺寸字段',
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