import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {AntdCartesianCoordinateSys, AntdLegend} from "../config/AntdFragment";
import {BarOptions} from "@antv/g2plot";
import {Legend} from "@antv/g2plot/lib/types/legend";
import AntdCommonBar from "./AntdCommonBar";
import {WritableBarOptions} from "../types";
import ColorMode, {ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import {ShapeAttrs} from "@antv/g-base";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";

class AntdBarCommonStyleConfig extends Component<ConfigType> {

    legendChange = (legend: Legend) => {
        const instance = this.props.instance as AntdCommonBar;
        instance.update({style: {legend}});
    }

    barGraphicsChange = (config: BarOptions) => {
        const instance = this.props.instance as AntdCommonBar;
        instance.update({style: config});
    }

    barCoordinateSysChange = (config: BarOptions) => {
        const instance = this.props.instance as AntdCommonBar;
        instance.update({style: config});
    }

    render() {
        const {instance} = this.props;
        const config: BarOptions = instance.getConfig().style;
        return (
            <>
                <AntdBarGraphics onChange={this.barGraphicsChange} config={config}/>
                <AntdLegend onChange={this.legendChange} config={config.legend}/>
                <AntdCartesianCoordinateSys onChange={this.barCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBarCommonStyleConfig};


export interface AntdBarGraphicsProps {
    config?: WritableBarOptions;

    onChange(config: WritableBarOptions): void;
}

export const AntdBarGraphics: React.FC<AntdBarGraphicsProps> = ({config, onChange}) => {

    const barColorChange = (data: ColorModeValue) => {
        const {mode, value} = data;
        switch (mode) {
            case 'single':
                onChange({barStyle: {fill: value as string}});
                break;
            case 'multi':
                onChange({color: value, barStyle: {fill: undefined}});
                break;
            case 'gradient':
                onChange({barStyle: {fill: `l(0) 0:${value[0]} 1:${value[1]}`}});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode = 'single', value: string | string[] = '#fff';
        if ((config?.barStyle as ShapeAttrs)?.fill) {
            const fill = (config?.barStyle as ShapeAttrs).fill as string;
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
                                onChange={(e) => onChange({maxBarWidth: parseInt(e.target.value)})}
                                defaultValue={config!.maxBarWidth}/>
            </ConfigItem>
        </Accordion>
    )
}