import React from "react";
import LivePlayerController from "./LivePlayerController.ts";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import {ConfigType} from "../../../designer/right/ConfigContent";

export const LivePlayerStyleConfig: React.FC<ConfigType<LivePlayerController>> = ({controller}) => {

    const config = controller.getConfig()?.style;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        type: 'grid',
        key: 'style',
        children: [
            {
                key: 'kernel',
                type: 'select',
                label: '协议类型',
                value: config?.kernel,
                config: {
                    options: [
                        {label: 'hls', value: 'hls'},
                        {label: 'flv', value: 'flv'},
                        {label: 'rtsp', value: 'rtsp'},
                    ],
                }
            },
            {
                type: 'input',
                label: '视频地址',
                key: 'src',
                value: config?.src,
            },
            // {
            //     type: 'switch',
            //     label: '显示控制条',
            //     key: 'showControlBar',
            //     value: config?.showControlBar,
            // },
            {
                type: 'switch',
                label: '静音',
                key: 'muted',
                value: config?.muted,
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}
