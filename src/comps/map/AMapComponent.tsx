import React, {ForwardedRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ComponentInfoType} from "../common-component/CommonTypes.ts";
import "@amap/amap-jsapi-types";
import "./AMapComponent.less";
import AMapScaleObserver from "./AMapScaleObserver.ts";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";
import mapLoader from "./MapLoader.ts";

export interface AMapComponentStyle {
    key?: string;
    securityJsCode?: string;
    customCode?: string;
}

export interface AMapComponentProps {
    base?: ComponentInfoType;
    style?: AMapComponentStyle;
}

export interface AMapComponentRef {
    updateConfig: (newConfig: AMapComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

const AMapComponent = React.forwardRef((props: AMapComponentProps, ref: ForwardedRef<AMapComponentRef>) => {
    const [config, setConfig] = useState<AMapComponentProps>({...props});
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<AMap.Map>();
    const eventHandlerMap = useRef<Record<string, Function>>({});

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
        map: mapRef
    }));

    useEffect(() => {
        new AMapScaleObserver(mapContainerRef.current!)
    }, []);

    useEffect(() => {
        const {key, securityJsCode} = config.style!;
        mapLoader.load(key!, securityJsCode!).then((AMap) => {
            if (!AMap) return;
            const code = config.style?.customCode;
            const fun = eval(`(${code})`);
            if (typeof fun === 'function') {
                mapRef.current = fun(mapContainerRef.current!, AMap, eventHandlerMap);
            } else {
                globalMessage.messageApi?.error('自定义代码错误,请检查');
            }
        })
    }, [config]);

    return (
        <div className={'a-map'} ref={mapContainerRef}>
            {(config.style?.key && config.style?.securityJsCode) ? undefined :
                <div className={'no-key-message'} style={{display: 'flex', alignItems: 'center'}}>请配置Key和密钥</div>}
        </div>
    );
});

export default AMapComponent;