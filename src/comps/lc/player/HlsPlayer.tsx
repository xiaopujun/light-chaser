import {forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState} from "react";
import Hls from "hls.js";



export interface HlsPlayerRef {
    updateConfig: (newConfig: HlsPlayerProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

export interface HlsPlayerProps {
    /**视频地址*/
    src?: string;
    /**是否显示控制条*/
    showControlBar?: boolean;
    /**是否静音*/
    muted?: boolean;
    id: string;
}

const HlsPlayer = forwardRef((props: HlsPlayerProps, ref: Ref<HlsPlayerRef>) => {
    const {src,showControlBar,muted, kernel, id} = props;
    useEffect(()=>{
        setTimeout(()=>{
            const video = document.getElementById(`video_hls_${id}`);

            if(video){
                const hls = new Hls({
                    debug: true,
                });
                hls.loadSource(src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    video.muted = muted;
                    video.play();
                });
            }
        }, 100)

    },[src, id, muted])

    const eventHandlerMap = useRef<Record<string, Function>>({});

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    return (
        <video id={`video_hls_${id}`} width="100%" height="100%" controls autoPlay></video>
    );
})

export default HlsPlayer;
