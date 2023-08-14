import React, {ChangeEvent, Component, useState} from 'react';
import './AxisConfig.less';
import ConfigCard from "../../../../lib/lc-config-card/ConfigCard";
import ConfigItem from "../../../../lib/lc-config-item/ConfigItem";
import CfgItemBorder from "../../../../lib/lc-config-item/CfgItemBorder";
import {Axis} from "@antv/g2plot";
import Accordion from "../../../../lib/lc-accordion/Accordion";
import {Types} from "@antv/g2";
import {AxisLabelCfg, AxisLineCfg, AxisSubTickLineCfg, AxisTickLineCfg, AxisTitleCfg} from "@antv/component/esm";
import {ShapeAttrs} from "@antv/g-base";
import {AxisGridCfg} from "@antv/g2/esm/interface";


const BaseColorPicker = React.lazy(() => import('../../../../lib/lc-color-picker/BaseColorPicker'));
const LcSwitch = React.lazy(() => import('../../../../lib/lc-switch/LcSwitch'));
const UnderLineInput = React.lazy(() => import('../../../../lib/lc-input/UnderLineInput'));
const Select = React.lazy(() => import('../../../../lib/lc-select/Select'));
const Radio = React.lazy(() => import('../../../../lib/lc-radio/Radio'));

interface AxisConfigProps {
    config?: Axis;
    onChange: (data?: Axis) => void;
    title?: string;
}

/**
 * 轴线配置项
 */
class AxisConfig extends Component<AxisConfigProps> {

    oldData: Axis | undefined = undefined;
    emptyData: Axis = {
        grid: null,
        line: null,
        title: null,
        label: null,
        tickLine: null,
        subTickLine: null,
    }

    constructor(props: AxisConfigProps) {
        super(props);
        this.oldData = {...props?.config} || null;
    }

    render() {
        const {config, title = '坐标轴', onChange} = this.props;
        return (
            <Accordion title={title} showSwitch={true} defaultValue={!!config}
                       onChange={value => onChange(value ? this.oldData : this.emptyData)}>
                <ConfigItem title={'位置'} contentStyle={{width: '250px', paddingLeft: '20px'}}>
                    <Radio defaultValue={(config as Types.AxisCfg).position || 'right'}
                           onChange={(value => onChange({position: value as Types.AxisCfg["position"]}))}
                           options={[{label: '上', value: 'top'},
                               {label: '下', value: 'bottom'},
                               {label: '左', value: 'left'},
                               {label: '右', value: 'right'}]}/>
                </ConfigItem>
                <AxisText config={(config as Types.AxisCfg).label!} onChange={(data => onChange({label: data}))}/>
                <AxisTitle config={(config as Types.AxisCfg).title!} onChange={(data => onChange({title: data}))}/>
                <AxisLine config={(config as Types.AxisCfg).line!} onChange={(data => onChange({line: data}))}/>
                <AxisGridLine config={(config as Types.AxisCfg).grid!} onChange={(data => onChange({grid: data}))}/>
                <AxisTickLine config={(config as Types.AxisCfg).tickLine!}
                              onChange={(data => onChange({tickLine: data}))}/>
                <AxisSubTickLine config={(config as Types.AxisCfg).subTickLine!}
                                 onChange={(data => onChange({subTickLine: data}))}/>
            </Accordion>
        );
    }
}

export interface AxisSubTickLineProps {
    config: AxisSubTickLineCfg;
    onChange: (data: AxisSubTickLineCfg | null) => void;
}

