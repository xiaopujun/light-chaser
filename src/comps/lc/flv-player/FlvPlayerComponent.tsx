import React, {ForwardedRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ComponentInfoType} from "../../common-component/CommonTypes.ts";
import {IFilterConfigType} from "../../../designer/DesignerType.ts";
import FlvJs from "flv.js";

export interface FlvPlayerComponentStyle {
    url?: string;
}

export interface FlvPlayerComponentProps {
    base?: ComponentInfoType;
    style?: FlvPlayerComponentStyle;
    filter?: IFilterConfigType;
}

export interface FlvPlayerComponentRef {
    updateConfig: (newConfig: FlvPlayerComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
    destroy: () => void;
}

const FlvPlayerComponent = React.forwardRef((props: FlvPlayerComponentProps, ref: ForwardedRef<FlvPlayerComponentRef>) => {
    const [config, setConfig] = useState<FlvPlayerComponentProps>({...props});
    const eventHandlerMap = useRef<Record<string, Function>>({});
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<FlvJs.Player | null>(null);
    const {url} = config.style!;

    const destroy = () => {
        if (playerRef.current) {
            playerRef.current.pause();
            playerRef.current.unload();
            playerRef.current.detachMediaElement();
            playerRef.current.destroy();
            playerRef.current = null;
        }
    }

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
        destroy: () => destroy(),
    }));

    useEffect(() => {
        if (FlvJs.isSupported()) {
            const player = FlvJs.createPlayer({
                type: 'flv',
                url: url,
            });
            player.attachMediaElement(videoRef.current!);
            player.load();
            player.play();
            playerRef.current = player;
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

export default FlvPlayerComponent;