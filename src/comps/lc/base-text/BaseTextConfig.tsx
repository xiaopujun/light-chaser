import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {BaseTextComponentProps, BaseTextComponentStyle} from "./BaseTextComponent";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import CfgItemBorder from "../../../lib/lc-config-item/CfgItemBorder";
import BaseColorPicker from "../../../lib/lc-color-picker/BaseColorPicker";
import {BaseText} from "./BaseText";

export const BaseTextStyleConfig: React.FC<ConfigType> = ({instance}) => {

    const updateStyle = (config: BaseTextComponentStyle) => {
        instance.update({style: config});
    }

    const textStyle = (instance as BaseText).getConfig()?.style;
    return (
        <>
            <ConfigItem title={"字号"}>
                <UnderLineInput type={'number'} min={12}
                                defaultValue={textStyle?.fontSize || 12}
                                onChange={(event) => updateStyle({fontSize: parseInt(event.target.value)})}/>
            </ConfigItem>
            <ConfigItem title={"加粗"}>
                <UnderLineInput type={'number'} min={100} max={900} step={100}
                                defaultValue={textStyle?.fontWeight || 500}
                                onChange={(event) => updateStyle({fontWeight: parseInt(event.target.value)})}/>
            </ConfigItem>
            <ConfigItem title={'颜色'}>
                <CfgItemBorder width={'100%'}>
                    <BaseColorPicker
                        defaultValue={textStyle?.color || '#fff'}
                        onChange={(value) => updateStyle({color: value})}
                        style={{width: '100%', height: '15px', borderRadius: 2}} showText={true}/>
                </CfgItemBorder>
            </ConfigItem>
        </>
    )
}


export const BaseTextDataConfig: React.FC<ConfigType> = ({instance}) => {
    let config = instance.getConfig() as BaseTextComponentProps;
    let text = config.data?.staticData?.data;
    return (
        <ConfigItem title={'文本内容'} contentStyle={{width: '80%'}}>
            <UnderLineInput type={'text'} defaultValue={text} onChange={(e) => {
                instance.update({data: {staticData: {data: e.target.value}}})
            }}/>
        </ConfigItem>
    )
}

