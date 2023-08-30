import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Scatter, ScatterOptions, ShapeStyle} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import AntdCommonScatter, {AntdScatterProps} from "./AntdCommonScatter";
import {WritableBarOptions, WritableScatterOptions} from "../types";
import ColorMode, {ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Select from "../../../lib/lc-select/Select";
import {Option} from "../../../lib/lc-select/SelectType";

class AntdScatterCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance = this.props.instance as AntdCommonScatter;
        instance.update({style: {legend}});
    }

    scatterCoordinateSysChange = (config: ScatterOptions) => {
        const instance = this.props.instance as AntdCommonScatter;
        instance.update({style: config});
    }

    scatterGraphicsChange = (config: ScatterOptions) => {
        const instance: AbstractComponent<Scatter, AntdScatterProps> = this.props.instance;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: ScatterOptions = instance.getConfig().style;
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

    const scatterColorChange = (data: ColorModeValue) => {
        const {mode, value} = data;
        switch (mode) {
            case 'single':
                onChange({color: value});
                break;
            case 'multi':
                onChange({color: value as string[]});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode = 'single', value: string | string[] = '#fff';
        if ((config?.color)) {
            let multi = Array.isArray(config?.color);
            if (multi) {
                mode = 'multi';
                value = config?.color as string[] || ['#fff'];
            } else {
                mode = 'single';
                value = config?.color as string;
            }
        }
        return {mode, value};
    }

    return (
        <Accordion title={'图形'}>
            <ConfigCard title={'数据点'}>
                <ConfigItem title={'尺寸'}>
                    <UnderLineInput defaultValue={config?.size as number || 5}
                                    type={'number'} min={0}
                                    onChange={(event) =>
                                        onChange({size: parseInt(event.target.value)})}/>
                </ConfigItem>
                <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: 'calc(100% - 38px)'}}>
                    <ColorMode onChange={scatterColorChange} data={buildColorModeData()} exclude={['gradient']}/>
                </ConfigItem>
                <ConfigItem title={'形状'}>
                    <Select options={[
                        {value: 'circle', label: '圈形'},
                        {value: 'square', label: '方形'},
                        {value: 'bowtie', label: '领结'},
                        {value: 'diamond', label: '钻石'},
                        {value: 'hexagon', label: '六角形'},
                        {value: 'triangle', label: '三角形'}]}
                            defaultValue={config?.shape as string || 'circle'}
                            onChange={(value) => onChange({shape: value})}/>
                </ConfigItem>
                <ConfigItem title={'描边色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker defaultValue={(config?.pointStyle as ShapeStyle)?.stroke as string || '#fff'}
                                         style={{width: '100%', height: '15px', borderRadius: 2}}
                                         showText={true}
                                         onChange={(value) =>
                                             onChange({pointStyle: {stroke: value}})}/>
                    </CfgItemBorder>
                </ConfigItem>
                <ConfigItem title={'线宽'}>
                    <UnderLineInput defaultValue={(config?.pointStyle as ShapeStyle)?.lineWidth as number || 0}
                                    type={'number'} min={0}
                                    onChange={(event) =>
                                        onChange({pointStyle: {lineWidth: parseInt(event.target.value)}})}/>
                </ConfigItem>
            </ConfigCard>
        </Accordion>
    )
}


export const AntdScatterFieldMapping: React.FC<ConfigType<AntdCommonScatter>> = ({instance}) => {
    const config = instance.getConfig()!.style;
    const {data, xField, yField} = config!;
    const options: Option[] = [];
    if (data && data.length >= 1) {
        const dataObj = data[0];
        Object.keys(dataObj).forEach(key => options.push({label: key, value: key}))
    }

    const fieldChange = (config: WritableBarOptions) => {
        instance.update({style: config});
    }

    return (
        <ConfigCard title={'字段映射'}>
            <ConfigItem title={'X字段'}>
                <Select options={options} defaultValue={xField} onChange={(value => fieldChange({xField: value}))}/>
            </ConfigItem>
            <ConfigItem title={'Y字段'}>
                <Select options={options} defaultValue={yField} onChange={(value => fieldChange({yField: value}))}/>
            </ConfigItem>
        </ConfigCard>
    )
}
