import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {Column, ColumnOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AbstractComponent from "../../../framework/core/AbstractComponent";
import {AntdColumnProps} from "./AntdCommonColumn";
import {WritableColumnOptions} from "../types";
import ColorMode, {ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import {ShapeAttrs} from "@antv/g-base";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";

class AntdColumnCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance: AbstractComponent<Column, AntdColumnProps> = this.props.instance;
        instance.update({style: {legend}});
    }

    barGraphicsChange = (config: ColumnOptions) => {
        const instance: AbstractComponent<Column, AntdColumnProps> = this.props.instance;
        instance.update({style: config});
    }

    barCoordinateSysChange = (config: ColumnOptions) => {
        const instance: AbstractComponent<Column, AntdColumnProps> = this.props.instance;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: ColumnOptions = instance.getConfig().style;
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
                <ColorMode onChange={barColorChange} data={buildColorModeData()}/>
            </ConfigItem>
            <ConfigItem title={'宽度'}>
                <UnderLineInput type={'number'} min={1}
                                onChange={(e) => onChange({maxColumnWidth: parseInt(e.target.value)})}
                                defaultValue={config!.maxColumnWidth}/>
            </ConfigItem>
        </Accordion>
    )
}