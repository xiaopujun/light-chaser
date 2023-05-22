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
        return (
            <Accordion title={'X轴'} showSwitch={true} onChange={value => this.onChange('enable', value)}>
                <ConfigItem title={'位置'} contentStyle={{width: '250px', paddingLeft: '20px'}}>
                    <LcRadio defaultValue="top" onChange={(e => this.onChange('position', e.target.value))}>
                        <Radio value="left">上</Radio>
                        <Radio value="right">下</Radio>
                    </LcRadio>
                </ConfigItem>
                <ConfigCard title={'标题'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch onChange={(value) => this.onChange('title-enable', value)}/>
                    </ConfigItem>
                    <ConfigItem title={'位置'}>
                        <LcSelect defaultValue="center" onChange={value => this.onChange('title-position', value)}>
                            <Option value="start">前</Option>
                            <Option value="center">中</Option>
                            <Option value="end">后</Option>
                        </LcSelect>
                    </ConfigItem>
                    <ConfigItem title={'内容'}>
                        <LcUnderLineInput onChange={(e: any) => this.onChange('title-content', e.target.value)}
                                          type={'text'}/>
                    </ConfigItem>

                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker onChange={value => this.onChange('title-color', value)}
                                             style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'偏移量'}>
                        <NumberInput min={1} onChange={value => this.onChange('title-offset', value)}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'轴线'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                    <ConfigItem title={'线宽'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'透明度'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'网格线'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'刻度对齐'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'线宽'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'透明度'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'刻度线'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'对齐'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'长度'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'宽度'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'透明度'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
                <ConfigCard title={'子刻度'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'对齐'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'长度'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'宽度'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'透明度'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
                    </ConfigItem>
                </ConfigCard>
            </Accordion>
        );
    }
}

export default AxisConfig;