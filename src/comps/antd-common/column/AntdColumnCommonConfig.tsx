import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Column, ColumnOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractController from "../../../framework/core/AbstractController";
import AntdCommonColumn, {AntdColumnProps} from "./AntdCommonColumn";
import {WritableBarOptions, WritableColumnOptions} from "../types";
import ColorMode, {ColorModeType, ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import {ShapeAttrs} from "@antv/g-base";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {Option} from "../../../lib/lc-select/SelectType";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import Select from "../../../lib/lc-select/Select";

class AntdColumnCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const controller: AbstractController<Column, AntdColumnProps> = this.props.controller;
        controller.update({style: {legend}});
    }

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
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
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

    const barColorChange = (data: ColorModeValue) => {
        const {mode, value} = data;
        switch (mode) {
            case 'single':
                onChange({columnStyle: {fill: value as string}});
                break;
            case 'multi':
                onChange({color: value, columnStyle: {fill: undefined}});
                break;
            case 'gradient':
                onChange({columnStyle: {fill: `l(0) 0:${value[0]} 1:${value[1]}`}});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode = 'single', value: string | string[] = '#fff';
        if ((config?.columnStyle as ShapeAttrs)?.fill) {
            const fill = (config?.columnStyle as ShapeAttrs).fill as string;
            if (fill.startsWith('l')) {
                mode = 'gradient';
                value = [fill.split(':')[1].split(' ')[0], fill.split(':')[2].split(' ')[0]];
            } else {
                mode = 'single';
                value = fill;
            }
        } else if (config?.color) {
            mode = 'multi';
            value = config?.color as string[];
        }
        return {mode, value};
    }

    return (
        <Accordion title={'图形'}>
            <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: '85%'}}>
                <ColorMode onChange={barColorChange} data={buildColorModeData()}
                           exclude={[ColorModeType.RADIAL_GRADIENT]}/>
            </ConfigItem>
            <ConfigItem title={'宽度'}>
                <UnderLineInput type={'number'} min={1}
                                onChange={(e) => onChange({maxColumnWidth: parseInt(e.target.value)})}
                                defaultValue={config!.maxColumnWidth}/>
            </ConfigItem>
        </Accordion>
    )
}


export const AntdColumnFieldMapping: React.FC<ConfigType<AntdCommonColumn>> = ({controller}) => {
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
