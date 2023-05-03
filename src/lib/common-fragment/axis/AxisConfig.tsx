import {Radio} from 'antd';
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

interface AxisConfigProps {

}

/**
 * 轴线配置项
 */
class AxisConfig extends Component<AxisConfigProps> {
    render() {
        return (
            <>
                <ConfigItem title={'位置'} contentStyle={{width: '250px', paddingLeft: '20px'}}>
                    <LcRadio defaultValue="1">
                        <Radio value="1">上</Radio>
                        <Radio value="2">下</Radio>
                        <Radio value="3">左</Radio>
                        <Radio value="4">右</Radio>
                    </LcRadio>
                </ConfigItem>
                <ConfigCard title={'标题'}>
                    <ConfigItem title={'开启'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'自动旋转'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'内容'}>
                        <LcUnderLineInput type={'text'}/>
                    </ConfigItem>
                    <ConfigItem title={'颜色'}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                        </CfgItemBorder>
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
                    <ConfigItem title={'虚线'}>
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
                    <ConfigItem title={'对齐'}>
                        <LcSwitch/>
                    </ConfigItem>
                    <ConfigItem title={'线宽'}>
                        <NumberInput size={'small'} type={'number'}/>
                    </ConfigItem>
                    <ConfigItem title={'虚线'}>
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
                    <ConfigItem title={'虚线'}>
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
            </>
        );
    }
}

export default AxisConfig;