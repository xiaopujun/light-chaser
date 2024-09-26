import {forwardRef, Ref, useImperativeHandle, useMemo, useRef, useState} from "react";
import {LivePlayerComponentProps} from "./LivePlayerController.ts";
import HlsPlayer from "./HlsPlayer";
import FlvPlayer from "./Flvplayer";

export interface LivePlayerComponentStyle {
    /**视频地址*/
    src?: string;
    /**是否显示控制条*/
    showControlBar?: boolean;
    /**是否静音*/
    muted?: boolean;
    /**协议类型，根据不同的协议类型，实例化不同的播放器*/
    kernel?: 'hls'|'flv';
}

export interface LivePlayerComponentRef {
    updateConfig: (newConfig: LivePlayerComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

const LivePlayerComponent = forwardRef((props: LivePlayerComponentProps, ref: Ref<LivePlayerComponentRef>) => {

    const [config, setConfig] = useState<LivePlayerComponentProps>({...props});
    const {src,showControlBar,muted, kernel} = config.style || {};

    const eventHandlerMap = useRef<Record<string, Function>>({});


    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    const getPlayer = useMemo(()=>{
        let player = (
            <div style={{width: "100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <p>请配置视频源</p>
            </div>
        );
        if(src){
            switch (kernel) {
                case "hls":
                    player = <HlsPlayer src={src!} id={config.base.id} muted={!!muted}/>
                    break;
                case 'flv':
                    player = <FlvPlayer src={src!} id={config.base.id} muted={!!muted}/>
                    break;
            }
        }
        return player;
    },[src, muted,kernel])

    return (
        <div style={{width: '100%', height: '100%'}}>
            {getPlayer}
        </div>
    );
})

export default LivePlayerComponent;
