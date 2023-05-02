import {Radio} from 'antd';
import React, {Component} from 'react';
import './style/AxisConfig.less';
import LcUnderLineInput from "../../LcUnderLineInput";
import BaseColorPicker from "../../BaseColorPicker";
import LcConfigBlock, {LayoutMode} from "../../LcConfigBlock";
import LcSwitch from "../../LcSwitch";
import LcConfigItem, {CfgItemLayout} from "../../LcConfigItem";
import LCNumberInput from "../../LCNumberInput";
import CfgItemBorder from "../../CfgItemBorder";
import LcRadio from "../../LcRadio";
import NumberInput from "../../NumberInput";
import ConfigItem from "../item/ConfigItem";

interface AxisConfigProps {

}

/**
 * 轴线配置项
 */
class AxisConfig extends Component<AxisConfigProps> {
    render() {
        return (
            <>

                <ConfigItem title={'位置'} contentStyle={{width: '250px', paddingLeft: '10px'}}>
                    <LcRadio defaultValue="1">
                        <Radio value="1">上</Radio>
                        <Radio value="2">下</Radio>
                        <Radio value="3">左</Radio>
                        <Radio value="4">右</Radio>
                    </LcRadio>
                </ConfigItem>

                <LcConfigItem title={'标题'} layout={CfgItemLayout.BLOCK}>
                    <LcConfigBlock title={'开启'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'自动旋转'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'内容'} className={''} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LcUnderLineInput type={'text'}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'颜色'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', borderRadius: 2, height: 24}} showText={true}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                </LcConfigItem>

                <LcConfigItem title={'标题'} layout={CfgItemLayout.BLOCK}>
                    <LcConfigBlock title={'开启'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'自动旋转'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'自动隐藏'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'旋转角度'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                </LcConfigItem>

                <LcConfigItem title={'轴线'} layout={CfgItemLayout.BLOCK}>
                    <LcConfigBlock title={'开启'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'轴线颜色'} layoutMode={LayoutMode.VL_UD}>
                        <BaseColorPicker style={{width: '100%', borderRadius: 2, height: 23}} showText={true}/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'线宽'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'虚线'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'透明度'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                </LcConfigItem>

                <LcConfigItem title={'网格线'} layout={CfgItemLayout.BLOCK}>
                    <LcConfigBlock title={'开启'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'刻度对齐'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'颜色'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', borderRadius: 2, height: 23}} showText={true}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'线宽'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'虚线'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'透明度'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                </LcConfigItem>

                <LcConfigItem title={'刻度线'} layout={CfgItemLayout.BLOCK}>
                    <LcConfigBlock title={'开启'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'对齐'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'长度'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'宽度'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'透明度'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'颜色'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', borderRadius: 2, height: 23}} showText={true}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                </LcConfigItem>

                <LcConfigItem title={'子刻度'} layout={CfgItemLayout.BLOCK}>
                    <LcConfigBlock title={'开启'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'对齐'} layoutMode={LayoutMode.VL_UD}>
                        <LcSwitch/>
                    </LcConfigBlock>
                    <LcConfigBlock title={'长度'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'宽度'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'透明度'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <LCNumberInput style={{width: '100%', textAlign: 'center'}}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                    <LcConfigBlock title={'颜色'} layoutMode={LayoutMode.VL_UD}>
                        <CfgItemBorder>
                            <BaseColorPicker style={{width: '100%', borderRadius: 2, height: 23}} showText={true}/>
                        </CfgItemBorder>
                    </LcConfigBlock>
                </LcConfigItem>
            </>
        );
    }
}

export default AxisConfig;