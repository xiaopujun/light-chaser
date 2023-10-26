import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {LineOptions, ShapeStyle} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AntdCommonLineController from "./AntdCommonLineController";
import {WritableLineOptions} from "../types";
import ColorMode, {ColorModeType, ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import {ShapeAttrs} from "@antv/g-base";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import LcSwitch from '../../../lib/lc-switch/LcSwitch';
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import {MappingOptions} from '@antv/g2plot/lib/adaptor/geometries/base';
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import Select from "../../../lib/lc-select/Select";
import AntdCommonUtil from "../AntdCommonUtil";
import {Control} from "../../../json-schema/SchemaTypes";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";

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
                {/*<AntdLineGraphics onChange={this.lineGraphicsChange} config={config}/>*/}
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.lineCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdLineCommonStyleConfig};


export interface AntdLineGraphicsProps {
    config?: WritableLineOptions;

    onChange(config: WritableLineOptions): void;
}

export const AntdLineGraphics: React.FC<AntdLineGraphicsProps> = ({config, onChange}) => {

    const LineColorChange = (data: ColorModeValue) => {
        const {mode, value} = data;
        switch (mode) {
            case 'single':
                onChange({lineStyle: {stroke: value as string}});
                break;
            case 'multi':
                onChange({lineStyle: {stroke: undefined, color: value as string[]}});
                break;
            case 'gradient':
                onChange({lineStyle: {stroke: `l(0) 0:${value[0]} 1:${value[1]}`}});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode = 'single', value: string | string[] = '#fff';
        if ((config?.lineStyle as ShapeAttrs)?.stroke) {
            const stroke = (config?.lineStyle as ShapeAttrs).stroke as string;
            if (stroke.startsWith('l')) {
                mode = 'gradient';
                value = [stroke.split(':')[1].split(' ')[0], stroke.split(':')[2].split(' ')[0]];
            } else {
                mode = 'single';
                value = stroke;
            }
        } else if (config?.color) {
            mode = 'multi';
            value = config?.color as string[];
        }
        return {mode, value};
    }

    return (
        <Accordion title={'图形'}>
            <ConfigCard title={'线条'}>
                <ConfigItem title={'平滑'}>
                    <LcSwitch defaultValue={!!config}
                              onChange={(value) => onChange({smooth: value})}/>
                </ConfigItem>
                <ConfigItem title={'线宽'}>
                    <UnderLineInput defaultValue={(config?.lineStyle as ShapeStyle)?.lineWidth}
                                    type={'number'} min={0}
                                    onChange={(event) =>
                                        onChange({lineStyle: {lineWidth: parseInt(event.target.value)}})}/>
                </ConfigItem>
                <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: '85%'}}>
                    <ColorMode onChange={LineColorChange} data={buildColorModeData()}
                               exclude={[ColorModeType.RADIAL_GRADIENT]}/>
                </ConfigItem>
            </ConfigCard>
            <ConfigCard title={'点'}>
                <ConfigItem title={'尺寸'}>
                    <UnderLineInput defaultValue={(config?.point as MappingOptions)?.size as number || 0}
                                    type={'number'} min={0}
                                    onChange={(event) =>
                                        onChange({point: {size: parseInt(event.target.value)}})}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker
                            defaultValue={config?.point?.color as string || '#fff'}
                            onChange={(value) => onChange({point: {color: value}})}
                            style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
                <ConfigItem title={'形状'}>
                    <Select options={[
                        {value: 'circle', label: '圈形'},
                        {value: 'square', label: '方形'},
                        {value: 'bowtie', label: '领结'},
                        {value: 'diamond', label: '钻石'},
                        {value: 'hexagon', label: '六角形'},
                        {value: 'triangle', label: '三角形'}]}
                            defaultValue={config?.point?.shape as string || 'circle'}
                            onChange={(value) => onChange({point: {shape: value}})}/>
                </ConfigItem>
            </ConfigCard>
        </Accordion>
    )
}


export const AntdLineFieldMapping: React.FC<ConfigType<AntdCommonLineController>> = ({controller}) => {
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
