import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {WritableRingProgressOptions, WritableRoseOptions} from "../../antd-common/types";
import AntdCommonRose from "../../antd-common/rose/AntdCommonRose";
import {RingProgressOptions} from "@antv/g2plot";
import {ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";

export class AntdRingProgressStyleConfig extends Component<ConfigType> {

    ringProgressGraphicsChange = (config: WritableRoseOptions) => {
        const controller = this.props.controller as AntdCommonRose;
        controller.update({style: config});
    }


    render() {
        const {controller} = this.props;
        const config: RingProgressOptions = controller.getConfig().style as RingProgressOptions
        return (
            <>
                <AntdRingProgressGraphicsConfig config={config}
                                                onChange={this.ringProgressGraphicsChange}/>
            </>
        );
    }
}


export interface AntdRingProgressGraphicsConfigProps {
    config: RingProgressOptions;

    onChange(config: WritableRingProgressOptions): void;
}

export const AntdRingProgressGraphicsConfig: React.FC<AntdRingProgressGraphicsConfigProps> = ({config, onChange}) => {

    const ringProgressColorChange = (data: ColorModeValue) => {
        const {mode, value} = data;
        switch (mode) {
            case 'single':
            case 'multi':
                onChange({color: value, progressStyle: {fill: undefined}});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode = 'multi', value: string | string[];
        let multi = Array.isArray(config.color) && config.color.length > 1;
        if (multi) {
            value = config.color as string[];
        } else
            value = ['#00c4ff', '#fff']
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
                                    max: 0.01,
                                    step: 0.01
                                }
                            },
                            {
                                type: 'input',
                                label: '内径',
                                value: 0.6,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 0.01,
                                    step: 0.01
                                }
                            },
                            {
                                type: 'input',
                                label: '描边',
                                value: 1,
                                config: {
                                    type: 'number',
                                    min: 0,
                                    max: 10,
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

                        ]
                    }
                ]
            },
            {
                type: 'accordion',
                label: '标题',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                type: 'switch',
                                label: '开启',
                                value: false,
                            },
                            {
                                type: 'input',
                                label: '内容',
                                value: '',
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
                                type: 'input',
                                label: 'x偏移',
                                config: {
                                    type: 'number',
                                }
                            },
                            {
                                type: 'input',
                                label: 'y偏移',
                                value: 0.33,
                                config: {
                                    type: 'number',
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
                type: 'accordion',
                label: '内容',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                type: 'switch',
                                label: '开启',
                                value: false,
                            },
                            {
                                type: 'input',
                                label: '内容',
                                value: '',
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
                                type: 'input',
                                label: 'x偏移',
                                config: {
                                    type: 'number',
                                }
                            },
                            {
                                type: 'input',
                                label: 'y偏移',
                                value: 0.33,
                                config: {
                                    type: 'number',
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
            {/*    <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: '85%'}}>*/}
            {/*        <ColorMode onChange={ringProgressColorChange} data={buildColorModeData()}*/}
            {/*                   exclude={[ColorModeType.LINER_GRADIENT, ColorModeType.RADIAL_GRADIENT, ColorModeType.SINGLE]}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={'描边颜色'}>*/}
            {/*        <CfgItemBorder width={'100%'}>*/}
            {/*            <BaseColorPicker*/}
            {/*                defaultValue={(config?.progressStyle as ShapeStyle)?.stroke || '#fff'}*/}
            {/*                onChange={(value) => onChange({progressStyle: {stroke: value}})}*/}
            {/*                style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>*/}
            {/*        </CfgItemBorder>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={'描边宽度'}>*/}
            {/*        <UnderLineInput type={"number"} min={0}*/}
            {/*                        defaultValue={(config?.progressStyle as ShapeStyle)?.lineWidth || 0}*/}
            {/*                        onChange={(event) => onChange({progressStyle: {lineWidth: parseInt(event.target.value)}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*</Accordion>*/}
            {/*<Accordion title={'标题'}>*/}
            {/*    <StatisticTextConfig config={config?.statistic?.title || false}*/}
            {/*                         onChange={(config) => onChange({statistic: {title: config}})}/>*/}
            {/*</Accordion>*/}
            {/*<Accordion title={'内容'}>*/}
            {/*    <ConfigItem title={"字号"}>*/}
            {/*        <UnderLineInput type={'number'} min={10}*/}
            {/*                        defaultValue={parseInt(((config?.statistic?.content as StatisticText)?.style as any)?.fontSize || '12')}*/}
            {/*                        onChange={(event) => onChange({statistic: {content: {style: {fontSize: event.target.value + 'px'}}}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"加粗"}>*/}
            {/*        <UnderLineInput type={'number'} min={100} max={900} step={100}*/}
            {/*                        defaultValue={((config?.statistic?.content as StatisticText)?.style as any)?.fontWeight || 500}*/}
            {/*                        onChange={(event) => onChange({statistic: {content: {style: {fontWeight: parseInt(event.target.value)}}}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={'颜色'}>*/}
            {/*        <CfgItemBorder width={'100%'}>*/}
            {/*            <BaseColorPicker*/}
            {/*                defaultValue={((config?.statistic?.content as StatisticText)?.style as any)?.color || '#fff'}*/}
            {/*                onChange={(value) => onChange({statistic: {content: {style: {color: value}}}})}*/}
            {/*                style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>*/}
            {/*        </CfgItemBorder>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"x偏移"}>*/}
            {/*        <UnderLineInput type={'number'}*/}
            {/*                        defaultValue={(config?.statistic?.content as StatisticText)?.offsetX || 0}*/}
            {/*                        onChange={(event) => onChange({statistic: {content: {offsetX: parseInt(event.target.value)}}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*    <ConfigItem title={"y偏移"}>*/}
            {/*        <UnderLineInput type={'number'}*/}
            {/*                        defaultValue={(config?.statistic?.content as StatisticText)?.offsetY || 0}*/}
            {/*                        onChange={(event) => onChange({statistic: {content: {offsetY: parseInt(event.target.value)}}})}/>*/}
            {/*    </ConfigItem>*/}
            {/*</Accordion>*/}
        </>
    );
}
