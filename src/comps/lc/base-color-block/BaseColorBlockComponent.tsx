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

import React, {ForwardedRef, useImperativeHandle, useRef, useState} from 'react';
import {ComponentInfoType} from "../../common-component/CommonTypes.ts";
import {IFilterConfigType} from "../../../designer/DesignerType.ts";

export interface BaseColorBlockComponentStyle {
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: string;
    background?: string;
}

export interface BaseColorBlockComponentProps {
    base?: ComponentInfoType;
    style?: BaseColorBlockComponentStyle;
    filter?: IFilterConfigType;
}

export interface BaseColorBlockComponentRef {
    updateConfig: (newConfig: BaseColorBlockComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

const BaseColorBlockComponent = React.forwardRef((props: BaseColorBlockComponentProps,
                                                  ref: ForwardedRef<BaseColorBlockComponentRef>) => {
    const [config, setConfig] = useState<BaseColorBlockComponentProps>({...props});

    const eventHandlerMap = useRef<Record<string, Function>>({});

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    const onClick = () => {
        if ('click' in eventHandlerMap.current) {
            eventHandlerMap.current['click']();
        }
    }

    const {style} = config;
    return (
        <div style={{...{height: '100%', display: 'flex'}, ...style}} onClick={onClick}/>
    );
});

export default BaseColorBlockComponent;