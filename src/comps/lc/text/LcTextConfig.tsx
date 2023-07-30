import React from "react";
import BaseStyleSet from "../../common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../designer/right/ConfigType";
import Accordion from "../../../lib/lc-accordion/Accordion";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import ConfigCard from "../../../lib/lc-config-card/ConfigCard";
import Radio from "../../../lib/lc-radio/Radio";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";

export const LcTextDataConfig: React.FC<ConfigType> = ({instance}) => {

    const updateConfig = instance.update;

    const contentChanged = (content: string) => updateConfig && updateConfig({data: {content}});

    return (
        <ConfigItem title={'内容'} contentStyle={{width: '80%'}}>
            {/*<UnderLineInput onChange={contentChanged} defaultValue={config.content || ''}/>*/}
        </ConfigItem>
    )
}

export const LcTextStyleConfig: React.FC<ConfigType> = ({instance}) => {

    const updateConfig = instance.update;

    const fontSizeChanged = (fontSize: number) => updateConfig && updateConfig({style: {chartStyle: {fontSize}}});

    const fontWeightChanged = (fontWeight: number) => updateConfig && updateConfig({style: {chartStyle: {fontWeight}}});

    const colorChanged = (color: string | string[]) => updateConfig && updateConfig({style: {chartStyle: {color}}});

    const horizontalChanged = (horizontal: string) => updateConfig && updateConfig({style: {chartStyle: {justifyContent: horizontal}}});

    const verticalChanged = (vertical: string) => updateConfig && updateConfig({style: {chartStyle: {alignItems: vertical}}});

    // const {baseStyle, chartStyle} = config;
    return (
        <>
            {/*<BaseStyleSet config={baseStyle} updateConfig={updateConfig}/>*/}
            {/*<Accordion title={'文本'}>*/}
            {/*    <ConfigCard title={'基础'}>*/}
            {/*        <ConfigItem title={'大小'}>*/}
            {/*            <UnderLineInput defaultValue={chartStyle.fontSize} onChange={fontSizeChanged}*/}
            {/*                            type={'number'}*/}
            {/*                            min={12}/>*/}
            {/*        </ConfigItem>*/}
            {/*        <ConfigItem title={'粗细'}>*/}
            {/*            <UnderLineInput defaultValue={chartStyle.fontWeight} onChange={fontWeightChanged}*/}
            {/*                            type={'number'} min={100} step={100}*/}
            {/*                            max={900}/>*/}
            {/*        </ConfigItem>*/}
            {/*        <ConfigItem title={'颜色'}>*/}
            {/*            <CfgItemBorder>*/}
            {/*                <BaseColorPicker defaultValue={chartStyle.color} onChange={colorChanged}*/}
            {/*                                 style={{width: '100%', height: '15px', borderRadius: 2}}*/}
            {/*                                 showText={true}/>*/}
            {/*            </CfgItemBorder>*/}
            {/*        </ConfigItem>*/}
            {/*    </ConfigCard>*/}
            {/*    <ConfigCard title={'位置'}>*/}
            {/*        <ConfigItem title={'水平对齐'} contentStyle={{marginLeft: 5}}>*/}
            {/*            <Radio defaultValue={chartStyle?.justifyContent || 'center'} options={[*/}
            {/*                {value: 'flex-start', label: '左'},*/}
            {/*                {value: 'center', label: '中'},*/}
            {/*                {value: 'flex-end', label: '右'}]}*/}
            {/*                   onChange={horizontalChanged}*/}
            {/*            />*/}
            {/*        </ConfigItem>*/}
            {/*        <ConfigItem title={'垂直对齐'} contentStyle={{marginLeft: 5}}>*/}
            {/*            <Radio defaultValue={chartStyle?.alignItems || 'center'} options={[*/}
            {/*                {value: 'flex-start', label: '上'},*/}
            {/*                {value: 'center', label: '中'},*/}
            {/*                {value: 'flex-end', label: '下'}]}*/}
            {/*                   onChange={verticalChanged}*/}
            {/*            />*/}
            {/*        </ConfigItem>*/}
            {/*    </ConfigCard>*/}
            {/*</Accordion>*/}
        </>
    )
}