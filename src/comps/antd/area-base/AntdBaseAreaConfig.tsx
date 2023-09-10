import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AreaOptions, ShapeStyle} from "@antv/g2plot";
import AntdCommonArea from "../../antd-common/area/AntdCommonArea";
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
import {AntdBaseDesignerComponent} from "../../antd-common/AntdBaseDesignerComponent";

class AntdBaseAreaStyleConfig extends Component<ConfigType> {


    AreaCoordinateSysChange = (config: AreaOptions) => {
        const instance = this.props.instance as AntdCommonArea;
        instance.update({style: config});
    }

    baseAreaGraphicsChange = (config: AreaOptions) => {
        const instance = this.props.instance as AntdCommonArea;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: AreaOptions = instance.getConfig().style;
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

    return (
        <Accordion title={'图形'}>
            <ConfigItem title={'基准填充'}>
                <LcSwitch defaultValue={!!config?.startOnZero}
                          onChange={(value) => onChange({startOnZero: value})}/>
            </ConfigItem>
            <ConfigCard title={'数据点'}>
                <ConfigItem title={'尺寸'}>
                    <UnderLineInput defaultValue={(config?.point as MappingOptions)?.size as number || 0}
                                    type={'number'} min={0}
                                    onChange={(event) =>
                                        onChange({point: {size: parseInt(event.target.value)}})}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker
                            defaultValue={(config?.point?.style as ShapeStyle)?.fill || '#fff'}
                            onChange={(value) => onChange({point: {style: {fill: value}}})}
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
            <ConfigCard title={'数据线'}>
                <ConfigItem title={'平滑'}>
                    <LcSwitch defaultValue={config?.smooth}
                              onChange={(value) => onChange({smooth: value})}/>
                </ConfigItem>
                <ConfigItem title={'线宽'}>
                    <UnderLineInput defaultValue={config?.line?.size as number}
                                    type={'number'} min={0}
                                    onChange={(event) =>
                                        onChange({line: {size: parseInt(event.target.value)}})}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker onChange={(value) => onChange({line: {color: value}})}
                                         defaultValue={config?.line?.color as string || '#fff'}
                                         style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
            </ConfigCard>
            <ConfigCard title={'数据面'}>
                <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: '82%'}}>
                    <ColorMode onChange={areaColorChange} data={buildColorModeData()}
                               exclude={[ColorModeType.MULTI, ColorModeType.RADIAL_GRADIENT]}/>
                </ConfigItem>
            </ConfigCard>

        </Accordion>
    )
}

export const AntdBaseAreaFieldMapping: React.FC<ConfigType<AntdBaseDesignerComponent>> = ({instance}) => {
    return <AntdFieldMapping instance={instance} fields={['xField', "yField"]}/>
}