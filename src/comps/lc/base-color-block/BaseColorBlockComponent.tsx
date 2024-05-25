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