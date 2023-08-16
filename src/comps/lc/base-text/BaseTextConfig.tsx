import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import {BaseTextComponentProps} from "./BaseTextComponent";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";

export const BaseTextStyleConfig: React.FC = () => {
    return (
        <div style={{color: 'white'}}>
            文本配置
        </div>
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

