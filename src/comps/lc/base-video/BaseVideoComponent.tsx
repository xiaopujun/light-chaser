/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {forwardRef, Ref, useImperativeHandle, useRef, useState} from "react";
import {BaseVideoComponentProps} from "./BaseVideoController.ts";

export interface BaseVideoComponentStyle {
    src?: string;
}

export interface BaseVideoComponentRef {
    updateConfig: (newConfig: BaseVideoComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

const BaseVideoComponent = forwardRef((props: BaseVideoComponentProps, ref: Ref<BaseVideoComponentRef>) => {

    const [config, setConfig] = useState<BaseVideoComponentProps>({...props});

    const eventHandlerMap = useRef<Record<string, Function>>({});

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    return (
        <div style={{width: '100%', height: '100%'}}>
            {!config?.style?.src ? <div style={{
                    color: '#9a9a9a',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div>请配置视频连接...</div>
                </div> :
                <video width="100%" height="100%" controls autoPlay>
                    <source src={config?.style?.src} type="video/mp4"/>
                    <source src={config?.style?.src} type="video/webm"/>
                    <source src={config?.style?.src} type="video/ogg"/>
                    您的浏览器不支持 video 标签。
                </video>}
        </div>
    );
})

export default BaseVideoComponent;