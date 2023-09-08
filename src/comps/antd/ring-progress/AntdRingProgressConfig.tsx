import React, {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {WritableRingProgressOptions, WritableRoseOptions} from "../../antd-common/types";
import AntdCommonRose from "../../antd-common/rose/AntdCommonRose";
import {RingProgressOptions, ShapeStyle, StatisticText} from "@antv/g2plot";
import ColorMode, {ColorModeValue} from "../../../lib/lc-color-mode/ColorMode";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import {StatisticTextConfig} from "../pie/AntdPieStyleConfig";
import {DataConfigType} from "../../../designer/DesignerType";
import DataConfig from "../../common-component/data-config/DataConfig";
import AntdRingProgress from "./AntdRingProgress";

export class AntdRingProgressStyleConfig extends Component<ConfigType> {

    ringProgressGraphicsChange = (config: WritableRoseOptions) => {
        const instance = this.props.instance as AntdCommonRose;
        instance.update({style: config});
    }


    render() {
        const {instance} = this.props;
        const config: RingProgressOptions = instance.getConfig().style as RingProgressOptions
        return (
            <>
                <AntdRingProgressGraphicsConfig config={config}
                                                onChange={this.ringProgressGraphicsChange}/>
            </>
        );
    }
}


export interface AntdRingProgressGraphicsConfigProps {
    config: RingProgressOptions;

    onChange(config: WritableRingProgressOptions): void;
}

export const AntdRingProgressGraphicsConfig: React.FC<AntdRingProgressGraphicsConfigProps> = ({config, onChange}) => {

    const ringProgressColorChange = (data: ColorModeValue) => {
        const {mode, value} = data;
        switch (mode) {
            case 'single':
            case 'multi':
                onChange({color: value, progressStyle: {fill: undefined}});
                break;
        }
    }

    const buildColorModeData = (): ColorModeValue => {
        let mode = 'multi', value: string | string[];
        let multi = Array.isArray(config.color) && config.color.length > 1;
        if (multi) {
            value = config.color as string[];
        } else
            value = ['#00c4ff', '#fff']
        return {mode, value};
    }

    return (
        <>
            <Accordion title={'图形'}>
                <ConfigItem title={"半径"}>
                    <UnderLineInput type={"number"} min={0} max={1} step={0.01}
                                    defaultValue={config?.radius || 0.9}
                                    onChange={(event) => onChange({radius: parseFloat(event.target.value)})}/>
                </ConfigItem>
                <ConfigItem title={"内径"}>
                    <UnderLineInput type={"number"} min={0} max={1} step={0.01}
                                    defaultValue={config?.innerRadius || 0}
                                    onChange={(event) => onChange({innerRadius: parseFloat(event.target.value)})}/>
                </ConfigItem>
                <ConfigItem title={'颜色'} itemStyle={{width: '100%'}} contentStyle={{width: '85%'}}>
                    <ColorMode onChange={ringProgressColorChange} data={buildColorModeData()}
                               exclude={['gradient', 'single']}/>
                </ConfigItem>
                <ConfigItem title={'描边颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker
                            defaultValue={(config?.progressStyle as ShapeStyle)?.stroke || '#fff'}
                            onChange={(value) => onChange({progressStyle: {stroke: value}})}
                            style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
                <ConfigItem title={'描边宽度'}>
                    <UnderLineInput type={"number"} min={0}
                                    defaultValue={(config?.progressStyle as ShapeStyle)?.lineWidth || 0}
                                    onChange={(event) => onChange({progressStyle: {lineWidth: parseInt(event.target.value)}})}/>
                </ConfigItem>
            </Accordion>
            <Accordion title={'标题'}>
                <StatisticTextConfig config={config?.statistic?.title || false}
                                     onChange={(config) => onChange({statistic: {title: config}})}/>
            </Accordion>
            <Accordion title={'内容'}>
                <ConfigItem title={"字号"}>
                    <UnderLineInput type={'number'} min={10}
                                    defaultValue={parseInt(((config?.statistic?.content as StatisticText)?.style as any)?.fontSize || '12')}
                                    onChange={(event) => onChange({statistic: {content: {style: {fontSize: event.target.value + 'px'}}}})}/>
                </ConfigItem>
                <ConfigItem title={"加粗"}>
                    <UnderLineInput type={'number'} min={100} max={900} step={100}
                                    defaultValue={((config?.statistic?.content as StatisticText)?.style as any)?.fontWeight || 500}
                                    onChange={(event) => onChange({statistic: {content: {style: {fontWeight: parseInt(event.target.value)}}}})}/>
                </ConfigItem>
                <ConfigItem title={'颜色'}>
                    <CfgItemBorder width={'100%'}>
                        <BaseColorPicker
                            defaultValue={((config?.statistic?.content as StatisticText)?.style as any)?.color || '#fff'}
                            onChange={(value) => onChange({statistic: {content: {style: {color: value}}}})}
                            style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                    </CfgItemBorder>
                </ConfigItem>
                <ConfigItem title={"x偏移"}>
                    <UnderLineInput type={'number'}
                                    defaultValue={(config?.statistic?.content as StatisticText)?.offsetX || 0}
                                    onChange={(event) => onChange({statistic: {content: {offsetX: parseInt(event.target.value)}}})}/>
                </ConfigItem>
                <ConfigItem title={"y偏移"}>
                    <UnderLineInput type={'number'}
                                    defaultValue={(config?.statistic?.content as StatisticText)?.offsetY || 0}
                                    onChange={(event) => onChange({statistic: {content: {offsetY: parseInt(event.target.value)}}})}/>
                </ConfigItem>
            </Accordion>
        </>
    );
}


export class AntdRingProgressDataConfig extends Component<ConfigType<AntdRingProgress>> {

    state = {
        dataSource: 'static',
    }

    constructor(props: ConfigType<AntdRingProgress>) {
        super(props);
        const {instance} = props;
        const dataConfig: DataConfigType = instance.getConfig()!.data!;
        this.state = {
            dataSource: dataConfig?.dataSource || 'static',
        }
    }

    dataSourcesChange = (value: any) => {
        const {instance} = this.props;
        instance.update({data: {dataSource: value}}, {reRender: false});
        this.setState({
            dataSource: value,
        });
    }

    render() {
        const {instance} = this.props;
        const {dataSource} = this.state;
        const dataConfig: DataConfigType = instance.getConfig()!.data!;
        return (
            <DataConfig instance={instance}/>
        );
    }
}