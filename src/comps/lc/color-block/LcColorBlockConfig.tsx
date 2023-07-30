import React from "react";
import BaseStyleSet from "../../common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../designer/right/ConfigType";

export const LcColorBlockConfig: React.FC<ConfigType> = ({instance}) => {
    return (
        <>
            <BaseStyleSet instance={instance}/>
        </>
    )
}