import React from "react";
import BaseStyleSet from "../../common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../designer/right/ConfigType";

export const LcColorBlockConfig: React.FC<ConfigType> = ({config, updateConfig}) => {

    const {baseStyle} = config;

    return (
        <>
            <BaseStyleSet config={baseStyle} updateConfig={updateConfig}/>
        </>
    )
}