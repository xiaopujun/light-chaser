import {forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState} from "react";
import flvjs from "flv.js";

export interface FlvPlayerProps {
    src?: string;
    muted?: boolean;
    id: string;
}

export interface FlvPlayerRef {
    updateConfig: (newConfig: FlvPlayerComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}



const FlvPlayer = forwardRef((props: FlvPlayerProps, ref: Ref<FlvPlayerRef>) => {

    const { src, id } = props||{};
    let player = null;

    useEffect(()=>{
        const video = document.getElementById( `video_flv_${id}`);

        setTimeout(()=>{
            if (flvjs.isSupported() && video) {

                player = flvjs.createPlayer({
                    type: 'flv',
                    url: src
                });
                player.attachMediaElement(video);
                player.load();
                player.play();
            }
            return () => {
                if (player) {
                    player.pause();
                    player.unload();
                    player.detachMediaElement();
                    player.destroy();
                    player = null;
                }
            };
        }, 100)
    },[src, id])

    const eventHandlerMap = useRef<Record<string, Function>>({});

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    return (
        <video
            id={`video_flv_${id}`}
            style={{width: '100%', height: '100%'}}
            controls
            autoPlay
        />
    );
})

export default FlvPlayer;
