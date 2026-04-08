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

import React, {ForwardedRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ComponentInfoType} from "../../common-component/CommonTypes.ts";
import {IFilterConfigType} from "../../../designer/DesignerType.ts";
import Hls from 'hls.js';

export interface HlsPlayerComponentStyle {
    url?: string;
}

export interface HlsPlayerComponentProps {
    base?: ComponentInfoType;
    style?: HlsPlayerComponentStyle;
    filter?: IFilterConfigType;
}

export interface HlsPlayerComponentRef {
    updateConfig: (newConfig: HlsPlayerComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
    destroy: () => void;
}

const HlsPlayerComponent = React.forwardRef((props: HlsPlayerComponentProps, ref: ForwardedRef<HlsPlayerComponentRef>) => {
    const [config, setConfig] = useState<HlsPlayerComponentProps>({...props});
    const eventHandlerMap = useRef<Record<string, Function>>({});
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<Hls | null>(null);
    const {url} = config.style!;

    const destroy = () => {
        if (playerRef.current) {
            playerRef.current?.destroy();
            playerRef.current = null;
        }
    }

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
        destroy: () => destroy(),
    }));

    useEffect(() => {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url!);
            hls.attachMedia(videoRef.current!);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current!.play();
            });
            playerRef.current = hls;
        } else if (videoRef.current!.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current!.src = url!;
            videoRef.current!.addEventListener('loadedmetadata', () => {
                videoRef.current!.play();
            });
        }
        return () => destroy();
    }, [url]);

    const onClick = () => {
        if ('click' in eventHandlerMap.current) {
            eventHandlerMap.current['click']();
        }
    }

    return (
        <video style={{height: '100%', width: '100%'}} ref={videoRef} controls onClick={onClick}/>
    );
});

export default HlsPlayerComponent;