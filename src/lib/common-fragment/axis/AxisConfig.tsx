import React, {Component, useEffect, useState} from 'react';
import './AxisConfig.less';
import ConfigItem from "../../config-item/ConfigItem";
import ConfigCard from "../../config-card/ConfigCard";
import Accordion from "../../lc-accordion/Accordion";
import CfgItemBorder from "../../config-item/CfgItemBorder";

const BaseColorPicker = React.lazy(() => import('../../lc-color-picker/BaseColorPicker'));
const LcSwitch = React.lazy(() => import('../../lc-switch/LcSwitch'));
const UnderLineInput = React.lazy(() => import('../../lc-input/UnderLineInput'));
const Select = React.lazy(() => import('../../lc-select/Select'));
const Radio = React.lazy(() => import('../../lc-radio/Radio'));

interface AxisConfigProps {
    config?: any;
    onChange?: (key: string, data: any) => void;
    title?: string;
}

/**
 * 轴线配置项
 */
class AxisConfig extends Component<AxisConfigProps> {

    onChange = (key: string, data: any) => {
        const {onChange} = this.props;
        onChange && onChange(key, data);
        if (key === 'tickLine-enable' && data)
            this.setState({tickLineEnable: true});
    }

    render() {
        const {config, title = '坐标轴'} = this.props;
        return (
            <Accordion title={title} showSwitch={true} defaultValue={config.enable || false}
                       onChange={value => this.onChange('enable', value)}>
                <ConfigItem title={'位置'} contentStyle={{width: '250px', paddingLeft: '20px'}}>
                    <Radio defaultValue={config.position || 'right'}
                           onChange={(value => this.onChange('position', value))}
                           options={[{label: '上', value: 'top'},
                               {label: '下', value: 'bottom'},
                               {label: '左', value: 'left'},
                               {label: '右', value: 'right'}]}/>
                </ConfigItem>
                <AxisText config={config} onChange={this.onChange}/>
                <AxisTitle config={config} onChange={this.onChange}/>
                <AxisLine config={config} onChange={this.onChange}/>
                <AxisGridLine config={config} onChange={this.onChange}/>
                <AxisTickLine config={config} onChange={this.onChange}/>
                <AxisSubTickLine config={config} onChange={this.onChange}/>
            </Accordion>
        );
    }
}

