import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";
import ConfigItem from "../../../lib/lc-config-item/ConfigItem";
import {BaseIframe} from "./BaseIframe";

export const BaseIframeStyleConfig: React.FC<ConfigType<BaseIframe>> = ({controller}) => {

    const {src} = (controller as BaseIframe).getConfig()?.style!;
    return (
        <>
            <ConfigItem title={"地址"} contentStyle={{width: '80%'}}>
                <UnderLineInput type={'url'}
                                defaultValue={src || ""}
                                onChange={(event) => controller.update({style: {src: event.target.value}})}/>
            </ConfigItem>
        </>
    )
}

