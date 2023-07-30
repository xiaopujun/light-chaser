import React from "react";
import ConfigCard from "../../lib/lc-config-card/ConfigCard";
import ConfigItem from "../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../lib/lc-input/UnderLineInput";
import CfgItemBorder from "../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../lib/lc-color-picker/BaseColorPicker";
import Accordion from "../../lib/lc-accordion/Accordion";
import {ConfigType} from "../../designer/right/ConfigType";
import AxisConfig from "../common-fragment/axis/AxisConfig";
import Select from "../../lib/lc-select/Select";
import {Legend} from "@antv/g2plot/lib/types/legend";

import {ShapeAttrs} from "@antv/g-base";
import {WritableBarOptions} from "../antd/base-bar/AntdBaseBarDefinition";
import {Types} from "@antv/g2";

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
                                onChange={value => onChange({itemName: {style: {fontSize: value}}})}/>
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

    return (
        <Accordion title={'图形'}>
            <ConfigCard title={'条状'}>
                <ConfigItem title={'宽度'}>
                    <UnderLineInput type={'number'} min={1} onChange={(value) => onChange({maxBarWidth: value})}
                                    defaultValue={config!.maxBarWidth}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder>
                        <BaseColorPicker onChange={(value) => onChange({color: value})}
                                         defaultValue={config!.color as string}
                                         style={{width: '100%', height: '15px', borderRadius: 2}}
                                         showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
            </ConfigCard>
        </Accordion>
    )
}

export const AntdCartesianCoordinateSys: React.FC<ConfigType> = ({instance}) => {

    const config: any = instance.getConfig();

    const axisChanged = (key: string, data: any, axis: string) => {
        let styleObj;
        switch (key) {
            case 'enable':
                styleObj = data
                    ? {
                        grid: null,
                        label: {
                            style: {
                                fill: '#d5d5d5',
                            },
                        },
                    }
                    : {
                        grid: null,
                        label: null,
                        line: null,
                        tickLine: null,
                        subTickLine: null,
                        title: null,
                    };
                break;
            case 'position':
                styleObj = {position: data};
                break;
            case 'text-color':
                styleObj = {label: {style: {fill: data}}};
                break;
            case 'text-angle':
                styleObj = {label: {rotate: data}};
                break;
            case 'text-offset':
                styleObj = {label: {offset: data}};
                break;
            case 'title-enable':
                styleObj = data ? {title: {text: '标题', style: {fill: '#d5d5d5'}}} : {title: null};
                break;
            case 'title-position':
                styleObj = {title: {position: data}};
                break;
            case 'title-content':
                styleObj = {title: {text: data}};
                break;
            case 'title-color':
                styleObj = {title: {style: {fill: data}}};
                break;
            case 'title-offset':
                styleObj = {title: {offset: data}};
                break;
            case 'axisLine-enable':
                styleObj = data ? {line: {style: {stroke: '#d5d5d5', lineWidth: 2}}} : {line: null};
                break;
            case 'axisLine-color':
                styleObj = {line: {style: {stroke: data}}};
                break;
            case 'axisLine-width':
                styleObj = {line: {style: {lineWidth: data}}};
                break;
            case 'gridLine-enable':
                styleObj = data ? {
                    grid: {
                        line: {style: {stroke: '#d5d5d5', lineWidth: 2}},
                        alignTick: true
                    }
                } : {grid: null};
                break;
            case 'gridLine-alignTick':
                styleObj = {grid: {alignTick: data}};
                break;
            case 'gridLine-width':
                styleObj = {grid: {line: {style: {lineWidth: data}}}};
                break;
            case 'gridLine-color':
                styleObj = {grid: {line: {style: {stroke: data}}}};
                break;
            case 'tickLine-enable':
                styleObj = data ? {
                    tickLine: {style: {stroke: '#d5d5d5', lineWidth: 2}, alignTick: true, length: 3},
                } : {tickLine: null};
                break;
            case 'tickLine-alignTick':
                styleObj = {tickLine: {alignTick: data}};
                break;
            case 'tickLine-length':
                styleObj = {tickLine: {length: data}};
                break;
            case 'tickLine-width':
                styleObj = {tickLine: {style: {lineWidth: data}}};
                break;
            case 'tickLine-color':
                styleObj = {tickLine: {style: {stroke: data}}};
                break;
            case 'subTickLine-enable':
                styleObj = data ? {
                    subTickLine: {style: {stroke: '#d5d5d5', lineWidth: 3}, count: 5, length: 2}
                } : {subTickLine: null};
                break;
            case 'subTickLine-count':
                styleObj = {subTickLine: {count: data}};
                break;
            case 'subTickLine-length':
                styleObj = {subTickLine: {length: data}};
                break;
            case 'subTickLine-width':
                styleObj = {subTickLine: {style: {lineWidth: data}}};
                break;
            case 'subTickLine-color':
                styleObj = {subTickLine: {style: {stroke: data}}};
                break;
            default:
                console.warn('未知的坐标轴配置项');
                return;
        }
        instance.update(buildAxisConfig(styleObj, axis));
    };

    const buildAxisConfig = (styleObj: any, axis: string) => {
        let axisObj;
        if (axis === 'x')
            axisObj = {xAxis: styleObj,};
        else if (axis === 'y')
            axisObj = {yAxis: styleObj,};
        return {
            style: {
                chartStyle: axisObj
            },
        };
    }

    return (
        <>
            <AxisConfig title={'X轴'} config={config!.xAxis}
                        onChange={(key: string, data: any) => {
                            axisChanged(key, data, 'x');
                        }}/>
            <AxisConfig title={'Y轴'} config={config!.yAxis}
                        onChange={(key: string, data: any) => {
                            axisChanged(key, data, 'y');
                        }}/>
        </>
    )
}