export const AxisSubTickLine: React.FC<{ config: any, onChange: Function }> = ({config, onChange}) => {
    const [subTickLineDisable, setSubTickLineDisable] = useState(!config.subTickLineEnable || false);
    const [subTickLineCount, setSubTickLineCount] = useState(config.subTickLineCount || 0);
    const [subTickLineLength, setSubTickLineLength] = useState(config.subTickLineLength || 0);
    const [subTickLineWidth, setSubTickLineWidth] = useState(config.subTickLineWidth || 0);
    const [subTickLineColor, setSubTickLineColor] = useState(config.subTickLineColor);
    return (
        <ConfigCard title={'子刻度'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={config.subTickLineEnable}
                          onChange={value => {
                              onChange('subTickLine-enable', value);
                              if (!value) {
                                  setSubTickLineDisable(true);
                              } else {
                                  setSubTickLineDisable(false);
                                  setSubTickLineCount(5);
                                  setSubTickLineLength(2);
                                  setSubTickLineWidth(2);
                                  setSubTickLineColor('#ffffff')
                              }

                          }}/>
            </ConfigItem>
            <ConfigItem title={'数量'}>
                <UnderLineInput value={subTickLineCount}
                                disabled={subTickLineDisable}
                                onChange={value => {
                                    onChange('subTickLine-count', value);
                                    setSubTickLineCount(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'长度'}>
                <UnderLineInput value={subTickLineLength}
                                disabled={subTickLineDisable}
                                onChange={value => {
                                    onChange('subTickLine-length', value);
                                    setSubTickLineLength(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'宽度'}>
                <UnderLineInput value={subTickLineWidth}
                                disabled={subTickLineDisable}
                                onChange={value => {
                                    onChange('subTickLine-width', value);
                                    setSubTickLineWidth(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={subTickLineColor}
                                     disabled={subTickLineDisable}
                                     onChange={value => {
                                         onChange('subTickLine-color', value);
                                         setSubTickLineColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
        </ConfigCard>
    )
}

export const AxisTickLine: React.FC<{ config: any, onChange: Function }> = ({config, onChange}) => {

    const [tickLineDisable, setTickLineDisable] = useState(!config.tickLineEnable);
    const [alignTick, setAlignTick] = useState(config.gridLineAlignTick || false);
    const [length, setLength] = useState(config.tickLineLength || 0);
    const [width, setWidth] = useState(config.tickLineWidth || 0);
    const [color, setColor] = useState(config.tickLineColor);

    return (
        <ConfigCard title={'刻度线'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={config.tickLineEnable || false}
                          onChange={value => {
                              onChange('tickLine-enable', value);
                              if (!value) {
                                  setTickLineDisable(true);
                              } else {
                                  setTickLineDisable(false);
                                  setAlignTick(true);
                                  setLength(2);
                                  setWidth(2);
                                  setColor("#FFFFFF");
                              }
                          }}/>
            </ConfigItem>
            <ConfigItem title={'对齐'}>
                <LcSwitch value={alignTick}
                          disabled={tickLineDisable}
                          onChange={value => {
                              onChange('tickLine-alignTick', value);
                              setAlignTick(value);
                          }}/>
            </ConfigItem>
            <ConfigItem title={'长度'}>
                <UnderLineInput value={length}
                                disabled={tickLineDisable}
                                onChange={value => {
                                    onChange('tickLine-length', value);
                                    setLength(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'宽度'}>
                <UnderLineInput value={width}
                                disabled={tickLineDisable}
                                onChange={value => {
                                    onChange('tickLine-width', value);
                                    setWidth(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={color}
                                     disabled={tickLineDisable}
                                     onChange={value => {
                                         onChange('tickLine-color', value);
                                         setColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
        </ConfigCard>
    )
}

export const AxisGridLine: React.FC<{ config: any, onChange: Function }> = ({config, onChange}) => {

    const [axisTitleDisable, setAxisTitleDisable] = useState(!config.gridLineEnable);
    const [alignTick, setAlignTick] = useState(config.gridLineAlignTick || false);
    const [color, setColor] = useState(config.gridLineColor);

    return (
        <ConfigCard title={'网格线'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={config.gridLineEnable || false}
                          onChange={value => {
                              if (!value) {
                                  setAxisTitleDisable(true);
                                  setAlignTick(false);
                              } else {
                                  setAlignTick(true);
                                  setAxisTitleDisable(false);
                              }
                              onChange('gridLine-enable', value)
                          }}/>
            </ConfigItem>
            <ConfigItem title={'刻度对齐'}>
                <LcSwitch value={alignTick} disabled={axisTitleDisable}
                          onChange={value => {
                              setAlignTick(value);
                              onChange('gridLine-alignTick', value)
                          }}/>
            </ConfigItem>
            <ConfigItem title={'线宽'}>
                <UnderLineInput defaultValue={config.gridLineWidth || 0}
                                disabled={axisTitleDisable}
                                min={0} max={10}
                                onChange={value => onChange('gridLine-width', value)}
                                type={'number'}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={color}
                                     disabled={axisTitleDisable}
                                     onChange={value => {
                                         onChange('gridLine-color', value);
                                         setColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
        </ConfigCard>
    )
}

export const AxisLine: React.FC<{ config: any, onChange: Function }> = ({config, onChange}) => {

    const [axisLineDisable, setAxisLineDisable] = useState(!config.axisLineEnable || false);
    const [lineWidth, setLineWidth] = useState(config.axisLineWidth || 0);
    const [lineColor, setLineColor] = useState(config.axisLineColor);

    return (
        <ConfigCard title={'轴线'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={config.axisLineEnable || false}
                          onChange={value => {
                              if (!value)
                                  setAxisLineDisable(true);
                              else {
                                  setAxisLineDisable(false);
                                  setLineWidth(2);
                                  setLineColor('#FFFFFF');
                              }
                              onChange('axisLine-enable', value)
                          }}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={lineColor}
                                     disabled={axisLineDisable}
                                     onChange={value => {
                                         onChange('axisLine-color', value);
                                         setLineColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
            <ConfigItem title={'线宽'}>
                <UnderLineInput value={lineWidth} min={0} max={10}
                                disabled={axisLineDisable}
                                onChange={value => {
                                    onChange('axisLine-width', value);
                                    setLineWidth(value);
                                }}
                                type={'number'}/>
            </ConfigItem>
        </ConfigCard>
    )
}

export const AxisTitle: React.FC<{ config: any, onChange: Function }> = ({config, onChange}) => {

    const [axisTitleDisable, setAxisTitleDisable] = useState(!config.titleEnable || false);
    const [titlePos, setTitlePos] = useState(config.titlePosition);
    const [title, setTitle] = useState(config.titleContent || '');
    const [titleColor, setTitleColor] = useState(config.titleColor);

    useEffect(() => {
        console.log('重新渲染了')

    }, []);

    return (
        <ConfigCard title={'标题'}>
            <ConfigItem title={'开启'}>
                <LcSwitch defaultValue={config.titleEnable || false}
                          onChange={(value) => {
                              if (!value)
                                  setAxisTitleDisable(true)
                              else {
                                  setAxisTitleDisable(false);
                                  setTitlePos('center');
                                  setTitle('标题');
                                  setTitleColor('#ffffff');
                              }
                              onChange('title-enable', value)
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
                            onChange('title-position', value);
                            setTitlePos(value);
                        }}/>
            </ConfigItem>
            <ConfigItem title={'内容'}>
                <UnderLineInput value={title || ''} disabled={axisTitleDisable}
                                onChange={(value: any) => {
                                    onChange('title-content', value);
                                    setTitle(value);
                                }}
                                type={'text'}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker value={titleColor}
                                     disabled={axisTitleDisable}
                                     onChange={value => {
                                         onChange('title-color', value);
                                         setTitleColor(value);
                                     }}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
            <ConfigItem title={'偏移量'}>
                <UnderLineInput defaultValue={config.titleOffset || 0} min={0} type={'number'}
                                disabled={axisTitleDisable}
                                onChange={value => onChange('title-offset', value)}/>
            </ConfigItem>
        </ConfigCard>
    )
}

export const AxisText: React.FC<{ config: any, onChange: Function }> = ({config, onChange}) => {

    return (
        <ConfigCard title={'文本'}>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder>
                    <BaseColorPicker defaultValue={config.textColor || '#d5d5d5'}
                                     onChange={value => onChange('text-color', value)}
                                     style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
            <ConfigItem title={'角度'}>
                <UnderLineInput defaultValue={config.textAngle || 0} step={0.1} type={'number'}
                                onChange={value => onChange('text-angle', value)}/>
            </ConfigItem>
            <ConfigItem title={'偏移量'}>
                <UnderLineInput defaultValue={config.textOffset || 0} type={'number'}
                                onChange={value => onChange('text-offset', value)}/>
            </ConfigItem>
        </ConfigCard>
    )
}

export default AxisConfig;