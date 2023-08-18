import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Area, AreaOptions, ShapeStyle} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import {AntdAreaProps} from "./AntdCommonArea";
import {WritableAreaOptions} from "../types";
import ColorMode, {ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import {ShapeAttrs} from "@antv/g-base";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import LcSwitch from "../../../lib/lc-switch/LcSwitch";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {MappingOptions} from "@antv/g2plot/lib/adaptor/geometries/base";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Select from "../../../lib/lc-select/Select";

class AntdAreaCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance: AbstractComponent<Area, AntdAreaProps> = this.props.instance;
        instance.update({style: {legend}});
    }

    areaCoordinateSysChange = (config: AreaOptions) => {
        const instance: AbstractComponent<Area, AntdAreaProps> = this.props.instance;
        instance.update({style: config});
    }

    areaGraphicsChange = (config: AreaOptions) => {
        const instance: AbstractComponent<Area, AntdAreaProps> = this.props.instance;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: AreaOptions = instance.getConfig().style;
        return (
            <>
                <AntdCommonAreaGraphics config={config} onChange={this.areaGraphicsChange}/>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
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

    const areaColorChange = (data: ColorModeValue) => {
        const {mode, value, angle = 0} = data;
        switch (mode) {
            case 'single':
                onChange({areaStyle: {fill: value as string}});
                break;
            case 'multi':
                onChange({color: value as string[], areaStyle: {fill: undefined}});
                break;
            case 'gradient':
                onChange({areaStyle: {fill: `l(${angle}) 0:${value[0]} 1:${value[1]}`}});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode, value: string | string[], angle = 0;
        if ((config?.areaStyle as ShapeAttrs)?.fill) {
            const fill = (config?.areaStyle as ShapeAttrs).fill as string;
            if (fill.startsWith('l')) {
                mode = 'gradient';
                value = [fill.split(':')[1].split(' ')[0], fill.split(':')[2].split(' ')[0]];
                angle = parseInt(fill.split('(')[1].split(')')[0]);
            } else {
                mode = 'single';
                value = fill;
            }
        } else {
            mode = 'multi';
            value = config?.color as string[] || ['#fff'];
        }
        return {mode, value, angle};
    }

    return (
        <Accordion title={'图形'}>
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
            <ConfigCard title={'数据线'}>
                <ConfigItem title={'平滑'}>
                    <LcSwitch defaultValue={config?.smooth}
                              onChange={(value) => onChange({smooth: value})}/>
                </ConfigItem>
                <ConfigItem title={'线宽'}>
                    <UnderLineInput defaultValue={(config?.line?.style as ShapeStyle)?.lineWidth as number || 1}
                                    type={'number'} min={0}
                                    onChange={(event) =>
                                        onChange({line: {style: {lineWidth: parseInt(event.target.value)}}})}/>
                </ConfigItem>
            </ConfigCard>
            <ConfigCard title={'数据面'} bodyStyle={{width: '100%'}} cardStyle={{width: '100%'}}>
                <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: 'calc(100% - 38px)'}}>
                    <ColorMode onChange={areaColorChange} data={buildColorModeData()}/>
                </ConfigItem>
            </ConfigCard>
        </Accordion>
    )
}