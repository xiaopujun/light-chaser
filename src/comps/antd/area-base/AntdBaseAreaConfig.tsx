import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AreaOptions, ShapeStyle} from "@antv/g2plot";
import AntdCommonAreaController from "../../antd-common/area/AntdCommonAreaController";
import {AntdCartesianCoordinateSys} from "../../antd-common/config/AntdFragment";
import {WritableAreaOptions} from "../../antd-common/types";
import ColorMode, {ColorModeType, ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import {ShapeAttrs} from "@antv/g-base";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import LcSwitch from "../../../lib/lc-switch/LcSwitch";
import {MappingOptions} from "@antv/g2plot/lib/adaptor/geometries/base";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Select from "../../../lib/lc-select/Select";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import AntdFieldMapping from "../../antd-common/config/field-mapping/AntdFieldMapping";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {key} from "localforage";

class AntdBaseAreaStyleConfig extends Component<ConfigType> {


    AreaCoordinateSysChange = (config: AreaOptions) => {
        const controller = this.props.controller as AntdCommonAreaController;
        controller.update({style: config});
    }

    baseAreaGraphicsChange = (config: AreaOptions) => {
        const controller = this.props.controller as AntdCommonAreaController;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: AreaOptions = controller.getConfig().style;
        return (
            <>
                <AntdBaseAreaGraphics config={config} onChange={this.AreaCoordinateSysChange}/>
                <AntdCartesianCoordinateSys onChange={this.AreaCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBaseAreaStyleConfig};


export interface AntdBaseAreaGraphicsProps {
    config?: WritableAreaOptions;

    onChange(config: WritableAreaOptions): void;
}

export const AntdBaseAreaGraphics: React.FC<AntdBaseAreaGraphicsProps> = ({config, onChange}) => {

    const areaColorChange = (data: ColorModeValue) => {
        const {mode, value, angle = 0} = data;
        switch (mode) {
            case 'single':
                onChange({areaStyle: {fill: value as string}});
                break;
            case 'gradient':
                onChange({areaStyle: {fill: `l(${angle}) 0:${value[0]} 1:${value[1]}`}});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode = 'single', value: string | string[] = '#fff';
        if ((config?.areaStyle as ShapeAttrs)?.fill) {
            const fill = (config?.areaStyle as ShapeAttrs).fill as string;
            if (fill.startsWith('l')) {
                mode = 'gradient';
                value = [fill.split(':')[1].split(' ')[0], fill.split(':')[2].split(' ')[0]];
            } else {
                mode = 'single';
                value = fill;
            }
        }
        return {mode, value};
    }

    const _onChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        key: 'style',
        type: 'accordion',
        label: '图形',
        children: [
            {
                type: 'grid',
                config: {
                    gridGap: '15px'
                },
                children: [
                    {
                        label: '基准填充',
                        type: 'switch',
                        key: 'startOnZero',
                        value: !!config?.startOnZero,
                    },
                    {
                        label: '数据点',
                        type: 'item-panel',
                        children: [
                            {
                                type: 'grid',
                                config: {
                                    gridGap: '15px',
                                    columns: 2,
                                },
                                children: [
                                    {
                                        label: '尺寸',
                                        type: 'input',
                                        key: 'size',
                                        value: (config?.point as MappingOptions)?.size as number || 0,
                                        config: {
                                            type: 'number',
                                            min: 0,
                                            max: 10,
                                        }
                                    },
                                    {
                                        key: 'point',
                                        children: [
                                            {
                                                key: 'style',
                                                children: [
                                                    {
                                                        key: 'fill',
                                                        type: 'color-picker',
                                                        label: '颜色',
                                                        value: (config?.point?.style as ShapeStyle)?.fill || '#fff',
                                                        config: {
                                                            width: '100%',
                                                            radius: 3,
                                                            showBorder: true,
                                                            showText: true,
                                                            height: 16
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                key: 'shape',
                                                type: 'select',
                                                label: '形状',
                                                value: (config?.point as MappingOptions)?.shape as string || 'circle',
                                                config: {
                                                    options: [
                                                        {value: 'circle', label: '圈形'},
                                                        {value: 'square', label: '方形'},
                                                        {value: 'bowtie', label: '领结'},
                                                        {value: 'diamond', label: '钻石'},
                                                        {value: 'hexagon', label: '六角形'},
                                                        {value: 'triangle', label: '三角形'}]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                    },
                    {
                        label: '数据线',
                        type: 'item-panel',
                        children: [
                            {
                                type: 'grid',
                                config: {
                                    gridGap: '15px',
                                    columns: 2,
                                },
                                children: [
                                    {
                                        label: '平滑',
                                        type: 'switch',
                                        key: 'smooth',
                                        value: !!config?.smooth,
                                    },
                                    {
                                        key: 'line',
                                        children: [
                                            {
                                                key: 'size',
                                                type: 'input',
                                                label: '宽度',
                                                config: {
                                                    type: 'number',
                                                    min: 0,
                                                    max: 10,
                                                }
                                            },
                                            {
                                                key: 'color',
                                                type: 'color-picker',
                                                label: '颜色',
                                                value: config?.line?.color as string || '#fff',
                                                config: {
                                                    width: '100%',
                                                    radius: 3,
                                                    showBorder: true,
                                                    showText: true,
                                                    height: 16
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '数据面',
                        type: 'item-panel',
                        children: [
                            {
                                key: 'areaStyle',
                                children: [
                                    {
                                        type: 'grid',
                                        config: {
                                            columns: 2,
                                        },
                                        children: [
                                            {
                                                key: 'fill',
                                                type: 'color-picker',
                                                label: '颜色',
                                                value: (config?.point?.style as ShapeStyle)?.fill || '#fff',
                                                config: {
                                                    width: '100%',
                                                    radius: 3,
                                                    showBorder: true,
                                                    showText: true,
                                                    height: 16
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        ],
    }

    return (
        <LCGUI schema={schema} onFieldChange={_onChange}/>
        // <Accordion title={'图形'}>
        //     <ConfigCard title={'数据线'}>
        //         <ConfigItem title={'平滑'}>
        //             <LcSwitch defaultValue={config?.smooth}
        //                       onChange={(value) => onChange({smooth: value})}/>
        //         </ConfigItem>
        //         <ConfigItem title={'线宽'}>
        //             <UnderLineInput defaultValue={config?.line?.size as number}
        //                             type={'number'} min={0}
        //                             onChange={(event) =>
        //                                 onChange({line: {size: parseInt(event.target.value)}})}/>
        //         </ConfigItem>
        //         <ConfigItem title={'颜色'}>
        //             <CfgItemBorder width={'100%'}>
        //                 <BaseColorPicker onChange={(value) => onChange({line: {color: value}})}
        //                                  defaultValue={config?.line?.color as string || '#fff'}
        //                                  style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
        //             </CfgItemBorder>
        //         </ConfigItem>
        //     </ConfigCard>
        //     <ConfigCard title={'数据面'}>
        //         <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: '82%'}}>
        //             <ColorMode onChange={areaColorChange} data={buildColorModeData()}
        //                        exclude={[ColorModeType.MULTI, ColorModeType.RADIAL_GRADIENT]}/>
        //         </ConfigItem>
        //     </ConfigCard>
        //
        // </Accordion>
    )
}

export const AntdBaseAreaFieldMapping: React.FC<ConfigType<AntdBaseDesignerController>> = ({controller}) => {
    return <AntdFieldMapping controller={controller} fields={['xField', "yField"]}/>
}