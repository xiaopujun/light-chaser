import React from "react";
import BaseStyleSet from "../../../lib/common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../designer/right/ConfigType";
import Accordion from "../../../lib/lc-accordion/Accordion";

export const LcTextDataConfig: React.FC = () => {
    return (
        <div>LcTextDataConfig</div>
    )
}

export const LcTextStyleConfig: React.FC<ConfigType> = ({config, updateConfig}) => {

    const {baseStyle} = config;
    console.log(updateConfig)

    const _updateConfig = (config: any) => {
        updateConfig && updateConfig(config);
    }

    return (
        <>
            <BaseStyleSet config={baseStyle} updateConfig={_updateConfig}/>
            <Accordion title={'文本'}>
            </Accordion>
        </>
    )
}