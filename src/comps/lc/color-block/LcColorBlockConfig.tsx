import React from "react";
import BaseStyleSet from "../../common-component/base-style/BaseStyleSet";
import {ConfigType} from "../../../designer/right/ConfigType";

export const LcColorBlockConfig: React.FC<ConfigType> = ({instance}) => {
    return (
        <>
            <BaseStyleSet instance={instance}/>
        </>
    )
}