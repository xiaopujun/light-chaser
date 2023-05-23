import {Radio, Select} from 'antd';
import React, {Component} from 'react';
import './AxisConfig.less';
import LcUnderLineInput from "../../lc-input/LcUnderLineInput";
import BaseColorPicker from "../../lc-color-picker/BaseColorPicker";
import LcSwitch from "../../lc-switch/LcSwitch";
import CfgItemBorder from "../../config-item-border/CfgItemBorder";
import LcRadio from "../../lc-radio/LcRadio";
import ConfigItem from "../../config-item/ConfigItem";
import ConfigCard from "../../config-card/ConfigCard";
import NumberInput from "../../lc-input/NumberInput";
import Accordion from "../../lc-accordion/Accordion";
import LcSelect from "../../lc-select/LCSelect";
import {toJS} from "mobx";

const {Option} = Select;

interface AxisConfigProps {
    config?: any;
    onChange?: (key: string, data: any) => void;
}

/**
 * 轴线配置项
 */
class AxisConfig extends Component<AxisConfigProps> {

    onChange = (key: string, data: any) => {
        const {onChange} = this.props;
        onChange && onChange(key, data);
    }

    render() {
        console.log(toJS(this.props.config));
        const {config} = this.props;
        return (
            <Accordion title={'X轴'} showSwitch={true} visible={config.enable || false}
                       onChange={value => this.onChange('enable', value)}>
                <ConfigItem title={'位置'} contentStyle={{width: '250px', paddingLeft: '20px'}}>
                    <LcRadio defaultValue={config.position || 'right'}
                             onChange={(e => this.onChange('position', e.target.value))}>
                        <Radio value="left">上</Radio>
                        <Radio value="right">下</Radio>
                    </LcRadio>
                </ConfigItem>
                <ConfigCard title={'标题'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch value={config.titleEnable || false}
                                  onChange={(value) => this.onChange('title-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'位置'}>
                        <LcSelect defaultValue={config.titlePosition || 'center'}
                                  onChange={value => this.onChange('title-position', value)}>
                            <Option value="start">前</Option>
                            <Option value="center">中</Option>
                            <Option value="end">后</Option>
                        </LcSelect>
                    </ConfigItem>
                    <ConfigItem title={'内容'}>
                        <LcUnderLineInput defaultValue={config.titleContent}
                                          onChange={(e: any) => this.onChange('title-content', e.target.value)}
                                          type={'text'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.titleColor}
                                             onChange={value => this.onChange('title-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'偏移量'}>
                        <NumberInput defaultValue={config.titleOffset} min={1}
                                     onChange={value => this.onChange('title-offset', value)}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'轴线'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch value={config.axisLineEnable}
                                  onChange={value => this.onChange('axisLine-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.axisLineColor}
                                             onChange={value => this.onChange('axisLine-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'线宽'}>
                        <NumberInput value={config.axisLineWidth} min={0} max={10}
                                     onChange={value => this.onChange('axisLine-width', value)}
                                     size={'small'}
                                     type={'number'}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'网格线'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch value={config.gridLineEnable}
                                  onChange={value => this.onChange('gridLine-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'刻度对齐'}>
                        <LcSwitch value={config.gridLineAlignTick}
                                  onChange={value => this.onChange('gridLine-alignTick', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'线宽'}>
                        <NumberInput value={config.gridLineWidth}
                                     onChange={value => this.onChange('gridLine-width', value)} size={'small'}
                                     type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.gridLineColor}
                                             onChange={value => this.onChange('gridLine-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'刻度线'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch value={config.tickLineEnable}
                                  onChange={value => this.onChange('tickLine-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'对齐'}>
                        <LcSwitch value={config.tickLineAlignTick}
                                  onChange={value => this.onChange('tickLine-alignTick', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'长度'}>
                        <NumberInput defaultValue={config.tickLineLength}
                                     onChange={value => this.onChange('tickLine-length', value)} size={'small'}
                                     type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'宽度'}>
                        <NumberInput defaultValue={config.tickLineWidth}
                                     onChange={value => this.onChange('tickLine-width', value)} size={'small'}
                                     type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.tickLineColor}
                                             onChange={value => this.onChange('tickLine-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'子刻度'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch value={config.subTickLineEnable}
                                  onChange={value => this.onChange('subTickLine-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'数量'}>
                        <NumberInput defaultValue={config.subTickLineCount}
                                     onChange={value => this.onChange('subTickLine-count', value)} size={'small'}
                                     type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'长度'}>
                        <NumberInput defaultValue={config.subTickLineLength}
                                     onChange={value => this.onChange('subTickLine-length', value)} size={'small'}
                                     type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'宽度'}>
                        <NumberInput defaultValue={config.subTickLineWidth}
                                     onChange={value => this.onChange('subTickLine-width', value)} size={'small'}
                                     type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker value={config.subTickLineColor}
                                             onChange={value => this.onChange('subTickLine-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
            </Accordion>
        );
    }
}

export default AxisConfig;