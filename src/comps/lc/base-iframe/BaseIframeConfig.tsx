import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigType";
import {BaseIframe} from "./BaseIframe";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";

export const BaseIframeStyleConfig: React.FC<ConfigType<BaseIframe>> = ({controller}) => {

    // const {src} = (controller as BaseIframe).getConfig()?.style!;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    const schema: Control = {
        type: 'grid',
        children: [
            {
                type: 'input',
                label: '地址',
                value: '',
            },
        ]
    }


    return (
        <>
            <LCGUI schema={schema} onFieldChange={onFieldChange}/>
            {/*<ConfigItem title={"地址"} contentStyle={{width: '80%'}}>*/}
            {/*    <UnderLineInput type={'url'}*/}
            {/*                    defaultValue={src || ""}*/}
            {/*                    onChange={(event) => controller.update({style: {src: event.target.value}})}/>*/}
            {/*</ConfigItem>*/}
        </>
    )
}

