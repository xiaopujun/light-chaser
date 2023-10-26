import React, {Component, useState} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {WritableBarOptions, WritableRoseOptions} from "../types";
import {ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import {RoseOptions, StatisticText} from "@antv/g2plot";
import LcSwitch from "../../../lib/lc-switch/LcSwitch";
import {AntdLegend} from "../config/AntdFragment";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AntdCommonRose from "./AntdCommonRose";
import {Option} from "../../../lib/lc-select/SelectType";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import Select from "../../../lib/lc-select/Select";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";

export default class AntdRoseCommonStyleConfig extends Component<ConfigType> {

    roseGraphicsChange = (config: WritableRoseOptions) => {
        const controller = this.props.controller as AntdCommonRose;
        controller.update({style: config});
    }

    legendChange = (legend: Legend) => {
        const controller = this.props.controller as AntdCommonRose;
        controller.update({style: {legend}});
    }

    render() {
        const controller = this.props.controller as AntdCommonRose;
        const roseConfig = controller.getConfig()!.style as RoseOptions;
        return (
            <>
                <AntdLegend onChange={this.legendChange} config={roseConfig.legend}/>
                <AntdRoseGraphicsConfig onChange={this.roseGraphicsChange} config={roseConfig}/>
            </>
        );
    }
}

export interface AntdRoseGraphicsConfigProps {
    config: RoseOptions;

    onChange(config: WritableRoseOptions): void;
}

export const AntdRoseGraphicsConfig: React.FC<AntdRoseGraphicsConfigProps> = ({config, onChange}) => {

    const RoseColorChange = (data: ColorModeValue) => {
        const {mode, value} = data;
        switch (mode) {
            case 'single':
            case 'multi':
                onChange({color: value});
                break;
            case 'gradient':
                onChange({sectorStyle: {fill: `l(0.4,0.5) 0:${value[0]} 1:${value[1]}`}});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode = 'single', value: string | string[];
        let multi = Array.isArray(config.color) && config.color.length > 1;
        if (multi) {
            mode = 'multi';
            value = config.color as string[];
        } else
            value = config.color as string;
        return {mode, value};
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        children: [
            {
                type: 'accordion',
                label: '图形',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                type: 'input',
                                label: '外径',
                                value: 0.8,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                type: 'input',
                                label: '起始角',
                                value: 0,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 360,
                                }
                            },
                            {
                                type: 'input',
                                label: '内径',
                                value: 0.6,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }
                            },
                            {
                                type: 'input',
                                label: '结束角',
                                value: 360,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 360,
                                }
                            },
                            {
                                type: 'color-picker',
                                label: '颜色',
                                value: '#1c1c1c',
                                config: {
                                    width: '90%',
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
                                    width: '90%',
                                    radius: 3,
                                    showBorder: true,
                                    showText: true,
                                    height: 16,
                                    hideControls: true
                                }
                            },
                            {
                                type: 'input',
                                label: '描边宽',
                                value: 0,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 30,
                                }
                            },
                        ]
                    }
                ]
            },
            {
                type: 'accordion',
                label: '标签',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                type: 'select',
                                label: '位置',
                                value: 'inner',
                                config: {
                                    options: [
                                        {value: 'inner', label: '内测'},
                                        {value: 'outer', label: '外侧'}]
                                }
                            },
                            {
                                type: 'input',
                                label: '偏移',
                                value: 0,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 100,
                                }
                            },
                            {
                                type: 'input',
                                label: '字号',
                                value: 12,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 100,
                                }
                            },
                            {
                                type: 'input',
                                label: '加粗',
                                value: 500,
                                config: {
                                    type: 'number',
                                    min: 100,
                                    max: 900,
                                    step: 100
                                }
                            },
                            {
                                type: 'switch',
                                label: '自动旋转',
                                value: false,
                            },
                            {
                                type: 'input',
                                label: '旋转角度',
                                value: 90,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 360,
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
        ]
    }


    return (
        <>
            <LCGUI schema={schema} onFieldChange={onFieldChange}/>
            {/*<Accordion title={'图形'}>*/}
            {/*    <ConfigItem title={"半径"}>*/}
            {/*        <UnderLineInput type={"number"} min={0} max={1} step={0.01}*/}
            {/*                        defaultValue={config?.radius || 0.9}*/}
            {/*                        onChange={(event) => onChange({radius: parseFloat(event.target.value)})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"内径"}>*/}
            {/*        <UnderLineInput type={"number"} min={0} max={1} step={0.01}*/}
            {/*                        defaultValue={config?.innerRadius || 0}*/}
            {/*                        onChange={(event) => onChange({innerRadius: parseFloat(event.target.value)})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"起始角度"}>*/}
            {/*        <UnderLineInput type={"number"} min={0} max={2} step={0.01}*/}
            {/*                        defaultValue={config?.startAngle || 0}*/}
            {/*                        onChange={(event) => onChange({startAngle: parseFloat(event.target.value) * Math.PI})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"结束角度"}>*/}
            {/*        <UnderLineInput type={"number"} min={0} max={2} step={0.01}*/}
            {/*                        defaultValue={config?.endAngle || 2}*/}
            {/*                        onChange={(event) => onChange({endAngle: parseFloat(event.target.value) * Math.PI})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: '85%'}}>*/}
            {/*        <ColorMode onChange={RoseColorChange} data={buildColorModeData()}*/}
            {/*                   exclude={[ColorModeType.LINER_GRADIENT, ColorModeType.RADIAL_GRADIENT]}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={'描边颜色'}>*/}
            {/*        <CfgItemBorder width={'100%'}>*/}
            {/*            <BaseColorPicker*/}
            {/*                defaultValue={(config?.sectorStyle as ShapeStyle)?.stroke || '#fff'}*/}
            {/*                onChange={(value) => onChange({sectorStyle: {stroke: value}})}*/}
            {/*                style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>*/}
            {/*        </CfgItemBorder>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={'描边宽度'}>*/}
            {/*        <UnderLineInput type={"number"} min={0}*/}
            {/*                        defaultValue={(config?.sectorStyle as ShapeStyle)?.lineWidth || 0}*/}
            {/*                        onChange={(event) => onChange({sectorStyle: {lineWidth: parseInt(event.target.value)}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*</Accordion>*/}
            {/*<Accordion title={"标签"}>*/}
            {/*    <ConfigItem title={'偏移'}>*/}
            {/*        <UnderLineInput type={"number"}*/}
            {/*                        defaultValue={(config?.label as Types.GeometryLabelCfg)?.offset || 0}*/}
            {/*                        onChange={(event) => onChange({label: {offset: parseInt(event.target.value)}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"字号"}>*/}
            {/*        <UnderLineInput type={'number'} min={0}*/}
            {/*                        defaultValue={(config?.label as Types.GeometryLabelCfg)?.style?.fontSize || 12}*/}
            {/*                        onChange={(event) => onChange({label: {style: {fontSize: parseInt(event.target.value)}}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"加粗"}>*/}
            {/*        <UnderLineInput type={'number'} min={100} max={900} step={100}*/}
            {/*                        defaultValue={parseInt((config?.label as Types.GeometryLabelCfg)?.style?.fontWeight || 500)}*/}
            {/*                        onChange={(event) => onChange({label: {style: {fontWeight: parseInt(event.target.value)}}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"自动旋转"}>*/}
            {/*        <LcSwitch defaultValue={!!(config?.label as Types.GeometryLabelCfg)?.autoRotate}*/}
            {/*                  onChange={(value) => onChange({label: {autoRotate: value}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"旋转角度"}>*/}
            {/*        <UnderLineInput type={'number'} min={0} max={2} step={0.01}*/}
            {/*                        defaultValue={(config?.label as Types.GeometryLabelCfg).rotate || 0}*/}
            {/*                        onChange={(event) => onChange({label: {rotate: parseFloat(event.target.value) * Math.PI}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={'颜色'}>*/}
            {/*        <CfgItemBorder width={'100%'}>*/}
            {/*            <BaseColorPicker*/}
            {/*                defaultValue={(config?.label as Types.GeometryLabelCfg)?.style?.fill || '#fff'}*/}
            {/*                onChange={(value) => onChange({label: {style: {fill: value}}})}*/}
            {/*                style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>*/}
            {/*        </CfgItemBorder>*/}
            {/*    </ConfigItem>*/}
            {/*</Accordion>*/}
        </>

    );
}


