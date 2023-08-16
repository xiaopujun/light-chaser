import React from "react";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import Accordion from "../../../lib/lc-accordion/Accordion";
import AxisConfig from "./axis/AxisConfig";
import Select from "../../../lib/lc-select/Select";
import {Legend} from "@antv/g2plot/lib/types/legend";

import {ShapeAttrs} from "@antv/g-base";
import {Types} from "@antv/g2";
import {Axis} from "@antv/g2plot";
import {WritableBarOptions, WritableOptions} from "../types";
import ColorMode, {ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";

export interface AntdLegendProps {
    config?: Legend;

    onChange(config: Legend): void;
}

export const AntdLegend = (props: AntdLegendProps) => {
    const {onChange, config} = props;
    return (
        <Accordion title={'图例'} showSwitch={true} defaultValue={!!config}
                   onChange={value => onChange(value && config!)}>
            <ConfigItem title={'位置'}>
                <Select defaultValue={(config as Types.LegendCfg)?.position}
                        onChange={(value => onChange({position: value as Types.LegendCfg['position']}))}
                        options={[
                            {value: 'left-top', label: '左上'},
                            {value: 'left', label: '正左'},
                            {value: 'left-bottom', label: '左下'},
                            {value: 'top-left', label: '上左'},
                            {value: 'top', label: '正上'},
                            {value: 'top-right', label: '上右'},
                            {value: 'right-top', label: '右上'},
                            {value: 'right', label: '正右'},
                            {value: 'right-bottom', label: '右下'},
                            {value: 'bottom-left', label: '下左'},
                            {value: 'bottom', label: '正下'},
                            {value: 'bottom-right', label: '下右'},
                        ]}/>
            </ConfigItem>
            <ConfigItem title={'方向'}>
                <Select defaultValue={(config as Types.LegendCfg)?.direction}
                        onChange={(value => onChange({direction: value as Types.LegendCfg['direction']}))}
                        options={[
                            {value: 'horizontal', label: '横向'},
                            {value: 'vertical', label: '纵向'},
                        ]}/>
            </ConfigItem>
            <ConfigItem title={'字号'}>
                <UnderLineInput type={'number'} min={12}
                                defaultValue={((config as Types.LegendCfg)?.itemName?.style as ShapeAttrs).fontSize || 12}
                                onChange={e => onChange({itemName: {style: {fontSize: parseInt(e.target.value)}}})}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder width={'100%'}>
                    <BaseColorPicker defaultValue={((config as Types.LegendCfg)?.itemName?.style as ShapeAttrs).fill!}
                                     onChange={value => onChange({itemName: {style: {fill: value}}})}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
        </Accordion>
    );
};

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

export interface AntdCartesianCoordinateSysProps {
    config?: WritableOptions;

    onChange(config?: WritableOptions): void;
}

export const AntdCartesianCoordinateSys: React.FC<AntdCartesianCoordinateSysProps> = ({config, onChange}) => {

    const xAxisChange = (data?: Axis) => {
        onChange({xAxis: data});
    }
    const yAxisChange = (data?: Axis) => {
        onChange({yAxis: data});
    }

    return (
        <>
            <AxisConfig title={'X轴'} config={config!.xAxis}
                        onChange={xAxisChange}/>
            <AxisConfig title={'Y轴'} config={config!.yAxis}
                        onChange={yAxisChange}/>
        </>
    )
}