export const AxisSubTickLine: React.FC<AxisSubTickLineProps> = ({config, onChange}) => {

    const initConfig: AxisSubTickLineCfg = config || {
        count: 5,
        length: 1,
        style: {stroke: '#fff', lineWidth: 1} as ShapeAttrs
    };

    const [enable, setEnable] = useState(!!config);
    const [subTickLineCount, setSubTickLineCount] = useState(config?.count || 0);
    const [subTickLineLength, setSubTickLineLength] = useState(config?.length || 0);
    const [subTickLineWidth, setSubTickLineWidth] = useState((config?.style as ShapeAttrs)?.lineWidth || 0);
    const [subTickLineColor, setSubTickLineColor] = useState((config?.style as ShapeAttrs)?.stroke || '#ffffff');
    return (
        <ConfigCard title={'子刻度'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={enable}
                          onChange={value => {
                              onChange(value ? initConfig : null);
                              if (value) {
                                  setEnable(true);
                                  setSubTickLineCount(5);
                                  setSubTickLineLength(2);
                                  setSubTickLineWidth(2);
                                  setSubTickLineColor('#ffffff')
                              } else {
                                  setEnable(false);
                              }

                          }}/>
            </ConfigItem>
            <ConfigItem title={'数量'}>
                <UnderLineInput value={subTickLineCount}
                                disabled={!enable}
                                onChange={e => {
                                    const value = parseInt(e.target.value);
                                    onChange({count: value});
                                    setSubTickLineCount(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'长度'}>
                <UnderLineInput value={subTickLineLength}
                                disabled={!enable}
                                onChange={e => {
                                    const value = parseInt(e.target.value);
                                    onChange({length: value});
                                    setSubTickLineLength(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'宽度'}>
                <UnderLineInput value={subTickLineWidth}
                                disabled={!enable}
                                onChange={e => {
                                    const value = parseInt(e.target.value);
                                    onChange({style: {lineWidth: value}});
                                    setSubTickLineWidth(value);
                                }}
                                min={0}
                                max={5}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={subTickLineColor}
                                     disabled={!enable}
                                     onChange={value => {
                                         onChange({style: {stroke: value}});
                                         setSubTickLineColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
        </ConfigCard>
    )
}


export interface AxisTickLineProps {
    config: AxisTickLineCfg;
    onChange: (data: AxisTickLineCfg | null) => void;
}

export const AxisTickLine: React.FC<AxisTickLineProps> = ({config, onChange}) => {

    const initConfig: AxisGridCfg = config || {
        alignTick: true,
        length: 1,
        style: {stroke: '#fff', lineWidth: 1} as ShapeAttrs
    };

    const [enable, setEnable] = useState(!!config);
    const [alignTick, setAlignTick] = useState(config?.alignTick || false);
    const [length, setLength] = useState(config?.length || 0);
    const [width, setWidth] = useState((config?.style as ShapeAttrs)?.lineWidth || 0);
    const [color, setColor] = useState((config?.style as ShapeAttrs)?.stroke || '#ffffff');

    return (
        <ConfigCard title={'刻度线'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={enable}
                          onChange={value => {
                              onChange(value ? initConfig : null);
                              if (value) {
                                  setEnable(true);
                                  setAlignTick(true);
                                  setLength(2);
                                  setWidth(2);
                                  setColor("#FFFFFF");
                              } else {
                                  setEnable(false);
                              }
                          }}/>
            </ConfigItem>
            <ConfigItem title={'对齐'}>
                <LcSwitch value={alignTick}
                          disabled={!enable}
                          onChange={value => {
                              onChange({alignTick: value});
                              setAlignTick(value);
                          }}/>
            </ConfigItem>
            <ConfigItem title={'长度'}>
                <UnderLineInput value={length}
                                disabled={!enable}
                                onChange={e => {
                                    const value = parseInt(e.target.value);
                                    onChange({length: value});
                                    setLength(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'宽度'}>
                <UnderLineInput value={width}
                                disabled={!enable}
                                onChange={e => {
                                    const value = parseInt(e.target.value);
                                    onChange({style: {lineWidth: value}});
                                    setWidth(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={color}
                                     disabled={!enable}
                                     onChange={value => {
                                         onChange({style: {stroke: value}});
                                         setColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
        </ConfigCard>
    )
}

export interface AxisGridLineProps {
    config: AxisGridCfg;
    onChange: (data: AxisGridCfg | null) => void;
}


export const AxisGridLine: React.FC<AxisGridLineProps> = ({config, onChange}) => {

    const initConfig: AxisGridCfg = config || {alignTick: true, style: {stroke: '#fff', lineWidth: 1} as ShapeAttrs};

    const [axisTitleDisable, setAxisTitleDisable] = useState(!!config);
    const [alignTick, setAlignTick] = useState(config?.alignTick || false);
    const [color, setColor] = useState((config?.line?.style as ShapeAttrs)?.stroke || '#ffffff');

    return (
        <ConfigCard title={'网格线'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={axisTitleDisable}
                          onChange={value => {
                              if (!value) {
                                  setAxisTitleDisable(true);
                                  setAlignTick(false);
                              } else {
                                  setAlignTick(true);
                                  setAxisTitleDisable(false);
                              }
                              onChange(value ? initConfig : null)
                          }}/>
            </ConfigItem>
            <ConfigItem title={'刻度对齐'}>
                <LcSwitch value={alignTick} disabled={axisTitleDisable}
                          onChange={value => {
                              setAlignTick(value);
                              onChange({alignTick: value})
                          }}/>
            </ConfigItem>
            <ConfigItem title={'线宽'}>
                <UnderLineInput defaultValue={(config?.line?.style as ShapeAttrs)?.lineWidth || 0}
                                disabled={axisTitleDisable}
                                min={0} max={10}
                                onChange={e => onChange({line: {style: {lineWidth: parseInt(e.target.value)}}})}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={color}
                                     disabled={axisTitleDisable}
                                     onChange={value => {
                                         onChange({line: {style: {stroke: value}}});
                                         setColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
        </ConfigCard>
    )
}

export interface AxisLIneProps {
    config: AxisLineCfg;
    onChange: (data: AxisLineCfg | null) => void;
}

export const AxisLine: React.FC<AxisLIneProps> = ({config, onChange}) => {

    const initConfig: AxisLineCfg = config || {style: {stroke: '#fff', lineWidth: 1} as ShapeAttrs};

    const [axisLineDisable, setAxisLineDisable] = useState(!!config);
    const [lineWidth, setLineWidth] = useState(config?.style?.lineWidth || 0);
    const [lineColor, setLineColor] = useState(config?.style?.stroke || '#FFFFFF');

    return (
        <ConfigCard title={'轴线'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={axisLineDisable}
                          onChange={value => {
                              if (!value)
                                  setAxisLineDisable(true);
                              else {
                                  setAxisLineDisable(false);
                                  setLineWidth(2);
                                  setLineColor('#FFFFFF');
                              }
                              onChange(value ? initConfig : null)
                          }}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={lineColor}
                                     disabled={axisLineDisable}
                                     onChange={value => {
                                         onChange({style: {stroke: value}});
                                         setLineColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
            <ConfigItem title={'线宽'}>
                <UnderLineInput value={lineWidth} min={0} max={10}
                                disabled={axisLineDisable}
                                onChange={e => {
                                    const value = parseInt(e.target.value);
                                    onChange({style: {lineWidth: value}});
                                    setLineWidth(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
        </ConfigCard>
    )
}

export interface AxisTitleProps {
    config: AxisTitleCfg;
    onChange: (data?: AxisTitleCfg | null) => void;
}

export const AxisTitle: React.FC<AxisTitleProps> = ({config, onChange}) => {

    const initConfig = config || {text: '标题', position: 'center', style: {fill: '#fff'}};

    const [axisTitleDisable, setAxisTitleDisable] = useState(!!config);
    const [titlePos, setTitlePos] = useState(config?.position || 'center');
    const [title, setTitle] = useState(config?.text || '');
    const [titleColor, setTitleColor] = useState(config?.style?.fill || '#ffffff');

    return (
        <ConfigCard title={'标题'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={!!config}
                          onChange={(value) => {
                              if (!value)
                                  setAxisTitleDisable(true)
                              else {
                                  setAxisTitleDisable(false);
                                  setTitlePos('center');
                                  setTitle('标题');
                                  setTitleColor('#ffffff');
                              }
                              onChange(value ? initConfig : null);
                          }}/>
            </ConfigItem>
            <ConfigItem title={'位置'}>
                <Select options={[
                    {value: 'start', label: '前'},
                    {value: 'center', label: '中'},
                    {value: 'end', label: '后'}]}
                        value={titlePos} placeholder={'请选择位置'}
                        disabled={axisTitleDisable}
                        onChange={value => {
                            onChange({position: value});
                            setTitlePos(value);
                        }}/>
            </ConfigItem>
            <ConfigItem title={'内容'}>
                <UnderLineInput value={title} disabled={axisTitleDisable}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    onChange({text: value});
                                    setTitle(value);
                                }}
                                type={'text'}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={titleColor as string}
                                     disabled={axisTitleDisable}
                                     onChange={value => {
                                         onChange({style: {fill: value}});
                                         setTitleColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
            <ConfigItem title={'偏移量'}>
                <UnderLineInput defaultValue={config?.offset || 0} min={0} type={'number'}
                                disabled={axisTitleDisable}
                                onChange={e => onChange({offset: parseInt(e.target.value)})}/>
            </ConfigItem>
        </ConfigCard>
    )
}

export interface AxisTextProps {
    config: AxisLabelCfg;
    onChange: (data: AxisLabelCfg) => void;
}

export const AxisText: React.FC<AxisTextProps> = ({config, onChange}) => {

    return (
        <ConfigCard title={'文本'}>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker defaultValue={(config.style as ShapeAttrs).fill || '#d5d5d5'}
                                     onChange={value => onChange({style: {fill: value}})}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
            <ConfigItem title={'角度'}>
                <UnderLineInput defaultValue={config.rotate || 0} step={0.1} type={'number'}
                                onChange={e => onChange({rotate: parseInt(e.target.value)})}/>
            </ConfigItem>
            <ConfigItem title={'偏移量'}>
                <UnderLineInput defaultValue={config.offset || 0} type={'number'}
                                onChange={e => onChange({offset: parseInt(e.target.value)})}/>
            </ConfigItem>
        </ConfigCard>
    )
}

export default AxisConfig;