export interface AntdStatisticTextConfigProps {
    config: StatisticText | false;

    onChange(config: StatisticText | false): void;
}

export const StatisticTextConfig: React.FC<AntdStatisticTextConfigProps> = ({config, onChange}) => {

    const [disEnable, setDisEnable] = useState(!!config);

    return (
        <>
            <ConfigItem title={"开启"}>
                <LcSwitch defaultValue={disEnable}
                          onChange={(value) => {
                              let titleConfig: StatisticText | boolean;
                              if (value) titleConfig = {style: {fontSize: '12px', color: '#fff'}, content: 'text'}
                              else titleConfig = false;
                              onChange(titleConfig)
                              setDisEnable(value)
                          }}/>
            </ConfigItem>
            <ConfigItem title={"内容"}>
                <UnderLineInput defaultValue={(config as StatisticText)?.content || 'text'}
                                disabled={!disEnable}
                                onChange={(event) => onChange({content: event.target.value})}/>
            </ConfigItem>
            <ConfigItem title={"字号"}>
                <UnderLineInput type={'number'} min={10}
                                disabled={!disEnable}
                                defaultValue={parseInt(((config as StatisticText)?.style as any)?.fontSize || '12')}
                                onChange={(event) => onChange({style: {fontSize: event.target.value + 'px'}})}/>
            </ConfigItem>
            <ConfigItem title={"加粗"}>
                <UnderLineInput type={'number'} min={100} max={900} step={100}
                                disabled={!disEnable}
                                defaultValue={parseInt(((config as StatisticText)?.style as any)?.fontWeight || '500')}
                                onChange={(event) => onChange({style: {fontWeight: parseInt(event.target.value)}})}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder width={'100%'}>
                    <BaseColorPicker
                        disabled={!disEnable}
                        defaultValue={((config as StatisticText)?.style as any)?.value || '#fff'}
                        onChange={(value) => onChange({style: {color: value}})}
                        style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
            <ConfigItem title={"x偏移"}>
                <UnderLineInput type={'number'}
                                disabled={!disEnable}
                                defaultValue={(config as StatisticText)?.offsetX || 0}
                                onChange={(event) => onChange({offsetX: parseInt(event.target.value)})}/>
            </ConfigItem>
            <ConfigItem title={"y偏移"}>
                <UnderLineInput type={'number'}
                                disabled={!disEnable}
                                defaultValue={(config as StatisticText)?.offsetY || 0}
                                onChange={(event) => onChange({offsetY: parseInt(event.target.value)})}/>
            </ConfigItem>
        </>
    )
}


export const AntdRoseFieldMapping: React.FC<ConfigType<AntdCommonRose>> = ({controller}) => {
    const config = controller.getConfig()!.style;
    const {data, xField, yField, seriesField} = config!;
    const options: Option[] = [];
    if (data && data.length >= 1) {
        const dataObj = data[0];
        Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
    }

    const fieldChange = (config: WritableBarOptions) => {
        controller.update({style: config});
    }

    return (
        <ConfigCard title={'字段映射'}>
            <ConfigItem title={'X字段'}>
                <Select options={options} defaultValue={xField} onChange={(value => fieldChange({xField: value}))}/>
            </ConfigItem>
            <ConfigItem title={'Y字段'}>
                <Select options={options} defaultValue={yField} onChange={(value => fieldChange({yField: value}))}/>
            </ConfigItem>
            <ConfigItem title={'分类字段'}>
                <Select options={options} defaultValue={seriesField}
                        onChange={(value => fieldChange({seriesField: value}))}/>
            </ConfigItem>
        </ConfigCard>
    )
}
